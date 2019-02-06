import { SubmitFormAction, UpdateApplicationAction } from '../actions';
import { IApplication, IApplicationInputs } from '../types';
import * as constants from '../types/constants';

const initialApplicationInputs : IApplicationInputs = {
  apis: {
    appeals: false,
    benefits: false,
    facilities: false,
    health: false,
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
  organization: {
    dirty: false,
    value: '',
  },
  termsOfService: true,
};

export const initialApplicationState : IApplication = {
  inputs: initialApplicationInputs,
  sending: false,
  token: '',
};

export function applicationInput(inputs: IApplicationInputs = initialApplicationInputs, action: UpdateApplicationAction) : IApplicationInputs {
  switch (action.type) {
    case constants.UPDATE_APPLICATION_DESCRIPTION:
      return { ...inputs, description: action.newValue};
    case constants.UPDATE_APPLICATION_EMAIL:
      return { ...inputs, email: action.newValue };
    case constants.UPDATE_APPLICATION_FIRST_NAME:
      return { ...inputs, firstName: action.newValue };
    case constants.UPDATE_APPLICATION_LAST_NAME:
      return { ...inputs, lastName: action.newValue };
    case constants.UPDATE_APPLICATION_ORGANIZATION:
      return { ...inputs, organization: action.newValue };
    case constants.TOGGLE_BENEFITS_CHECKED:
      const benefits = !inputs.apis.benefits;
      return { ...inputs, apis: { ...inputs.apis, benefits } };
    case constants.TOGGLE_APPEALS_CHECKED:
      const appeals = !inputs.apis.appeals;
      return { ...inputs, apis: { ...inputs.apis, appeals } };
    case constants.TOGGLE_HEALTH_CHECKED:
      const health = !inputs.apis.health;
      return { ...inputs, apis: { ...inputs.apis, health } };
    case constants.TOGGLE_VERIFICATION_CHECKED:
      const verification = !inputs.apis.verification;
      return { ...inputs, apis: { ...inputs.apis, verification } };
    case constants.TOGGLE_FACILITIES_CHECKED:
      const facilities = !inputs.apis.facilities;
      return { ...inputs, apis: { ...inputs.apis, facilities } };
    case constants.TOGGLE_ACCEPT_TOS:
      const termsOfService = !inputs.termsOfService;
      return { ...inputs, termsOfService };
  }
  return inputs;
}

export function application(state: IApplication = initialApplicationState, action: SubmitFormAction | UpdateApplicationAction) : IApplication {
  switch(action.type) {
    case constants.SUBMIT_APPLICATION_BEGIN:
      return { ...state, sending: true, errorStatus: undefined };
    case constants.SUBMIT_APPLICATION_SUCCESS:
      return { ...state, sending: false, token: action.token };
    case constants.SUBMIT_APPLICATION_ERROR:
      return { ...state, sending: false, errorStatus: action.status};
    default:
      return { ...state, inputs: applicationInput(state.inputs, action) };
  }
  return state;
}

