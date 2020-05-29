import 'jest';

import * as constants from '../types/constants';
import * as validators from '../utils/validators';
import * as actions from './apply';

afterEach(() => {
  fetchMock.resetMocks();
});

const appState = {
  application: {
    inputs: {
      apis: {
        benefits: true,
        facilities: false,
        health: true,
        verification: false,
      },
      email: 'james@hotmail.co',
      firstName: 'James',
      lastName: 'Rodríguez',
      oAuthRedirectURI: 'http://localhost:8080/oauth/cb',
      organization: 'Fußball-Club Bayern München',
    },
  },
};

describe('submitForm', () => {
  it('dispatches correct events when fetch has a 200 response', async () => {
    fetchMock.mockResponse(
      JSON.stringify({
        clientID: 'testid',
        clientSecret: 'test_secret',
        token: 'testtoken',
      }),
    );
    const dispatch = jest.fn();
    const getState = jest.fn();
    getState.mockReturnValueOnce(appState);
    await actions.submitForm()(dispatch, getState, undefined);
    expect(dispatch).toBeCalledWith({
      type: constants.SUBMIT_APPLICATION_BEGIN,
    });
    expect(dispatch).toBeCalledWith({
      clientID: 'testid',
      clientSecret: 'test_secret',
      token: 'testtoken',
      type: constants.SUBMIT_APPLICATION_SUCCESS,
    });
  });

  it('dispatches error events when the fetch errors', async () => {
    fetchMock.mockReject(new Error('Network Failure'));
    const dispatch = jest.fn();
    const getState = jest.fn();
    getState.mockReturnValueOnce(appState);
    await actions.submitForm()(dispatch, getState, undefined);
    expect(dispatch).toBeCalledWith({
      type: constants.SUBMIT_APPLICATION_BEGIN,
    });
    expect(dispatch).toBeCalledWith({
      status: 'Network Failure',
      type: constants.SUBMIT_APPLICATION_ERROR,
    });
  });

  it('dispatches error events when fetch returns non-200', async () => {
    fetchMock.mockResponses(
      [JSON.stringify({ error: 'not found' }), { status: 404 }],
    );
    const dispatch = jest.fn();
    const getState = jest.fn();
    getState.mockReturnValueOnce(appState);
    await actions.submitForm()(dispatch, getState, undefined);
    expect(dispatch).toBeCalledWith({
      type: constants.SUBMIT_APPLICATION_BEGIN,
    });
    expect(dispatch).toBeCalledWith({
      status: 'Not Found',
      type: constants.SUBMIT_APPLICATION_ERROR,
    });
  });
});

describe('updateApplicationEmail', () => {
  it('should return the input value if the value is not dirty', () => {
    const newValue = {
      dirty: false,
      value: 'goodemail@example.com',
    };
    expect(actions.updateApplicationEmail(newValue)).toEqual({
      newValue,
      type: constants.UPDATE_APPLICATION_EMAIL,
    });
  });

  it('should return the input value for an incomplete/"not dirty" email', () => {
    // see comment on updateApplicationEmail in apply.ts
    const newValue = {
      dirty: false,
      value: 'imnotdonetyping@example',
    };
    expect(actions.updateApplicationEmail(newValue)).toEqual({
      newValue,
      type: constants.UPDATE_APPLICATION_EMAIL,
    });
  });

  it('should not have an error for a valid email', () => {
    const newValue = {
      dirty: true,
      value: 'goodemail@example.com',
    };

    expect(actions.updateApplicationEmail(newValue)).toEqual({
      newValue: {
        dirty: false,
        value: newValue.value,
      },
      type: constants.UPDATE_APPLICATION_EMAIL,
    });
  });

  it('should return the value with an error when email is invalid and "dirty"', () => {
    const newValue = {
      dirty: true,
      value: 'bademail(at)example.com',
    };
    expect(actions.updateApplicationEmail(newValue)).toEqual({
      newValue: {
        dirty: false,
        validation: 'Must be a valid email address.',
        value: newValue.value,
      },
      type: constants.UPDATE_APPLICATION_EMAIL,
    });
  });

  it('should include the old validation if email is "not dirty"', () => {
    const errorMessage = 'whoops bad email';
    const newValue = {
      dirty: false,
      value: 'not an email',
    };

    const updateAction = actions.updateApplicationEmail(newValue, errorMessage);
    expect(updateAction).toEqual({
      newValue: {
        ... newValue,
        validation: errorMessage,
      },
      type: constants.UPDATE_APPLICATION_EMAIL,
    });
  });

  it('should only validate email when input is "dirty" (on blur)', () => {
    const newValue = {
      dirty: false,
      value: 'goodemail@example.com',
    };

    const mockValidateEmail = jest.spyOn(validators, 'validateEmail')
      .mockReturnValue(newValue);    
    actions.updateApplicationEmail(newValue);
    expect(mockValidateEmail.mock.calls.length).toBe(0);
    
    newValue.dirty = true;
    actions.updateApplicationEmail(newValue);
    expect(mockValidateEmail.mock.calls.length).toBe(1);
    mockValidateEmail.mockRestore();
  });
});

