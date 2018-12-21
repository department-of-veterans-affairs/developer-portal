// tslint:disable:no-console
import * as axe from 'axe-core';
import { toHaveNoViolations } from 'jest-axe';
import { Request } from 'puppeteer';

import { mockSwagger as mocks } from './mockSwagger.js';


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
        console.log(`mocking request to ${req.url()}`);
        console.log(`mocked response: ${JSON.stringify(mocks[req.url()])}`);
        req.respond({
            body: JSON.stringify(mocks[req.url()]),
            contentType: 'application/json',
            headers: {"Access-Control-Allow-Origin": "*"},
        });
    } else {
        req.continue();
    }
};
