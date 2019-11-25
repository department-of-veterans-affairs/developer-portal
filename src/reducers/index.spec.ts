import 'jest';

import { IApplication } from '../types';
import * as constants from '../types/constants';
import { application } from './index';

const app: IApplication = {
  clientID: '',
  clientSecret: '',
  inputs: {
    apis: {
      appeals: false,
      benefits: false,
      claims: false,
      communityCare: false,
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
  token: '',
};

describe('application', () => {
  it('should update application state when inputs are changed', () => {
    const inputToActionMap: any[] = [
      ['description', constants.UPDATE_APPLICATION_DESCRIPTION],
      ['firstName', constants.UPDATE_APPLICATION_FIRST_NAME],
      ['lastName', constants.UPDATE_APPLICATION_LAST_NAME],
      ['email', constants.UPDATE_APPLICATION_EMAIL],
      ['oAuthRedirectURI', constants.UPDATE_APPLICATION_OAUTH_REDIRECT_URL],
      ['organization', constants.UPDATE_APPLICATION_ORGANIZATION],
    ];

    inputToActionMap.forEach(([fieldName, actionName]) => {
      const newValue = {
        dirty: true,
        value: 'test',
      };

      const inputs = application(app, { newValue, type: actionName }).inputs;

      const expectedSubObject = { [fieldName]: newValue };

      expect(inputs).toEqual(expect.objectContaining(expectedSubObject));
    });
  });

  it('should toggle benefits api', () => {
    const newApp = application(app, {
      type: constants.TOGGLE_BENEFITS_CHECKED,
    });
    expect(newApp.inputs).toEqual(
      expect.objectContaining({
        apis: expect.objectContaining({
          benefits: true,
        }),
      }),
    );
    expect(application(newApp, { type: constants.TOGGLE_BENEFITS_CHECKED }).inputs).toEqual(
      expect.objectContaining({
        apis: expect.objectContaining({
          benefits: false,
        }),
      }),
    );
  });

  it('should toggle claims api', () => {
    const newApp = application(app, {
      type: constants.TOGGLE_CLAIMS_CHECKED,
    });
    expect(newApp.inputs).toEqual(
      expect.objectContaining({
        apis: expect.objectContaining({
          claims: true,
        }),
      }),
    );
    expect(application(newApp, { type: constants.TOGGLE_CLAIMS_CHECKED }).inputs).toEqual(
      expect.objectContaining({
        apis: expect.objectContaining({
          claims: false,
        }),
      }),
    );
  });

  it('should toggle appeals api', () => {
    const newApp = application(app, { type: constants.TOGGLE_APPEALS_CHECKED });
    expect(newApp.inputs).toEqual(
      expect.objectContaining({
        apis: expect.objectContaining({
          appeals: true,
        }),
      }),
    );
    expect(application(newApp, { type: constants.TOGGLE_APPEALS_CHECKED }).inputs).toEqual(
      expect.objectContaining({
        apis: expect.objectContaining({
          appeals: false,
        }),
      }),
    );
  });

  it('should toggle health api', () => {
    const newApp = application(app, { type: constants.TOGGLE_HEALTH_CHECKED });
    expect(newApp.inputs).toEqual(
      expect.objectContaining({
        apis: expect.objectContaining({
          health: true,
        }),
      }),
    );
    expect(application(newApp, { type: constants.TOGGLE_HEALTH_CHECKED }).inputs).toEqual(
      expect.objectContaining({
        apis: expect.objectContaining({
          health: false,
        }),
      }),
    );
  });

  it('should toggle verification api', () => {
    const newApp = application(app, {
      type: constants.TOGGLE_VERIFICATION_CHECKED,
    });
    expect(newApp.inputs).toEqual(
      expect.objectContaining({
        apis: expect.objectContaining({
          verification: true,
        }),
      }),
    );
    expect(application(newApp, { type: constants.TOGGLE_VERIFICATION_CHECKED }).inputs).toEqual(
      expect.objectContaining({
        apis: expect.objectContaining({
          verification: false,
        }),
      }),
    );
  });

  it('should toggle facilities api', () => {
    const newApp = application(app, {
      type: constants.TOGGLE_FACILITIES_CHECKED,
    });
    expect(newApp.inputs).toEqual(
      expect.objectContaining({
        apis: expect.objectContaining({
          facilities: true,
        }),
      }),
    );
    expect(application(newApp, { type: constants.TOGGLE_FACILITIES_CHECKED }).inputs).toEqual(
      expect.objectContaining({
        apis: expect.objectContaining({
          facilities: false,
        }),
      }),
    );
  });

  it('should set state to sending when application send begins', () => {
    expect(application(app, { type: constants.SUBMIT_APPLICATION_BEGIN })).toEqual(
      expect.objectContaining({
        sending: true,
      }),
    );
  });

  it('should set errorStatus application send errors', () => {
    const newApp = application(app, {
      type: constants.SUBMIT_APPLICATION_BEGIN,
    });
    expect(
      application(newApp, {
        status: 'Error happened',
        type: constants.SUBMIT_APPLICATION_ERROR,
      }),
    ).toEqual(
      expect.objectContaining({
        errorStatus: 'Error happened',
        sending: false,
      }),
    );
  });

  it('should set token on application send errors', () => {
    const newApp = application(app, {
      type: constants.SUBMIT_APPLICATION_BEGIN,
    });
    expect(
      application(newApp, {
        clientID: 'clientID',
        clientSecret: 'clientSecret',
        token: 'test-token',
        type: constants.SUBMIT_APPLICATION_SUCCESS,
      }),
    ).toEqual(
      expect.objectContaining({
        clientID: 'clientID',
        clientSecret: 'clientSecret',
        sending: false,
        token: 'test-token',
      }),
    );
  });

  it('should toggle termsOfService acceptance', () => {
    const newApp = application(app, { type: constants.TOGGLE_ACCEPT_TOS });
    expect(newApp.inputs).toEqual(
      expect.objectContaining({
        termsOfService: true,
      }),
    );
    expect(application(newApp, { type: constants.TOGGLE_ACCEPT_TOS }).inputs).toEqual(
      expect.objectContaining({
        termsOfService: false,
      }),
    );
  });
});
