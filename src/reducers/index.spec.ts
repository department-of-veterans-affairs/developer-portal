import 'jest';

import { ToggleSelectedAPI, UpdateApplicationAction } from '../actions';
import { ApplySuccessResult, DevApplication } from '../types';
import * as constants from '../types/constants';
import { application } from './index';

const app: DevApplication = {
  inputs: {
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
  },
  sending: false,
};

describe('application', () => {
  it('should update application state when inputs are changed', () => {
    const inputToActionMap: Array<[string, string]> = [
      ['description', constants.UPDATE_APPLY_DESCRIPTION_VALUE],
      ['firstName', constants.UPDATE_APPLY_FIRST_NAME_VALUE],
      ['lastName', constants.UPDATE_APPLY_LAST_NAME_VALUE],
      ['email', constants.UPDATE_APPLY_EMAIL_VALUE],
      ['oAuthApplicationType', constants.UPDATE_APPLY_OAUTH_APP_TYPE_VAL],
      ['oAuthRedirectURI', constants.UPDATE_APPLY_REDIRECT_URI_VALUE],
      ['organization', constants.UPDATE_APPLY_ORGANIZATION_VALUE],
    ];

    inputToActionMap.forEach(([fieldName, actionName]: [string, string]) => {
      const newValue = {
        dirty: true,
        value: 'test',
      };

      const { inputs } = application(app, { newValue, type: actionName } as UpdateApplicationAction);
      const expectedSubObject = { [fieldName]: newValue };
      expect(inputs).toEqual(expect.objectContaining(expectedSubObject));
    });
  });

  it('should toggle selected APIs', () => {
    const applyApis: string[] = Object.keys(constants.APPLY_FIELDS_TO_URL_FRAGMENTS);
    applyApis.forEach(apiId => {
      const toggleAction: ToggleSelectedAPI = {
        apiId,
        type: constants.TOGGLE_SELECTED_API_VALUE,
      };

      let newApp = application(app, toggleAction);
      expect(newApp.inputs.apis[apiId]).toBe(true);

      newApp = application(newApp, toggleAction);
      expect(newApp.inputs.apis[apiId]).toBe(false);
    });
  });

  it('should not toggle an API that does not exist', () => {
    const newInputs = application(app, {
      apiId: 'fakeapi',
      type: constants.TOGGLE_SELECTED_API_VALUE,
    }).inputs;

    expect(newInputs).toEqual(app.inputs);
  });

  it('should set state to sending when application send begins', () => {
    expect(application(app, { type: constants.SUBMIT_APPLICATION_BEGIN_VALUE })).toEqual(
      expect.objectContaining({
        sending: true,
      }),
    );
  });

  it('should set errorStatus application send errors', () => {
    const newApp = application(app, {
      type: constants.SUBMIT_APPLICATION_BEGIN_VALUE,
    });
    expect(
      application(newApp, {
        status: 'Error happened',
        type: constants.SUBMIT_APPLICATION_ERROR_VALUE,
      }),
    ).toEqual(
      expect.objectContaining({
        errorStatus: 'Error happened',
        sending: false,
      }),
    );
  });

  it('should set token and OAuth credentials on a successful submit', () => {
    const newApp = application(app, {
      type: constants.SUBMIT_APPLICATION_BEGIN_VALUE,
    });
    expect(
      application(newApp, {
        clientID: 'clientID',
        clientSecret: 'clientSecret',
        token: 'test-token',
        type: constants.SUBMIT_APPLICATION_SUCCESS_VALUE,
      }),
    ).toEqual(
      expect.objectContaining<Partial<DevApplication>>({
        result: expect.objectContaining<ApplySuccessResult>({
          apis: newApp.inputs.apis,
          clientID: 'clientID',
          clientSecret: 'clientSecret',
          email: newApp.inputs.email.value,
          token: 'test-token',
        }) as ApplySuccessResult,
        sending: false,
      }),
    );
  });

  it('should toggle termsOfService acceptance', () => {
    const newApp = application(app, { type: constants.TOGGLE_ACCEPT_TOS_VALUE });
    expect(newApp.inputs).toEqual(
      expect.objectContaining({
        termsOfService: true,
      }),
    );
    expect(application(newApp, { type: constants.TOGGLE_ACCEPT_TOS_VALUE }).inputs).toEqual(
      expect.objectContaining({
        termsOfService: false,
      }),
    );
  });
});
