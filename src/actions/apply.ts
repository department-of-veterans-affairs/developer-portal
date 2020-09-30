import * as Sentry from '@sentry/browser';
import { Action, ActionCreator } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { history } from '../store';
import { IApiList, IErrorableInput, IRootState } from '../types';
import * as constants from '../types/constants';
import { validateEmail, validateOAuthRedirectURI } from '../utils/validators';

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
  previousValidation?: string;
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

export interface IUpdateApplicationOAuthApplicationType extends Action {
  newValue: IErrorableInput;
  type: constants.UPDATE_APPLICATION_OAUTH_APPLICATION_TYPE;
}

export interface IUpdateApplicationOAuthRedirectURI extends Action {
  newValue: IErrorableInput;
  previousValidation?: string;
  type: constants.UPDATE_APPLICATION_OAUTH_REDIRECT_URI;
}

export interface IToggleAcceptTos extends Action {
  type: constants.TOGGLE_ACCEPT_TOS;
}

export interface IToggleSelectedApi extends Action {
  type: constants.TOGGLE_SELECTED_API;
  apiId: string;
}

export type UpdateApplicationAction =
  | IUpdateApplicationDescription
  | IUpdateApplicationEmail
  | IUpdateApplicationFirstName
  | IUpdateApplicationLastName
  | IUpdateApplicationOrganization
  | IUpdateApplicationOAuthApplicationType
  | IUpdateApplicationOAuthRedirectURI
  | IToggleAcceptTos
  | IToggleSelectedApi;

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

export type SubmitFormThunk = ThunkAction<
  Promise<SubmitFormAction>,
  IRootState,
  undefined,
  SubmitFormAction
>;

const apisToList = (apis: IApiList) => {
  return Object.keys(apis)
    .filter(key => apis[key])
    .join(',');
};

function buildApplicationBody({ application }: IRootState) {
  const applicationBody: any = {};
  applicationBody.apis = apisToList(application.inputs.apis);
  [
    'description',
    'email',
    'firstName',
    'lastName',
    'oAuthApplicationType',
    'oAuthRedirectURI',
    'organization',
  ].forEach(property => {
    if (application.inputs[property]) {
      applicationBody[property] = application.inputs[property].value;
    }
  });
  applicationBody.termsOfService = application.inputs.termsOfService;
  return applicationBody;
}

export const submitForm: ActionCreator<SubmitFormThunk> = () => {
  return (dispatch, state) => {
    dispatch(submitFormBegin());
    const applicationBody = buildApplicationBody(state());
    const request = new Request(constants.APPLY_URL, {
      body: JSON.stringify(applicationBody),
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
      },
      method: 'POST',
    });

    return fetch(request)
      .then(response => {
        // The developer-portal-backend sends a 400 status, along with an array of validation error strings, when validation errors are present on the form.
        if (!response.ok && response.status !== 400) {
          throw Error(response.statusText);
        }
        return response;
      })
      .then(response => response.json())
      .then(json => {
        if (json.errors) {
          throw Error(`Developer Application validation errors: ${json.errors.join(', ')}`);
        }
        if (json.token || json.clientID) {
          const result = dispatch(submitFormSuccess(json.token, json.clientID, json.clientSecret));
          history.push('/applied');
          return result;
        } else {
          return dispatch(submitFormError(json.errorMessage));
        }
      })
      .catch(error => {
        Sentry.withScope(scope => {
          scope.setLevel(Sentry.Severity.fromString('warning'));
          Sentry.captureException(error);
        });
        return dispatch(submitFormError(error.message));
      });
  };
};

export const submitFormBegin: ActionCreator<ISubmitForm> = () => {
  return {
    type: constants.SUBMIT_APPLICATION_BEGIN,
  };
};

export const submitFormSuccess: ActionCreator<ISubmitFormSuccess> = (
  token: string,
  clientID: string,
  clientSecret: string,
) => {
  return {
    clientID,
    clientSecret,
    token,
    type: constants.SUBMIT_APPLICATION_SUCCESS,
  };
};

export const submitFormError: ActionCreator<ISubmitFormError> = (status: string) => {
  return {
    status,
    type: constants.SUBMIT_APPLICATION_ERROR,
  };
};

