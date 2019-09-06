import 'jest';

import * as constants from '../types/constants';
import { validateEmail, validateOAuthRedirectURI } from '../utils/validators';
import * as actions from './index';

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
      status: 'Max Retries Exceeded. Last Status: Network Failure',
      type: constants.SUBMIT_APPLICATION_ERROR,
    });
  });

  it('retries the correct number of times when the fetch errors', async () => {
    fetchMock.mockReject(new Error('Network Failure'));
    const dispatch = jest.fn();
    const getState = jest.fn();
    getState.mockReturnValueOnce(appState);
    await actions.submitForm()(dispatch, getState, undefined);
    expect(fetchMock.mock.calls.length).toEqual(3);
  });

  it('dispatches error events when fetch returns non-200', async () => {
    fetchMock.mockResponses(
      [JSON.stringify({ error: 'not found' }), { status: 404 }],
      [JSON.stringify({ error: 'not found' }), { status: 404 }],
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
      status: 'Max Retries Exceeded. Last Status: Not Found',
      type: constants.SUBMIT_APPLICATION_ERROR,
    });
  });
});

describe('validateEmail', () => {
  it('should add validation filed to newValue when email is not valid', () => {
    expect(
      validateEmail({
        dirty: true,
        value: 'bademail(at)example.com',
      }),
    ).toEqual(expect.objectContaining({ validation: 'Must be a valid email address.' }));
  });

  it('should not add validation if the email is valid', () => {
    expect(
      validateEmail({
        dirty: true,
        value: 'goodemail@example.com',
      }),
    ).toEqual(
      expect.not.objectContaining({
        validation: 'Must be a valid email address.',
      }),
    );
  });
});

describe('updateApplicationEmail', () => {
  it('should return the newValue for input', () => {
    const newValue = {
      dirty: true,
      value: 'goodemail@example.com',
    };
    expect(actions.updateApplicationEmail(newValue)).toEqual({
      newValue,
      type: constants.UPDATE_APPLICATION_EMAIL,
    });
  });

  it('should return the newValue for input with validation when email not correct', () => {
    const newValue = {
      dirty: true,
      value: 'bademail(at)example.com',
    };
    expect(actions.updateApplicationEmail(newValue)).toEqual({
      newValue: {
        ...newValue,
        validation: 'Must be a valid email address.',
      },
      type: constants.UPDATE_APPLICATION_EMAIL,
    });
  });
});

describe('validateOAuthRedirectURI', () => {
  it('should accept localhost urls with ports', () => {
    const validatedInput = validateOAuthRedirectURI({
      dirty: true,
      value: 'http://localhost:8080/',
    });
    expect(validatedInput).not.toEqual(expect.objectContaining({ validation: expect.anything() }));
  });

  it('should reject URLs with query strings', () => {
    const validatedInput = validateOAuthRedirectURI({
      dirty: true,
      value: 'https://example.com?a=b',
    });
    expect(validatedInput).toEqual(expect.objectContaining({ validation: expect.any(String) }));
  });

  it('should reject URLs with fragments', () => {
    const validatedInput = validateOAuthRedirectURI({
      dirty: true,
      value: 'https://example.com/#frag',
    });
    expect(validatedInput).toEqual(expect.objectContaining({ validation: expect.any(String) }));
  });
});

describe('updateApplicationOAuthRedirectURI', () => {
  it('should enforce validation', () => {
    const updateAction: actions.IUpdateApplicationOAuthRedirectURI = actions.updateApplicationOAuthRedirectURI(
      { dirty: true, value: 'ftp://host:21' },
    );
    expect(updateAction.newValue).toEqual(
      expect.objectContaining({ dirty: true, validation: expect.any(String) }),
    );
  });
});
