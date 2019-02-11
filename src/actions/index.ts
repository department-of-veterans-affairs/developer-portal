import { Action, ActionCreator } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { history } from '../store';
import { IApiList, IErrorableInput, IRootState } from '../types';
import * as constants from '../types/constants';

const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export interface IUpdateApplicationFirstName extends Action {
  newValue: IErrorableInput;
  type: constants.UPDATE_APPLICATION_FIRST_NAME;
}

export interface IUpdateApplicationLastName extends Action {
  newValue: IErrorableInput;
  type: constants.UPDATE_APPLICATION_LAST_NAME;
}

export interface IUpdateApplicationEmail extends Action {
  newValue: IErrorableInput;
  type: constants.UPDATE_APPLICATION_EMAIL;
}

export interface IUpdateApplicationOrganization extends Action {
  newValue: IErrorableInput;
  type: constants.UPDATE_APPLICATION_ORGANIZATION;
}

export interface IUpdateApplicationDescription extends Action {
  newValue: IErrorableInput;
  type: constants.UPDATE_APPLICATION_DESCRIPTION;
}

export interface IUpdateApplicationOAuthRedirectURI extends Action {
  newValue: IErrorableInput;
  type: constants.UPDATE_APPLICATION_OAUTH_REDIRECT_URL;
}

export interface IToggleBenefitsApi extends Action {
  type: constants.TOGGLE_BENEFITS_CHECKED;
}

export interface IToggleAppealsApi extends Action {
  type: constants.TOGGLE_APPEALS_CHECKED;
}

export interface IToggleHealthApi extends Action {
  type: constants.TOGGLE_HEALTH_CHECKED;
}

export interface IToggleFacilitiesApi extends Action {
  type: constants.TOGGLE_FACILITIES_CHECKED;
}

export interface IToggleVerificationApi extends Action {
  type: constants.TOGGLE_VERIFICATION_CHECKED;
}

export interface IToggleAcceptTos extends Action {
  type: constants.TOGGLE_ACCEPT_TOS;
}

export type UpdateApplicationAction =
  IUpdateApplicationDescription |
  IUpdateApplicationEmail |
  IUpdateApplicationFirstName |
  IUpdateApplicationLastName |
  IUpdateApplicationOrganization |
  IUpdateApplicationOAuthRedirectURI |
  IToggleBenefitsApi |
  IToggleAppealsApi |
  IToggleVerificationApi |
  IToggleFacilitiesApi |
  IToggleHealthApi |
  IToggleAcceptTos;

export interface ISubmitForm extends Action {
  type: constants.SUBMIT_APPLICATION_BEGIN;
}

export interface ISubmitFormSuccess extends Action {
  clientID: string;
  clientSecret: string;
  type: constants.SUBMIT_APPLICATION_SUCCESS;
  token: string;
}

export interface ISubmitFormError extends Action {
  type: constants.SUBMIT_APPLICATION_ERROR;
  status: string;
}

export type SubmitFormAction = ISubmitForm | ISubmitFormSuccess | ISubmitFormError;

export type SubmitFormThunk = ThunkAction<Promise<SubmitFormAction>, IRootState, undefined, SubmitFormAction>;

const apisToList = (apis : IApiList) => {
  return Object.keys(apis).filter((key) => apis[key]).join(',');
};

const MAX_RETRIES = 3;

const fetchWithRetry = async (fetchFn : () => Promise<Response>) : Promise<Response> => {
  let status;
  let retries = 0;
  while (retries < MAX_RETRIES) {
    try {
      const response = await fetchFn();
      if (response.ok) {
        return response;
      } else {
        status = response.statusText;
        retries += 1;
      }
    } catch (err) {
      status = err.message;
      retries += 1;
    }
  }
  throw new Error(`Max Retries Exceeded. Last Status: ${status}`);
};

function buildApplicationBody({ application }: IRootState) {
  const applicationBody : any = {};
  applicationBody.apis = apisToList(application.inputs.apis);
  ['description', 'email', 'firstName', 'lastName', 'oAuthRedirectURI', 'organization', 'termsOfService'].forEach((property) => {
    if (application.inputs[property]) {
      applicationBody[property] = application.inputs[property].value;
    }
  });
  return applicationBody;
}

