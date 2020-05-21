import { SubmitFormAction, UpdateApplicationAction } from '../actions';
import { IApplication, IApplicationInputs } from '../types';
import * as constants from '../types/constants';

const initialApplicationInputs: IApplicationInputs = {
  apis: {
    appeals: false,
    benefits: false,
    claims: false,
    communityCare: false,
    confirmation: false,
    facilities: false,
    health: false,
    vaForms: false,
    verification: false,
  },
  description: {
    dirty: false,
    value: '',
  },
  email: {
    dirty: false,
    value: '',
  },
  firstName: {
    dirty: false,
    value: '',
  },
  lastName: {
    dirty: false,
    value: '',
  },
  oAuthApplicationType: {
    dirty: false,
    value: '',
  },
  oAuthRedirectURI: {
    dirty: false,
    value: '',
  },
  organization: {
    dirty: false,
    value: '',
  },
  termsOfService: false,
};

export const initialApplicationState: IApplication = {
  clientID: '',
  clientSecret: '',
  inputs: initialApplicationInputs,
  sending: false,
  token: '',
};

const applyApis: string[] = [
  'benefits',
  'facilities',
  'vaForms',
  'confirmation',
  'claims',
  'health',
  'communityCare',
  'verification',
];

export function applicationInput(
  inputs: IApplicationInputs = initialApplicationInputs,
  action: UpdateApplicationAction,
): IApplicationInputs {
  switch (action.type) {
    case constants.UPDATE_APPLICATION_DESCRIPTION:
      return { ...inputs, description: action.newValue };
    case constants.UPDATE_APPLICATION_EMAIL:
      return { ...inputs, email: action.newValue };
    case constants.UPDATE_APPLICATION_FIRST_NAME:
      return { ...inputs, firstName: action.newValue };
    case constants.UPDATE_APPLICATION_LAST_NAME:
      return { ...inputs, lastName: action.newValue };
    case constants.UPDATE_APPLICATION_OAUTH_APPLICATION_TYPE:
      return { ...inputs, oAuthApplicationType: action.newValue };
    case constants.UPDATE_APPLICATION_OAUTH_REDIRECT_URL:
      return { ...inputs, oAuthRedirectURI: action.newValue };
    case constants.UPDATE_APPLICATION_ORGANIZATION:
      return { ...inputs, organization: action.newValue };
    case constants.TOGGLE_SELECTED_API:
      if (!applyApis.includes(action.apiId)) {
        return inputs;
      }

      const isApiSelected = !inputs.apis[action.apiId];
      return { ...inputs, apis: { ... inputs.apis, [action.apiId]: isApiSelected }};
    case constants.TOGGLE_ACCEPT_TOS:
      const termsOfService = !inputs.termsOfService;
      return { ...inputs, termsOfService };
  }
  return inputs;
}

export function application(
  state: IApplication = initialApplicationState,
  action: SubmitFormAction | UpdateApplicationAction,
): IApplication {
  switch (action.type) {
    case constants.SUBMIT_APPLICATION_BEGIN:
      return { ...state, sending: true, errorStatus: undefined };
    case constants.SUBMIT_APPLICATION_SUCCESS:
      return {
        ...state,
        clientID: action.clientID,
        clientSecret: action.clientSecret,
        sending: false,
        token: action.token,
      };
    case constants.SUBMIT_APPLICATION_ERROR:
      return { ...state, sending: false, errorStatus: action.status };
    default:
      return { ...state, inputs: applicationInput(state.inputs, action) };
  }
}
