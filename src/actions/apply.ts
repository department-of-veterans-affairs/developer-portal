import * as Sentry from '@sentry/browser';
import { Action, ActionCreator } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { history } from '../store';
import {
  APIList,
  DevApplicationRequest,
  DevApplicationResponse,
  ErrorableInput,
  RootState,
} from '../types';
import * as constants from '../types/constants';
import { validateEmail, validateOAuthRedirectURI } from '../utils/validators';

export interface UpdateApplicationFirstName extends Action {
  newValue: ErrorableInput;
  type: constants.UPDATE_APPLICATION_FIRST_NAME;
}

export interface UpdateApplicationLastName extends Action {
  newValue: ErrorableInput;
  type: constants.UPDATE_APPLICATION_LAST_NAME;
}

export interface UpdateApplicationEmail extends Action {
  newValue: ErrorableInput;
  previousValidation?: string;
  type: constants.UPDATE_APPLICATION_EMAIL;
}

export interface UpdateApplicationOrganization extends Action {
  newValue: ErrorableInput;
  type: constants.UPDATE_APPLICATION_ORGANIZATION;
}

export interface UpdateApplicationDescription extends Action {
  newValue: ErrorableInput;
  type: constants.UPDATE_APPLICATION_DESCRIPTION;
}

export interface UpdateApplicationOAuthApplicationType extends Action {
  newValue: ErrorableInput;
  type: constants.UPDATE_APPLICATION_OAUTH_APPLICATION_TYPE;
}

export interface UpdateApplicationOAuthRedirectURI extends Action {
  newValue: ErrorableInput;
  previousValidation?: string;
  type: constants.UPDATE_APPLICATION_OAUTH_REDIRECT_URI;
}

export interface ToggleAcceptTOS extends Action {
  type: constants.TOGGLE_ACCEPT_TOS;
}

export interface ToggleSelectedAPI extends Action {
  type: constants.TOGGLE_SELECTED_API;
  apiId: string;
}

export type UpdateApplicationAction =
  | UpdateApplicationDescription
  | UpdateApplicationEmail
  | UpdateApplicationFirstName
  | UpdateApplicationLastName
  | UpdateApplicationOrganization
  | UpdateApplicationOAuthApplicationType
  | UpdateApplicationOAuthRedirectURI
  | ToggleAcceptTOS
  | ToggleSelectedAPI;

export interface SubmitForm extends Action {
  type: constants.SUBMIT_APPLICATION_BEGIN;
}

export interface SubmitFormSuccess extends Action {
  clientID: string;
  clientSecret: string;
  type: constants.SUBMIT_APPLICATION_SUCCESS;
  token: string;
}

export interface SubmitFormError extends Action {
  type: constants.SUBMIT_APPLICATION_ERROR;
  status: string;
}

export type SubmitFormAction = SubmitForm | SubmitFormSuccess | SubmitFormError;

/* eslint-disable @typescript-eslint/indent */
export type SubmitFormThunk = ThunkAction<
  Promise<SubmitFormAction>,
  RootState,
  undefined,
  SubmitFormAction
>;
/* eslint-enable @typescript-eslint/indent */

const apisToList = (apis: APIList) =>
  Object.keys(apis)
    .filter(key => apis[key])
    .join(',');

const buildApplicationBody = ({ application }: RootState): DevApplicationRequest => ({
  apis: apisToList(application.inputs.apis),
  description: application.inputs.description.value,
  email: application.inputs.email.value,
  firstName: application.inputs.firstName.value,
  lastName: application.inputs.lastName.value,
  oAuthApplicationType: application.inputs.oAuthApplicationType.value,
  oAuthRedirectURI: application.inputs.oAuthRedirectURI.value,
  organization: application.inputs.organization.value,
  termsOfService: application.inputs.termsOfService,
});

export const submitForm: ActionCreator<SubmitFormThunk> = () => (dispatch, state) => {
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
    .then((json: DevApplicationResponse) => {
      if (json.errors) {
        throw Error(`Developer Application validation errors: ${json.errors.join(', ')}`);
      } else if (!json.token && !json.clientID) {
        throw Error(
          'Developer Application endpoint returned 200 response with a valid response body',
        );
      }

      const result = dispatch(submitFormSuccess(json.token, json.clientID, json.clientSecret));
      history.push('/applied');
      return result;
    })
    .catch((error: Error) => {
      Sentry.withScope(scope => {
        scope.setLevel(Sentry.Severity.fromString('warning'));
        Sentry.captureException(error);
      });
      return dispatch(submitFormError(error.message));
    });
};

export const submitFormBegin: ActionCreator<SubmitForm> = () => ({
  type: constants.SUBMIT_APPLICATION_BEGIN,
});

