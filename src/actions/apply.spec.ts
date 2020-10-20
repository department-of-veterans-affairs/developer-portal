import * as Sentry from '@sentry/browser';
import 'jest';
import { MockedRequest, rest, restContext } from 'msw';
import { MockedResponse, ResponseComposition } from 'msw/lib/types/response';
import { setupServer } from 'msw/node';
import { ErrorableInput, RootState } from 'src/types';
import * as constants from '../types/constants';
import * as validators from '../utils/validators';
import * as actions from './apply';

jest.mock('@sentry/browser');
const mockedSentry = Sentry as jest.Mocked<typeof Sentry>;

const server = setupServer(
  rest.post(
    constants.APPLY_URL,
    (req: MockedRequest, res: ResponseComposition, context: typeof restContext) =>
      res(
        context.status(200),
        context.json({
          clientID: 'testid',
          clientSecret: 'test_secret',
          token: 'testtoken',
        }),
      ),
  ),
);

const defaultInput = (value: string): ErrorableInput => ({
  dirty: false,
  value,
});

const appState: Pick<RootState, 'application'> = {
  application: {
    inputs: {
      apis: {
        appeals: false,
        benefits: true,
        claims: false,
        communityCare: false,
        confirmation: false,
        facilities: false,
        health: true,
        vaForms: false,
        verification: false,
      },
      description: defaultInput(''),
      email: defaultInput('james@hotmail.co'),
      firstName: defaultInput('James'),
      lastName: defaultInput('Rodríguez'),
      oAuthApplicationType: defaultInput('web'),
      oAuthRedirectURI: defaultInput('http://localhost:8080/oauth/cb'),
      organization: defaultInput('Fußball-Club Bayern München'),
      termsOfService: true,
    },
    sending: false,
  },
};

describe('submitForm', () => {
  beforeAll(() => server.listen());
  beforeEach(() => {
    server.resetHandlers();
    mockedSentry.withScope.mockClear();
  });
  afterAll(() => server.close());

  it('dispatches correct events when fetch has a 200 response', async () => {
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
    server.use(
      rest.post(
        constants.APPLY_URL,
        (
          req: MockedRequest,
          res: ResponseComposition,
          context: typeof restContext,
        ): MockedResponse => res(context.status(500, 'KABOOM')),
      ),
    );

    const dispatch = jest.fn();
    const getState = jest.fn();
    getState.mockReturnValueOnce(appState);
    await actions.submitForm()(dispatch, getState, undefined);
    expect(dispatch).toBeCalledWith({
      type: constants.SUBMIT_APPLICATION_BEGIN,
    });
    expect(dispatch).toBeCalledWith({
      status: 'KABOOM',
      type: constants.SUBMIT_APPLICATION_ERROR,
    });
  });

  it('dispatches error events when fetch returns validation errors with status 400', async () => {
    server.use(
      rest.post(
        constants.APPLY_URL,
        (req: MockedRequest, res: ResponseComposition, context: typeof restContext) =>
          res(context.status(400), context.json({ errors: ['email must be valid email'] })),
      ),
    );

    const dispatch = jest.fn();
    const getState = jest.fn();
    getState.mockReturnValueOnce(appState);
    await actions.submitForm()(dispatch, getState, undefined);
    const sentryCallback = mockedSentry.withScope.mock.calls[0][0];
    const scope: any = {
      setLevel: jest.fn(),
    };
    sentryCallback(scope);
    expect(dispatch).toBeCalledWith({
      type: constants.SUBMIT_APPLICATION_BEGIN,
    });
    expect(mockedSentry.captureException).toBeCalledWith(
      Error('Developer Application validation errors: email must be valid email'),
    );
    expect(dispatch).toBeCalledWith({
      status: 'Developer Application validation errors: email must be valid email',
      type: constants.SUBMIT_APPLICATION_ERROR,
    });
  });

  it('dispatches error events when fetch returns non-200 and non-400', async () => {
    server.use(
      rest.post(
        constants.APPLY_URL,
        (req: MockedRequest, res: ResponseComposition, context: typeof restContext) =>
          res(
            context.status(404, 'bad bad not good'),
            context.json({ error: 'sorry, who are you?' }),
          ),
      ),
    );

    const dispatch = jest.fn();
    const getState = jest.fn();
    getState.mockReturnValueOnce(appState);
    await actions.submitForm()(dispatch, getState, undefined);
    const sentryCallback = mockedSentry.withScope.mock.calls[0][0];
    const scope: any = { setLevel: jest.fn() };
    sentryCallback(scope);
    expect(dispatch).toBeCalledWith({
      type: constants.SUBMIT_APPLICATION_BEGIN,
    });
    expect(mockedSentry.captureException).toBeCalledWith(Error('bad bad not good'));
    expect(dispatch).toBeCalledWith({
      status: 'bad bad not good',
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
        ...newValue,
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

    const mockValidateEmail = jest.spyOn(validators, 'validateEmail').mockReturnValue(newValue);
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
        ...newValue,
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

    const mockValidateURI = jest
      .spyOn(validators, 'validateOAuthRedirectURI')
      .mockReturnValue(newValue);
    actions.updateApplicationOAuthRedirectURI(newValue);
    expect(mockValidateURI.mock.calls.length).toBe(0);

    newValue.dirty = true;
    actions.updateApplicationOAuthRedirectURI(newValue);
    expect(mockValidateURI.mock.calls.length).toBe(1);
    mockValidateURI.mockRestore();
  });
});
