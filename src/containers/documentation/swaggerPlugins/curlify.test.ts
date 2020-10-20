import Swagger, { OpenAPISpec, RequestOptions, SwaggerRequest } from 'swagger-client';
import testSpec from '../../../__mocks__/openAPIData/decisionReviews.test.json';
import { curlify } from './curlify';

// helper so these tests are less sensitive to whitespace
const normalizeCurlText = (original: string): string => original.trim().replace(/\s+/g, ' ');

describe('curlify', () => {
  const reqOptions: RequestOptions = {
    operationId: 'fakeOp',
    parameters: {
      'x-va-fake-header': 'my-fake-header',
      'x-va-last-name': 'Fakeman',
    },
    requestBody: {},
    securities: {
      authorized: {
        bearer_token: 'faketoken',
      },
    },
    server: 'https://fake-api.va.gov/services/fake/{version}',
    serverVariables: {
      version: 'v1',
    },
    spec: testSpec as OpenAPISpec,
  };

  const defaultReq: SwaggerRequest = {
    body: {},
    credentials: 'same-origin',
    headers: {
      'x-va-fake-header': 'my-fake-header',
      'x-va-last-name': 'Fakeman',
    },
    method: 'POST',
    url: 'https://fake-api.va.gov/services/fake/v1/fake-op',
  };

  let requestSpy: jest.SpyInstance;
  beforeEach(() => {
    requestSpy = jest.spyOn(Swagger, 'buildRequest').mockReturnValue(defaultReq);
  });

  it('calls Swagger.buildRequest', () => {
    curlify(reqOptions);
    expect(requestSpy).toHaveBeenCalledTimes(1);
  });

  it('constructs the base curl command with the method and URL', () => {
    const curl = curlify(reqOptions);
    expect(curl.startsWith("curl -X POST 'https://fake-api.va.gov/services/fake/v1/fake-op'")).toBe(
      true,
    );
  });

  describe('headers', () => {
    it('inserts headers in the curl command', () => {
      let expectedCurl = `curl -X POST 'https://fake-api.va.gov/services/fake/v1/fake-op' \\
--header 'x-va-fake-header: my-fake-header' \\
--header 'x-va-last-name: Fakeman'`;
      expectedCurl = normalizeCurlText(expectedCurl);

      let curl = curlify(reqOptions);
      curl = normalizeCurlText(curl);

      expect(curl.startsWith(expectedCurl)).toBe(true);
    });
  });

  describe('request body', () => {
    it('does not attempt to add a body for a non-POST method', () => {
      const methods = ['GET', 'DELETE', 'PUT'];
      methods.forEach((method: string) => {
        requestSpy.mockReturnValue({
          ...defaultReq,
          method,
        });

        const curl = curlify(reqOptions);
        expect(curl).not.toMatch('--data-raw');
      });
    });

    it('includes the empty request body if no properties have been specified', () => {
      const curl = curlify(reqOptions);
      expect(curl.endsWith("--data-raw '{}'")).toBe(true);
    });

    it('populates request body properties', () => {
      const testBody = {
        format: 'flat',
        ids: [1, 22, 333],
      };

      requestSpy.mockReturnValue({
        ...defaultReq,
        body: testBody,
      });

      const expectedData = `--data-raw '${JSON.stringify(testBody, null, 2)}'`;
      const curl = curlify(reqOptions);
      expect(curl.endsWith(expectedData)).toBe(true);
    });
  });
});
