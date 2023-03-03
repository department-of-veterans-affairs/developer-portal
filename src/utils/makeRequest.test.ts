/* eslint-disable max-lines */
import * as Sentry from '@sentry/browser';
import 'jest';
import { MockedRequest, rest, restContext } from 'msw';
import { ResponseComposition, MockedResponse } from 'msw/lib/types/response';
import { setupServer } from 'msw/node';
import { makeRequest, ResponseType } from './makeRequest';

interface ExpectedResponse {
  testObject: {
    test: number;
  };
}

const requestUri = '/internal/developer-portal/public/test';

const requestData = { _bodyInit: 'json for you',
  _bodyText: 'json for you',
  bodyUsed: true,
  credentials: 'same-origin',
  headers: { map: { accept: 'application/json', 'content-type': 'application/json', 'x-request-id': '123' } },
  method: 'POST',
  mode: null,
  referrer: null,
  signal: undefined,
  url: requestUri,
};

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore: need to mock fetch on global
const spyFetch = jest.spyOn(global, 'fetch');
jest.mock('uuid', () => ({
  __esModule: true,
  v4: jest.fn(() => '123'),
}));

const server = setupServer();
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
describe('makeRequest', () => {
  it('checks for json response', async () => {
    server.use(
      rest.post(
        requestUri,
        (req: MockedRequest, res: ResponseComposition, context: typeof restContext): MockedResponse | Promise<MockedResponse> =>
          res(context.status(200), context.json({ test: 'json' })),
      ),
    );
    const init = {
      body: 'json for you',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
      },
      method: 'POST',
    };
    const testResponse = await makeRequest<ExpectedResponse>(requestUri, init);
    expect(testResponse.body).toEqual({ test: 'json' });
  });

  it('checks for text response', async () => {
    server.use(
      rest.post(
        requestUri,
        (req: MockedRequest, res: ResponseComposition, context: typeof restContext): MockedResponse | Promise<MockedResponse> =>
          res(context.status(200), context.text('you got mail')),
      ),
    );

    const init = {
      headers: {
        accept: 'text/plain',
        'content-type': 'text/plain',
      },
      method: 'POST',
    };

    const testResponse = await makeRequest<string>(
      requestUri,
      init,
      { responseType: ResponseType.TEXT },
    );
    expect(testResponse.body).toEqual('you got mail');
  });

  it('checks for blob response', async () => {
    const blob = new Blob([JSON.stringify({ test: { foo: 'hey' } }, null, 2)], { type: 'application/json' });
    server.use(
      rest.post(
        requestUri,
        (req: MockedRequest, res: ResponseComposition, context: typeof restContext): MockedResponse | Promise<MockedResponse> =>
          res(context.status(200), context.json(blob)),
      ),
    );
    const init = {
      headers: {
        accept: 'application/octet-stream',
        'content-type': 'application/octet-stream',
      },
      method: 'POST',
    };

    const testResponse = await makeRequest<Blob>(
      requestUri,
      init,
      { responseType: ResponseType.BLOB },
    );
    expect(testResponse.body).toEqual(blob);
  });

  it('checks for non network error throw to be handled correctly', async () => {
    server.use(
      rest.post(
        requestUri,
        (
          req: MockedRequest,
          res: ResponseComposition,
          context: typeof restContext,
        ): MockedResponse | Promise<MockedResponse> => res(context.text('error')),
      ),
    );

    const init = {
      body: 'json for you',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
      },
      method: 'POST',
    };

    await makeRequest(
      requestUri,
      init,
      { responseType: ResponseType.TEXT },
    ).catch(e => expect(e).toMatch('error'));
  });

  it('checks non network error text', async () => {
    const captureException = jest.spyOn(Sentry, 'captureException');
    const withScope = jest.spyOn(Sentry, 'withScope');

    server.use(
      rest.post(
        requestUri,
        (
          req: MockedRequest,
          res: ResponseComposition,
          context: typeof restContext,
        ): MockedResponse | Promise<MockedResponse> => res(context.status(501), context.text('testErrorMessage')),
      ),
    );

    const init = {
      body: 'json for you',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
      },
      method: 'POST',
    };

    expect.assertions(3);
    await makeRequest<ExpectedResponse>(requestUri, init).catch(() => {
      expect(spyFetch).toHaveBeenCalledWith(requestData);
      expect(withScope).toHaveBeenCalled();
      expect(Sentry.captureException).toHaveBeenCalledWith('Server Error: 501');
    });

    captureException.mockRestore();
    withScope.mockRestore();
  });

  it('checks for total fail', async () => {
    const captureException = jest.spyOn(Sentry, 'captureException');
    const withScope = jest.spyOn(Sentry, 'withScope');
    server.use(
      rest.post(
        requestUri,
        (
          req: MockedRequest,
          res: ResponseComposition,
          context: typeof restContext,
        ): MockedResponse | Promise<MockedResponse> => res(context.status(200), context.text('')),
      ),
    );

    const init = {
      body: 'json for you',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
      },
      method: 'POST',
    };

    expect.assertions(3);
    await makeRequest<ExpectedResponse>(requestUri, init).catch(() => {
      expect(spyFetch).toHaveBeenCalledWith(requestData);
      expect(withScope).toHaveBeenCalled();
      expect(Sentry.captureException).toHaveBeenCalledWith(expect.objectContaining({
        message: 'Unexpected end of JSON input',
      }));
    });

    captureException.mockRestore();
    withScope.mockRestore();
  });

  it('checks handling of 500 error', async () => {
    const captureException = jest.spyOn(Sentry, 'captureException');
    const withScope = jest.spyOn(Sentry, 'withScope');
    const testErrorMessage = 'THIS IS A TEST FAILURE';

    server.use(
      rest.post(
        requestUri,
        (
          req: MockedRequest,
          res: ResponseComposition,
          context: typeof restContext,
        ): MockedResponse | Promise<MockedResponse> => res(context.status(500), context.json({ message: testErrorMessage })),
      ),
    );

    const init = {
      body: 'json for you',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
      },
      method: 'POST',
    };

    expect.assertions(4);
    await makeRequest<ExpectedResponse>(requestUri, init).catch(error => {
      expect(spyFetch).toHaveBeenCalledWith(requestData);
      expect(withScope).toHaveBeenCalled();
      expect(Sentry.captureException).toHaveBeenCalledWith('Server Error: 500');
      expect(error).toEqual({ 'body': { 'message': 'THIS IS A TEST FAILURE' }, 'ok': false, 'status': 500 });
    });

    captureException.mockRestore();
    withScope.mockRestore();
  });

  it('checks handling of 400 error', async () => {
    const captureException = jest.spyOn(Sentry, 'captureException');
    const withScope = jest.spyOn(Sentry, 'withScope');
    const messages = ['Invalid input.', 'Invalid request.'];
    server.use(
      rest.post(
        requestUri,
        (
          req: MockedRequest,
          res: ResponseComposition,
          context: typeof restContext,
        ): MockedResponse | Promise<MockedResponse> => res(context.status(400), context.json({ errors: messages })),
      ),
    );
    const init = {
      body: 'json for you',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
      },
      method: 'POST',
    };

    expect.assertions(4);
    await makeRequest<ExpectedResponse>(requestUri, init).catch(error => {
      expect(spyFetch).toHaveBeenCalledWith(requestData);
      expect(withScope).toHaveBeenCalled();
      expect(Sentry.captureException).toHaveBeenCalledWith('Validation errors: Invalid input., Invalid request.');
      expect(error).toEqual({ 'body': {  'errors': [
        'Invalid input.',
        'Invalid request.',
      ] }, 'ok': false, 'status': 400 });
    });
    captureException.mockRestore();
    withScope.mockRestore();
  });

  it('checks handling of 404 error', async () => {
    const captureException = jest.spyOn(Sentry, 'captureException');

    const withScope = jest.spyOn(Sentry, 'withScope');

    const testErrorMessage = 'THIS IS A TEST FAILURE';

    server.use(
      rest.post(
        requestUri,
        (
          req: MockedRequest,
          res: ResponseComposition,
          context: typeof restContext,
        ): MockedResponse | Promise<MockedResponse> => res(context.status(404), context.json({ message: testErrorMessage })),
      ),
    );

    const init = {
      body: 'json for you',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
      },
      method: 'POST',
    };
    expect.assertions(4);
    await makeRequest<ExpectedResponse>(requestUri, init).catch(error => {
      expect(spyFetch).toHaveBeenCalledWith(requestData);
      expect(withScope).toHaveBeenCalled();
      expect(Sentry.captureException).toHaveBeenCalledWith('Route not found: 404');
      expect(error).toEqual({ 'body': { 'message': 'THIS IS A TEST FAILURE' }, 'ok': false, 'status': 404 });
    });

    captureException.mockRestore();
    withScope.mockRestore();
  });
});
