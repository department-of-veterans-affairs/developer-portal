import * as axe from 'axe-core';
import { toHaveNoViolations } from 'jest-axe';
import { Request } from 'puppeteer';

import { mockSwagger as mocks } from './mockSwagger.js';

// Paths to test in visual regression and accessibility tests
export const testPaths = [
    '/',
    '/apply',
    '/terms-of-service',
    '/go-live',
    '/oauth',
    '/explore',
    '/explore/benefits/docs/benefits', // Only include a few swagger pages since they're all pretty similar
    '/explore/benefits/docs/appeals',
];

export const puppeteerHost = 'http://localhost:4444'

declare global {
    interface Window { // tslint:disable-line
        axe: typeof axe;
    }
}

jest.setTimeout(100000);

expect.extend(toHaveNoViolations);

export const axeCheck = () => {
    return new Promise(resolve => {
        window.axe.run(
            { exclude: [['iframe']]},
            (err, results) => {
                if (err) {
                    throw err;
                }
                resolve(results);
            });
    });
}

export const mockSwagger = (req : Request) => {
    if (req.url() in mocks) {
        req.respond({
            body: JSON.stringify(mocks[req.url()]),
            contentType: 'application/json',
            headers: {"Access-Control-Allow-Origin": "*"},
        });
    } else {
        req.continue();
    }
};