/*
  IErrorableInput is designed to work with the formation-react form controls, but
  formation-react text inputs (ErrorableTextInput, ErrorableNumberInput, and 
  ErrorableTextArea) take a sort of backwards approach to dirty fields and therefore 
  validation hooks. these components have a required onValueChange prop that accepts
  an object with a `value` string and a `dirty` bool that is used for both the onChange
  and onBlur events - meaning (a) that the component manages those events itself and (b)
  the handler prop must work for both events. 

  the big problem with that is that the dirty bool isn't set to a value that makes
  sense. in the change handler, `dirty` is set to the value of `props.field.dirty`,
  when the change event implies that the value *is* dirty. meanwhile, in the blur
  handler, `dirty` is always true, but the blur event *does not* imply that the value
  changed.

  the implication for us is that we want to validate when `dirty` is true, because we
  want to validate on blur. this will trigger validations that are unnecessary but not
  harmful (because if the value has not changed, the validation result will be the same).
  on the other hand, `dirty` doesn't actually mean "dirty", and we don't want to set 
  it to true ourselves because then we might validate outside

  code: https://github.com/department-of-veterans-affairs/veteran-facing-services-tools/blob/e7d2a079e7ed1979b125f8a43495b35da34d66e5/packages/formation-react/src/components/ErrorableTextInput/ErrorableTextInput.jsx#L41

  tl;dr dirty doesn't mean dirty, it means validate, and we shouldn't use it for 
  anything else.
*/
export const updateApplicationEmail: ActionCreator<IUpdateApplicationEmail> = (
  newValue: IErrorableInput,
  previousValidation?: string,
) => {
  if (newValue.dirty) {
    newValue = validateEmail(newValue);
    newValue.dirty = false;
  } else {
    // the newValue passed by IErrorableInput doesn't include validation
    newValue.validation = previousValidation;
  }

  return {
    newValue,
    type: constants.UPDATE_APPLICATION_EMAIL,
  };
};

export const updateApplicationDescription: ActionCreator<IUpdateApplicationDescription> = (
  newValue: IErrorableInput,
) => {
  return {
    newValue,
    type: constants.UPDATE_APPLICATION_DESCRIPTION,
  };
};

export const updateApplicationFirstName: ActionCreator<IUpdateApplicationFirstName> = (
  newValue: IErrorableInput,
) => {
  return {
    newValue,
    type: constants.UPDATE_APPLICATION_FIRST_NAME,
  };
};

export const updateApplicationLastName: ActionCreator<IUpdateApplicationLastName> = (
  newValue: IErrorableInput,
) => {
  return {
    newValue,
    type: constants.UPDATE_APPLICATION_LAST_NAME,
  };
};

export const updateApplicationOAuthApplicationType: ActionCreator<
  IUpdateApplicationOAuthApplicationType
> = (newValue: IErrorableInput) => {
  return {
    newValue,
    type: constants.UPDATE_APPLICATION_OAUTH_APPLICATION_TYPE,
  };
};

// see note on update/validate above on updateApplicationEmail
export const updateApplicationOAuthRedirectURI: ActionCreator<
  IUpdateApplicationOAuthRedirectURI
> = (newValue: IErrorableInput, previousValidation?: string) => {
  if (newValue.dirty) {
    newValue = validateOAuthRedirectURI(newValue);
    newValue.dirty = false;
  } else {
    // the newValue passed by IErrorableInput doesn't include validation
    newValue.validation = previousValidation;
  }

  return {
    newValue,
    type: constants.UPDATE_APPLICATION_OAUTH_REDIRECT_URI,
  };
};

export const updateApplicationOrganization: ActionCreator<IUpdateApplicationOrganization> = (
  newValue: IErrorableInput,
) => {
  return {
    newValue,
    type: constants.UPDATE_APPLICATION_ORGANIZATION,
  };
};

export const toggleSelectedApi: ActionCreator<IToggleSelectedApi> = (apiId: string) => {
  return {
    apiId,
    type: constants.TOGGLE_SELECTED_API,
  };
};

export const toggleAcceptTos: ActionCreator<IToggleAcceptTos> = () => {
  return {
    type: constants.TOGGLE_ACCEPT_TOS,
  };
};
