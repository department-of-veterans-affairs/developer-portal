import * as axe from 'axe-core';
import { toHaveNoViolations } from 'jest-axe';
import { Request } from 'puppeteer';
import legacyJson from '../cypress/fixtures/legacy.json';
import metadataJson from '../cypress/fixtures/benefits-claims-metadata.json';
import openapiJson from '../cypress/fixtures/benefits-claims-openapi.json';
import { mockMetadata } from './__mocks__/mockMetadata';
import { mockSwagger } from './__mocks__/mockSwagger';
import {
  CONSUMER_PROD_PATH,
  CONSUMER_DEMO_PATH,
  CONSUMER_PATH,
  CONSUMER_SANDBOX_PATH,
  PUBLISHING_ONBOARDING_PATH,
  PUBLISHING_PATH,
  CONSUMER_APIS_PATH,
  ABOUT_OVERVIEW_PATH,
  ABOUT_NEWS_PATH,
} from './types/constants/paths';

// Paths to test in visual regression and accessibility tests
export const testPaths = [
  '/',
  '/terms-of-service',
  '/explore',
  '/explore/authorization',
  '/explore/authorization/docs/authorization-code',
  '/explore/authorization/docs/client-credentials',
  '/explore/health',
  '/explore/benefits',
  '/explore/health/docs/quickstart',
  '/explore/benefits/docs/claims', // Just need one expanded Swagger for visual testing
  '/release-notes',
  '/support',
  '/support/faq',
  '/support/contact-us',
  PUBLISHING_PATH,
  PUBLISHING_ONBOARDING_PATH,
  CONSUMER_PATH,
  CONSUMER_APIS_PATH,
  CONSUMER_SANDBOX_PATH,
  CONSUMER_PROD_PATH,
  CONSUMER_DEMO_PATH,
  ABOUT_OVERVIEW_PATH,
  ABOUT_NEWS_PATH,
];

export const metadataTestPaths = [''];

export const puppeteerHost = process.env.TEST_HOST ?? 'http://localhost:4444';

jest.setTimeout(100000);

expect.extend(toHaveNoViolations);

export const axeCheck = (): Promise<axe.AxeResults> =>
  new Promise(resolve => {
    window.axe.run({ exclude: [['iframe']] }, (err, results) => {
      /* eslint-disable @typescript-eslint/no-unnecessary-condition
      -- aXe typing marks err param as always present */
      if (err) {
        throw err;
      }
      /* eslint-enable @typescript-eslint/no-unnecessary-condition */
      resolve(results);
    });
  });

export const mockRequest = (req: Request): void => {
  const response = {
    body: '',
    contentType: 'application/json',
    headers: { 'Access-Control-Allow-Origin': 'http://localhost:3001' },
  };

  if (req.url().includes('/platform-backend/v0/providers/transformations/legacy.json')) {
    response.body = JSON.stringify(legacyJson);
  } else if (req.url().includes('openapi.json')) {
    response.body = JSON.stringify(openapiJson);
  } else if (req.url().includes('metadata.json')) {
    response.body = JSON.stringify(metadataJson);
  } else if (req.url() in mockSwagger) {
    response.body = JSON.stringify(mockSwagger[req.url()]);
  } else if (req.url() in mockMetadata) {
    response.body = JSON.stringify(mockMetadata[req.url()]);
  }

  if (response.body) {
    void req.respond(response);
  } else {
    void req.continue();
  }
};
