import { SubmitFormAction, UpdateApplicationAction } from '../actions';
import { IApplication } from '../types';
import * as constants from '../types/constants';

const initialApplicationState : IApplication = {
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
    sending: false,
    token: '',
};

export function application(state: IApplication = initialApplicationState, action: SubmitFormAction | UpdateApplicationAction) : IApplication {
    switch(action.type) {
        case constants.UPDATE_APPLICATION_DESCRIPTION:
            return { ...state, description: action.newValue};
        case constants.UPDATE_APPLICATION_EMAIL:
            return { ...state, email: action.newValue };
        case constants.UPDATE_APPLICATION_FIRST_NAME:
            return { ...state, firstName: action.newValue };
        case constants.UPDATE_APPLICATION_LAST_NAME:
            return { ...state, lastName: action.newValue };
        case constants.UPDATE_APPLICATION_ORGANIZATION:
            return { ...state, organization: action.newValue };
        case constants.TOGGLE_BENEFITS_CHECKED:
            const benefits = !state.apis.benefits;
            return { ...state, apis: { ...state.apis, benefits } };
        case constants.TOGGLE_APPEALS_CHECKED:
            const appeals = !state.apis.appeals;
            return { ...state, apis: { ...state.apis, appeals } };
        case constants.TOGGLE_HEALTH_CHECKED:
            const health = !state.apis.health;
            return { ...state, apis: { ...state.apis, health } };
        case constants.TOGGLE_VERIFICATION_CHECKED:
            const verification = !state.apis.verification;
            return { ...state, apis: { ...state.apis, verification } };
        case constants.TOGGLE_FACILITIES_CHECKED:
            const facilities = !state.apis.facilities;
            return { ...state, apis: { ...state.apis, facilities } };
        case constants.SUBMIT_APPLICATION_BEGIN:
            return { ...state, sending: true, errorStatus: undefined };
        case constants.SUBMIT_APPLICATION_SUCCESS:
            return { ...state, sending: false, token: action.token};
        case constants.SUBMIT_APPLICATION_ERROR:
            return { ...state, sending: false, errorStatus: action.status};
    }
    return state;
}