describe('updateApplicationOAuthRedirectURI', () => {
  it('should return the input value when the value is "not dirty"', () => {
    const newValue = { 
      dirty: false, 
      value: 'http://valid.com/redirect',
    };
    
    const updateAction = actions.updateApplicationOAuthRedirectURI(newValue);
    expect(updateAction).toEqual({
      newValue,
      type: constants.UPDATE_APPLICATION_OAUTH_REDIRECT_URI,
    });
  });

  it('should return the input value for an incomplete/"not dirty" URI', () => {
    const newValue = { 
      dirty: false, 
      value: 'https://',
    };
    
    const updateAction = actions.updateApplicationOAuthRedirectURI(newValue);
    expect(updateAction).toEqual({
      newValue,
      type: constants.UPDATE_APPLICATION_OAUTH_REDIRECT_URI,
    });
  });

  it('should not include an error message for a valid HTTP(S) URI', () => {
    const newValue = { 
      dirty: true, 
      value: 'https://valid.com/redirect',
    };
    
    const updateAction = actions.updateApplicationOAuthRedirectURI(newValue);
    expect(updateAction).toEqual({
      newValue: {
        dirty: false, 
        value: newValue.value,
      },
      type: constants.UPDATE_APPLICATION_OAUTH_REDIRECT_URI,
    });
  });

  it('should include an error for an invalid and "dirty" redirect URI', () => {
    const newValue = { 
      dirty: true, 
      value: 'ftp://host:21',
    };
    
    const updateAction = actions.updateApplicationOAuthRedirectURI(newValue);
    expect(updateAction).toEqual({
      newValue: {
        dirty: false, 
        validation: 'Must be an http or https URI.',
        value: newValue.value,
      },
      type: constants.UPDATE_APPLICATION_OAUTH_REDIRECT_URI,
    });
  });

  it('should include the old validation if the redirect URI is not "dirty"', () => {
    const errorMessage = 'oopsy daisy not a URI';
    const newValue = {
      dirty: false,
      value: 'not an HTTP URI',
    };

    const updateAction = actions.updateApplicationOAuthRedirectURI(newValue, errorMessage);
    expect(updateAction).toEqual({
      newValue: {
        ... newValue,
        validation: errorMessage,
      },
      type: constants.UPDATE_APPLICATION_OAUTH_REDIRECT_URI,
    });
  });

  it('should only validate redirect URI when field is "dirty" (on blur)', () => {
    const newValue = {
      dirty: false,
      value: 'http://valid.com/redirect',
    };

    const mockValidateURI = jest.spyOn(validators, 'validateOAuthRedirectURI')
      .mockReturnValue(newValue);    
    actions.updateApplicationOAuthRedirectURI(newValue);
    expect(mockValidateURI.mock.calls.length).toBe(0);
    
    newValue.dirty = true;
    actions.updateApplicationOAuthRedirectURI(newValue);
    expect(mockValidateURI.mock.calls.length).toBe(1);
    mockValidateURI.mockRestore();
  });
});