export const submitForm : ActionCreator<SubmitFormThunk> = () => {
  return (dispatch, state) => {
    dispatch(submitFormBegin());

    const applicationBody = buildApplicationBody(state());

    const request = new Request(
      `${process.env.REACT_APP_DEVELOPER_PORTAL_SELF_SERVICE_URL}/services/meta/developer_application`,
      {
        body: JSON.stringify(applicationBody),
        headers: {
          'accept': 'application/json',
          'content-type': 'application/json',
        },
        method: 'POST',
      },
    );
    return fetchWithRetry(() => fetch(request))
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText)
        }
        return response;
      })
      .then((response) => response.json())
      .then((json) => {
        if (json.token) {
          const result = dispatch(submitFormSuccess(
            json.token,
            json.client_id,
            json.client_secret,
          ));
          history.push('/applied');
          return result;
        } else {
          return dispatch(submitFormError(json.errorMessage));
        }
      })
      .catch((error) => dispatch(submitFormError(error.message)));
  };
}

export const submitFormBegin : ActionCreator<ISubmitForm> = () => {
  return {
    type: constants.SUBMIT_APPLICATION_BEGIN,
  };
}

export const submitFormSuccess : ActionCreator<ISubmitFormSuccess> = (token : string, clientID: string, clientSecret: string) => {
  return {
    clientID,
    clientSecret,
    token,
    type: constants.SUBMIT_APPLICATION_SUCCESS,
  };
}

export const submitFormError : ActionCreator<ISubmitFormError> = (status : string) => {
  return {
    status,
    type: constants.SUBMIT_APPLICATION_ERROR,
  };
}

export const validateByPattern = (newValue: IErrorableInput, pattern: RegExp, failMsg: string) => {
  const invalid = (newValue.value == null) || !newValue.value.match(pattern);
  if (invalid) {
    newValue.validation = failMsg;
  }
}

export const validateEmail = (newValue: IErrorableInput) => {
  validateByPattern(newValue, EMAIL_REGEX, "Must be a valid email address.");
  return newValue;
}

export const validateOAuthRedirectURI = (newValue: IErrorableInput) => {
  const partialUrlPattern = /^http[s]?:[/][/][^/:?#]+(:[0-9]+)?([/][^?#]*)?$/;
  validateByPattern(newValue, partialUrlPattern, "Must be an http or https URL.");
  return newValue;
}

export const updateApplicationEmail : ActionCreator<IUpdateApplicationEmail> = (newValue: IErrorableInput) => {
  return {
    newValue: validateEmail(newValue),
    type: constants.UPDATE_APPLICATION_EMAIL,
  }
}

export const updateApplicationDescription : ActionCreator<IUpdateApplicationDescription> = (newValue: IErrorableInput) => {
  return {
    newValue,
    type: constants.UPDATE_APPLICATION_DESCRIPTION,
  }
}

export const updateApplicationFirstName : ActionCreator<IUpdateApplicationFirstName> = (newValue: IErrorableInput) => {
  return {
    newValue,
    type: constants.UPDATE_APPLICATION_FIRST_NAME,
  }
}

export const updateApplicationLastName : ActionCreator<IUpdateApplicationLastName> = (newValue: IErrorableInput) => {
  return {
    newValue,
    type: constants.UPDATE_APPLICATION_LAST_NAME,
  }
}

export const updateApplicationOAuthRedirectURI : ActionCreator<IUpdateApplicationOAuthRedirectURI> = (newValue: IErrorableInput) => {
  return {
    newValue: validateOAuthRedirectURI(newValue),
    type: constants.UPDATE_APPLICATION_OAUTH_REDIRECT_URL,
  }
}

export const updateApplicationOrganization : ActionCreator<IUpdateApplicationOrganization> = (newValue: IErrorableInput) => {
  return {
    newValue,
    type: constants.UPDATE_APPLICATION_ORGANIZATION,
  }
}

export const toggleBenefitsApi : ActionCreator<IToggleBenefitsApi> = () =>  {
  return {
    type: constants.TOGGLE_BENEFITS_CHECKED,
  }
}

export const toggleAppealsApi : ActionCreator<IToggleAppealsApi> = () => {
  return {
    type: constants.TOGGLE_APPEALS_CHECKED,
  }
}

export const toggleHealthApi : ActionCreator<IToggleHealthApi> = () => {
  return {
    type: constants.TOGGLE_HEALTH_CHECKED,
  }
}

export const toggleVerificationApi : ActionCreator<IToggleVerificationApi> = () => {
  return {
    type: constants.TOGGLE_VERIFICATION_CHECKED,
  }
}

export const toggleFacilitiesApi : ActionCreator<IToggleFacilitiesApi> = () => {
  return {
    type: constants.TOGGLE_FACILITIES_CHECKED,
  }
}

export const toggleAcceptTos: ActionCreator<IToggleAcceptTos> = () => {
  return {
    type: constants.TOGGLE_ACCEPT_TOS,
  }
}