export const submitFormSuccess: ActionCreator<SubmitFormSuccess> = (
  token: string,
  clientID: string,
  clientSecret: string,
) => ({
  clientID,
  clientSecret,
  token,
  type: constants.SUBMIT_APPLICATION_SUCCESS,
});

export const submitFormError: ActionCreator<SubmitFormError> = (status: string) => ({
  status,
  type: constants.SUBMIT_APPLICATION_ERROR,
});

/**
 * IErrorableInput is designed to work with the formation-react form controls, but
 * formation-react text inputs (ErrorableTextInput, ErrorableNumberInput, and
 * ErrorableTextArea) take a sort of backwards approach to dirty fields and therefore
 * validation hooks. these components have a required onValueChange prop that accepts
 * an object with a `value` string and a `dirty` bool that is used for both the onChange
 * and onBlur events - meaning (a) that the component manages those events itself and (b)
 * the handler prop must work for both events.
 *
 * the big problem with that is that the dirty bool isn't set to a value that makes
 * sense. in the change handler, `dirty` is set to the value of `props.field.dirty`,
 * when the change event implies that the value *is* dirty. meanwhile, in the blur
 * handler, `dirty` is always true, but the blur event *does not* imply that the value
 * changed.
 *
 * the implication for us is that we want to validate when `dirty` is true, because we
 * want to validate on blur. this will trigger validations that are unnecessary but not
 * harmful (because if the value has not changed, the validation result will be the same).
 * on the other hand, `dirty` doesn't actually mean "dirty", and we don't want to set
 * it to true ourselves because then we might validate outside
 *
 * code: https://github.com/department-of-veterans-affairs/veteran-facing-services-tools/blob/e7d2a079e7ed1979b125f8a43495b35da34d66e5/packages/formation-react/src/components/ErrorableTextInput/ErrorableTextInput.jsx#L41
 *
 * tl;dr dirty doesn't mean dirty, it means validate, and we shouldn't use it for
 * anything else.
 */
export const updateApplicationEmail: ActionCreator<UpdateApplicationEmail> = (
  newValue: ErrorableInput,
  previousValidation?: string,
) => {
  let validatedValue: ErrorableInput;
  if (newValue.dirty) {
    validatedValue = validateEmail(newValue);
    validatedValue.dirty = false;
  } else {
    // the newValue passed by ErrorableInput doesn't include validation
    validatedValue = {
      ...newValue,
      validation: previousValidation,
    };
  }

  return {
    newValue: validatedValue,
    type: constants.UPDATE_APPLICATION_EMAIL,
  };
};

export const updateApplicationDescription: ActionCreator<UpdateApplicationDescription> = (
  newValue: ErrorableInput,
) => ({
  newValue,
  type: constants.UPDATE_APPLICATION_DESCRIPTION,
});

export const updateApplicationFirstName: ActionCreator<UpdateApplicationFirstName> = (
  newValue: ErrorableInput,
) => ({
  newValue,
  type: constants.UPDATE_APPLICATION_FIRST_NAME,
});

export const updateApplicationLastName: ActionCreator<UpdateApplicationLastName> = (
  newValue: ErrorableInput,
) => ({
  newValue,
  type: constants.UPDATE_APPLICATION_LAST_NAME,
});

/* eslint-disable @typescript-eslint/indent */
export const updateApplyOAuthApplicationType: ActionCreator<
  UpdateApplicationOAuthApplicationType
> = (newValue: ErrorableInput) => ({
  /* eslint-enable @typescript-eslint/indent */
  newValue,
  type: constants.UPDATE_APPLY_OAUTH_APP_TYPE,
});

// see note on update/validate above on updateApplicationEmail
export const updateApplyOAuthRedirectURI: ActionCreator<UpdateApplicationOAuthRedirectURI> = (
  newValue: ErrorableInput,
  previousValidation?: string,
) => {
  let validatedValue: ErrorableInput;
  if (newValue.dirty) {
    validatedValue = validateOAuthRedirectURI(newValue);
    validatedValue.dirty = false;
  } else {
    // the newValue passed by IErrorableInput doesn't include validation
    validatedValue = {
      ...newValue,
      validation: previousValidation,
    };
  }

  return {
    newValue: validatedValue,
    type: constants.UPDATE_APPLY_OAUTH_REDIRECT_URI,
  };
};

export const updateApplicationOrganization: ActionCreator<UpdateApplicationOrganization> = (
  newValue: ErrorableInput,
) => ({
  newValue,
  type: constants.UPDATE_APPLICATION_ORGANIZATION,
});

export const toggleSelectedApi: ActionCreator<ToggleSelectedAPI> = (apiId: string) => ({
  apiId,
  type: constants.TOGGLE_SELECTED_API,
});

export const toggleAcceptTos: ActionCreator<ToggleAcceptTOS> = () => ({
  type: constants.TOGGLE_ACCEPT_TOS,
});
