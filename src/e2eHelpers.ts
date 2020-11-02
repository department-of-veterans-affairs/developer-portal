import * as axe from 'axe-core';
import { toHaveNoViolations } from 'jest-axe';
import { Request } from 'puppeteer';

import { mockMetadata as metadataMocks } from './__mocks__/mockMetadata';
import { mockSwagger as mocks } from './__mocks__/mockSwagger';

// Paths to test in visual regression and accessibility tests
export const testPaths = [
  '/',
  '/apply',
  '/terms-of-service',
  '/go-live',
  '/explore',
  '/explore/health',
  '/explore/benefits',
  '/explore/health/docs/authorization',
  '/explore/health/docs/quickstart',
  '/explore/benefits/docs/benefits', // Only include a few swagger pages since they're all pretty similar
  '/explore/benefits/docs/appeals',
  '/release-notes',
  '/news',
  '/support',
  '/support/faq',
  '/support/contact-us',
];

export const metadataTestPaths = [''];

export const puppeteerHost = process.env.TEST_HOST || 'http://localhost:4444';

declare global {
  interface Window {
    axe: typeof axe;
  }
}

jest.setTimeout(100000);

expect.extend(toHaveNoViolations);

export const axeCheck = (): Promise<axe.AxeResults> => new Promise(resolve => {
  window.axe.run({ exclude: [['iframe']] }, (err, results) => {
    if (err) {
      throw err;
    }
    resolve(results);
  });
});

export const mockSwagger = (req: Request) : void => {
  const response = {
    body: '',
    contentType: 'application/json',
    headers: { 'Access-Control-Allow-Origin': '*' },
  };

  if (req.url() in mocks) {
    response.body = JSON.stringify(mocks[req.url()]);
  } else if (req.url() in metadataMocks) {
    response.body = JSON.stringify(metadataMocks[req.url()]);
  }

  if (response.body) {
    void req.respond(response);
  } else {
    void req.continue();
  }
};
