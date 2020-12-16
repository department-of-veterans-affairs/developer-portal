import * as Sentry from '@sentry/browser';
import 'jest';
// import { AssertionsResult } from 'jest-axe';
import {  MockedRequest, rest, restContext  } from 'msw';
import { MockedResponse, ResponseComposition } from 'msw/lib/types/response';
import { setupServer } from 'msw/node';
// import { waitFor } from '@testing-library/react';
import { makeRequest, ResponseType } from './makeRequest';

interface ExpectedResponse {
  testObject: {
    test: number;
  };
}

const requestUri = '/test';
const errorUrl = 'http://fake.va.gov/internal/developer-portal/public/error-endpoint';

const headerDataError = { _bodyInit: 'json for you',
  _bodyText: 'json for you',
  bodyUsed: true,
  credentials: 'omit',
  headers: { map: { accept: 'application/json', 'content-type': 'application/json', 'x-request-id': '123' } },
  method: 'POST',
  mode: null,
  referrer: null,
  url: errorUrl };

/*
 * jest.mock('@sentry/browser');
 * const mockedSentry = Sentry as jest.Mocked<typeof Sentry>;
 */

/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore: need to mock fetch on global
const spyFetch = jest.spyOn(global, 'fetch');
/* eslint-enable @typescript-eslint/ban-ts-comment */

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
        (req: MockedRequest, res: ResponseComposition, context: typeof restContext) =>
          res(context.status(200), context.json({ test: 'json' })),
      ),
    );
    const JSONinit = {
      body: 'json for you',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
      },
      method: 'POST',
    };
    const testResponse = await makeRequest<ExpectedResponse>(requestUri, JSONinit);

    expect(testResponse.body).toEqual({ test: 'json' });
  });

  it('checks for text response', async () => {
    server.use(
      rest.post(
        requestUri,
        (req: MockedRequest, res: ResponseComposition, context: typeof restContext) =>
          res(context.status(200), context.text('you got mail')),
      ),
    );

    const textRequestInit = {
      headers: {
        accept: 'text/plain',
        'content-type': 'text/plain',
      },
      method: 'POST',
    };

    const testResponse = await makeRequest<string>(
      requestUri,
      textRequestInit,
      { responseType: ResponseType.TEXT },
    );

    expect(testResponse.body).toEqual('you got mail');
  });

  it('checks for blob response', async () => {
    const blob = new Blob([JSON.stringify({ test: { foo: 'hey' } }, null, 2)], { type: 'application/json' });
    server.use(
      rest.post(
        requestUri,
        (req: MockedRequest, res: ResponseComposition, context: typeof restContext) =>
          res(context.status(200), context.json(blob)),
      ),
    );
    const blobRequestInit = {
      headers: {
        accept: 'application/octet-stream',
        'content-type': 'application/octet-stream',
      },
      method: 'POST',
    };

    const testResponse = await makeRequest<Blob>(
      requestUri,
      blobRequestInit,
      { responseType: ResponseType.BLOB },
    );
    expect(testResponse.body).toEqual(blob);
  });

  it('checks the throw is handled correctly', async () => {
    server.use(
      rest.post(
        errorUrl,
        (
          req: MockedRequest,
          res: ResponseComposition,
          context: typeof restContext,
        ): MockedResponse => res(context.text('error')),
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
      errorUrl,
      init,
      { responseType: ResponseType.TEXT },
    ).catch(e => expect(e).toMatch('error'));
  });

  it('checks handling of 500 error', async () => {
    const captureException = jest.spyOn(Sentry, 'captureException');

    // const SentryMockScope = { setTag: jest.fn() };
    const withScope = jest.spyOn(Sentry, 'withScope');

    const testErrorMessage = 'THIS IS A TEST FAILURE';

    server.use(
      rest.post(
        errorUrl,
        (
          req: MockedRequest,
          res: ResponseComposition,
          context: typeof restContext,
        ): MockedResponse => res(context.status(500), context.json({ message: testErrorMessage })),
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

    await makeRequest<ExpectedResponse>(errorUrl, init).catch(error => {
      // console.log(error);
      expect(spyFetch).toHaveBeenCalledWith(headerDataError);
      expect(withScope).toHaveBeenCalled();
      expect(Sentry.captureException).toHaveBeenCalledWith('Server Error: 500');
      expect(error).toEqual({ 'body': { 'message': 'THIS IS A TEST FAILURE' }, 'ok': false, 'status': 500 });
    });

    captureException.mockRestore();
    withScope.mockRestore();
  });

  it('checks handling of 400 error', async () => {
    const captureException = jest.spyOn(Sentry, 'captureException');

    // const SentryMockScope = { setTag: jest.fn() };
    const withScope = jest.spyOn(Sentry, 'withScope');

    const testErrorMessage = 'THIS IS A TEST FAILURE';

    server.use(
      rest.post(
        errorUrl,
        (
          req: MockedRequest,
          res: ResponseComposition,
          context: typeof restContext,
        ): MockedResponse => res(context.status(400), context.json({ message: testErrorMessage })),
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

    await makeRequest<ExpectedResponse>(errorUrl, init).catch(error => {
      expect(spyFetch).toHaveBeenCalledWith(headerDataError);
      expect(withScope).toHaveBeenCalled();
      //   expect(Sentry.captureException).toHaveBeenCalledWith('Route not found: 400');
      expect(error).toEqual({ 'body': { 'message': 'THIS IS A TEST FAILURE' }, 'ok': false, 'status': 400 });
    });

    captureException.mockRestore();
    withScope.mockRestore();
  });

  it('checks handling of 404 error', async () => {
    const captureException = jest.spyOn(Sentry, 'captureException');

    // const SentryMockScope = { setTag: jest.fn() };
    const withScope = jest.spyOn(Sentry, 'withScope');

    const testErrorMessage = 'THIS IS A TEST FAILURE';

    server.use(
      rest.post(
        errorUrl,
        (
          req: MockedRequest,
          res: ResponseComposition,
          context: typeof restContext,
        ): MockedResponse => res(context.status(404), context.json({ message: testErrorMessage })),
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

    await makeRequest<ExpectedResponse>(errorUrl, init).catch(error => {
      // console.log(error);
      expect(spyFetch).toHaveBeenCalledWith(headerDataError);
      expect(withScope).toHaveBeenCalled();
      expect(Sentry.captureException).toHaveBeenCalledWith('Route not found: 404');
      expect(error).toEqual({ 'body': { 'message': 'THIS IS A TEST FAILURE' }, 'ok': false, 'status': 404 });
    });

    captureException.mockRestore();
    withScope.mockRestore();
  });
});
