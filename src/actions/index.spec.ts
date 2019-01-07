import 'jest';
import * as actions from './index';
import * as constants from '../types/constants';

afterEach(() => {
  fetch.resetMocks();
});

const appState = {
  application: {
    firstName: 'James',
    lastName: 'Rodríguez',
    organization: 'Fußball-Club Bayern München',
    email: 'james@hotmail.co',
    apis: {
      health: true,
      verification: false,
      benefits: true,
      facilities: false,
    },
  },
};

describe('submitForm', () => {
  it('dispatches correct events when fetch has a 200 response', async () => {
    fetch.mockResponse(JSON.stringify({token: 'testtoken'}));
    const dispatch = jest.fn();
    const getState = jest.fn();
    getState.mockReturnValueOnce(appState);
    await actions.submitForm()(dispatch, getState, undefined);
    expect(dispatch).toBeCalledWith({type: constants.SUBMIT_APPLICATION_BEGIN});
    expect(dispatch).toBeCalledWith({
      token: 'testtoken',
      type: constants.SUBMIT_APPLICATION_SUCCESS,
    });
  });

  it('dispatches error events when the fetch errors', async () => {
    fetch.mockReject(new Error('Oops'));
    const dispatch = jest.fn();
    const getState = jest.fn();
    getState.mockReturnValueOnce(appState);
    await actions.submitForm()(dispatch, getState, undefined);
    expect(dispatch).toBeCalledWith({type: constants.SUBMIT_APPLICATION_BEGIN});
    expect(dispatch).toBeCalledWith({
      type: constants.SUBMIT_APPLICATION_ERROR,
      status: 'Max Retries Exceeded. Last Status: Oops',
    });
  });

  it('retries the correct number of times the fetch errors', async () => {
    fetch.mockReject(new Error('Oops'));
    const dispatch = jest.fn();
    const getState = jest.fn();
    getState.mockReturnValueOnce(appState);
    await actions.submitForm()(dispatch, getState, undefined);
    expect(fetch.mock.calls.length).toEqual(3);
  });

  it('dispatches error events when fetch returns non-200', async () => {
    fetch.mockResponses(
      [
        JSON.stringify({ error: 'not found' }),
        { status: 404 }
      ],
      [
        JSON.stringify({ error: 'not found' }),
        { status: 404 }
      ],
      [
        JSON.stringify({ error: 'not found' }),
        { status: 404 }
      ],
    );
    const dispatch = jest.fn();
    const getState = jest.fn();
    getState.mockReturnValueOnce(appState);
    await actions.submitForm()(dispatch, getState, undefined);
    expect(dispatch).toBeCalledWith({type: constants.SUBMIT_APPLICATION_BEGIN});
    expect(dispatch).toBeCalledWith({
      type: constants.SUBMIT_APPLICATION_ERROR,
      status: 'Max Retries Exceeded. Last Status: Not Found',
    });
  });
});

describe('submitFormBegin', () => {
  it('should return the correct type', () => {
    expect(actions.submitFormBegin()).toEqual({type: constants.SUBMIT_APPLICATION_BEGIN});
  });
});

describe('submitFormSuccess', () => {
  it('should return the correct type', () => {
    expect(actions.submitFormSuccess('test-token')).toEqual({
      type: constants.SUBMIT_APPLICATION_SUCCESS,
      token: 'test-token'
    });
  });
});

describe('submitFormError', () => {
  it('should return the correct type', () => {
    expect(actions.submitFormError('test-token')).toEqual({
      type: constants.SUBMIT_APPLICATION_ERROR,
      status: 'test-token'
    });
  });
});

describe('validateEmail', () => {
  it('should add validation filed to newValue when email is not valid', () => {
    expect(
      actions.validateEmail({ dirty: true, value: 'bademail(at)example.com'})
    ).toEqual(expect.objectContaining(
      { validation: 'Must be a valid email address.' }
    ));
  })

  it('should not add validation if the email is valid', () => {
    expect(
      actions.validateEmail({ dirty: true, value: 'goodemail@example.com'})
    ).toEqual(expect.not.objectContaining(
      { validation: 'Must be a valid email address.' }
    ));
  })
});

describe('updateApplicationEmail', () => {
  it('should return the newValue for input', () => {
    const newValue = {
      dirty: true,
      value: 'goodemail@example.com',
    }
    expect(actions.updateApplicationEmail(newValue)).toEqual({
      newValue, type: constants.UPDATE_APPLICATION_EMAIL,
    });
  });

  it('should return the newValue for input with validation when email not correct', () => {
    const newValue = {
      dirty: true,
      value: 'bademail(at)example.com',
    }
    expect(actions.updateApplicationEmail(newValue)).toEqual({
      newValue: {...newValue, validation: 'Must be a valid email address.' },
      type: constants.UPDATE_APPLICATION_EMAIL,
    });
  });
});

describe('updateApplicationDescription', () => {
  it('should return the newValue for input', () => {
    const newValue = {
      dirty: true,
      value: 'text',
    }
    expect(actions.updateApplicationDescription(newValue)).toEqual({
      newValue, type: constants.UPDATE_APPLICATION_DESCRIPTION,
    });
  });
});

describe('updateApplicationFirstName', () => {
  it('should return the newValue for input', () => {
    const newValue = {
      dirty: true,
      value: 'text',
    }
    expect(actions.updateApplicationFirstName(newValue)).toEqual({
      newValue, type: constants.UPDATE_APPLICATION_FIRST_NAME,
    });
  });
});

describe('updateApplicationLastName', () => {
  it('should return the newValue for input', () => {
    const newValue = {
      dirty: true,
      value: 'text',
    };
    expect(actions.updateApplicationLastName(newValue)).toEqual({
      newValue, type: constants.UPDATE_APPLICATION_LAST_NAME,
    });
  });
});

describe('updateApplicationOrganization', () => {
  it('should return the newValue for input', () => {
    const newValue = {
      dirty: true,
      value: 'text',
    };
    expect(actions.updateApplicationOrganization(newValue)).toEqual({
      newValue, type: constants.UPDATE_APPLICATION_ORGANIZATION,
    });
  });
});

describe('toggleBenefitsApi', () => {
  it('should return the correct type', () => {
    expect(actions.toggleBenefitsApi()).toEqual({
      type: constants.TOGGLE_BENEFITS_CHECKED,
    });
  });
});

describe('toggleAppealsApi', () => {
  it('should return the correct type', () => {
    expect(actions.toggleAppealsApi()).toEqual({
      type: constants.TOGGLE_APPEALS_CHECKED,
    });
  });
});

describe('toggleHealthApi', () => {
  it('should return the correct type', () => {
    expect(actions.toggleHealthApi()).toEqual({
      type: constants.TOGGLE_HEALTH_CHECKED,
    });
  });
});

describe('toggleVerificationApi', () => {
  it('should return the correct type', () => {
    expect(actions.toggleVerificationApi()).toEqual({
      type: constants.TOGGLE_VERIFICATION_CHECKED,
    });
  });
});

describe('toggleFacilitiesApi', () => {
  it('should return the correct type', () => {
    expect(actions.toggleFacilitiesApi()).toEqual({
      type: constants.TOGGLE_FACILITIES_CHECKED,
    });
  });
});
