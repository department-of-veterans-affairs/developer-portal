import 'jest';
import * as constants from '../types/constants';
import { IApplication } from '../types';
import { application } from './index';

const app : IApplication = {
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

describe('application', () => {
  it('should update app description when change comes in', () => {
    const newValue = {
      dirty: true,
      value: 'test',
    };
    expect(
      application(app, { newValue, type: constants.UPDATE_APPLICATION_DESCRIPTION })
    ).toEqual(expect.objectContaining({
      description: {
        dirty: true,
        value: 'test',
      }
    }));
  });

  it('should update app first name when change comes in', () => {
    const newValue = {
      dirty: true,
      value: 'test',
    };
    expect(
      application(app, { newValue, type: constants.UPDATE_APPLICATION_FIRST_NAME })
    ).toEqual(expect.objectContaining({
      firstName: {
        dirty: true,
        value: 'test',
      }
    }));
  });

  it('should update app last name when change comes in', () => {
    const newValue = {
      dirty: true,
      value: 'test',
    };
    expect(
      application(app, { newValue, type: constants.UPDATE_APPLICATION_LAST_NAME })
    ).toEqual(expect.objectContaining({
      lastName: {
        dirty: true,
        value: 'test',
      }
    }));
  });

  it('should update app organization when change comes in', () => {
    const newValue = {
      dirty: true,
      value: 'test',
    };
    expect(
      application(app, { newValue, type: constants.UPDATE_APPLICATION_ORGANIZATION })
    ).toEqual(expect.objectContaining({
      organization: {
        dirty: true,
        value: 'test',
      }
    }));
  });

  it('should update app organization when change comes in', () => {
    const newValue = {
      dirty: true,
      value: 'test',
    };
    expect(
      application(app, { newValue, type: constants.UPDATE_APPLICATION_ORGANIZATION })
    ).toEqual(expect.objectContaining({
      organization: {
        dirty: true,
        value: 'test',
      }
    }));
  });

  it('should update app email when change comes in', () => {
    const newValue = {
      dirty: true,
      value: 'test',
    };
    expect(
      application(app, { newValue, type: constants.UPDATE_APPLICATION_EMAIL })
    ).toEqual(expect.objectContaining({
      email: {
        dirty: true,
        value: 'test',
      }
    }));
  });

  it('should toggle benefits api', () => {
    const newApp = application(app, { type: constants.TOGGLE_BENEFITS_CHECKED });
    expect(newApp)
      .toEqual(expect.objectContaining({
        apis: expect.objectContaining({
          benefits: true
        })
      }));
    expect(application(newApp, { type: constants.TOGGLE_BENEFITS_CHECKED }))
      .toEqual(expect.objectContaining({
        apis: expect.objectContaining({
          benefits: false
        })
      }));
  });

  it('should toggle appeals api', () => {
    const newApp = application(app, { type: constants.TOGGLE_APPEALS_CHECKED });
    expect(newApp)
      .toEqual(expect.objectContaining({
        apis: expect.objectContaining({
          appeals: true
        })
      }));
    expect(application(newApp, { type: constants.TOGGLE_APPEALS_CHECKED }))
      .toEqual(expect.objectContaining({
        apis: expect.objectContaining({
          appeals: false
        })
      }));
  });

  it('should toggle health api', () => {
    const newApp = application(app, { type: constants.TOGGLE_HEALTH_CHECKED });
    expect(newApp)
      .toEqual(expect.objectContaining({
        apis: expect.objectContaining({
          health: true
        })
      }));
    expect(application(newApp, { type: constants.TOGGLE_HEALTH_CHECKED }))
      .toEqual(expect.objectContaining({
        apis: expect.objectContaining({
          health: false
        })
      }));
  });

  it('should toggle verification api', () => {
    const newApp = application(app, { type: constants.TOGGLE_VERIFICATION_CHECKED });
    expect(newApp)
      .toEqual(expect.objectContaining({
        apis: expect.objectContaining({
          verification: true
        })
      }));
    expect(application(newApp, { type: constants.TOGGLE_VERIFICATION_CHECKED }))
      .toEqual(expect.objectContaining({
        apis: expect.objectContaining({
          verification: false
        })
      }));
  });

  it('should toggle facilities api', () => {
    const newApp = application(app, { type: constants.TOGGLE_FACILITIES_CHECKED });
    expect(newApp)
      .toEqual(expect.objectContaining({
        apis: expect.objectContaining({
          facilities: true
        })
      }));
    expect(application(newApp, { type: constants.TOGGLE_FACILITIES_CHECKED }))
      .toEqual(expect.objectContaining({
        apis: expect.objectContaining({
          facilities: false
        })
      }));
  });

  it('should set state to sending when application send begins', () => {
    expect(application(app, { type: constants.SUBMIT_APPLICATION_BEGIN }))
      .toEqual(expect.objectContaining({
        sending: true
      }));
  });

  it('should set errorStatus application send errors', () => {
    const newApp = application(app, { type: constants.SUBMIT_APPLICATION_BEGIN });
    expect(application(newApp, { status: 'Error happened', type: constants.SUBMIT_APPLICATION_ERROR }))
      .toEqual(expect.objectContaining({
        sending: false,
        errorStatus: 'Error happened',
      }));
  });

  it('should set token on application send errors', () => {
    const newApp = application(app, { type: constants.SUBMIT_APPLICATION_BEGIN });
    expect(application(newApp, { token: 'test-token', type: constants.SUBMIT_APPLICATION_SUCCESS }))
      .toEqual(expect.objectContaining({
        sending: false,
        token: 'test-token',
      }));
  });

});
