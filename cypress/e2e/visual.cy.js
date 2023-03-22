/// <reference types="cypress" />

import * as path from 'path';

const viewports = [
  { count: 1, height: 800, width: 1200 },
  { count: 2, height: 800, width: 768 },
  { count: 3, height: 800, width: 375 },
];

const testPaths = [
  '/',
  '/terms-of-service',
  '/explore',
  '/explore/authorization',
  '/explore/authorization/docs/authorization-code',
  '/explore/benefits',
  '/explore/health/docs/quickstart',
  // Swagger page handled individually below
  // '/explore/vaForms/docs/vaForms',
  '/release-notes/benefits',
  '/api-publishing',
  '/api-publishing/process',
  '/onboarding',
  '/onboarding/request-sandbox-access',
  '/onboarding/production-access-application',
  '/about/news',
];

const imageSnapshotsDir = path.resolve(__dirname, '../../test/image_snapshots');
const snapshotOptions = {
  capture: 'fullPage',
  customSnapshotsDir: imageSnapshotsDir,
  failureThreshold: 0.01,
  failureThresholdType: 'percent',
};

function testVisualRegressions(path, size) {
  cy.wait(1000);
  cy.get('html').invoke('css', 'height', 'initial');
  cy.get('body').invoke('css', 'height', 'initial');
  cy.wait(1000);
  const strippedUrlPath = path.replace(/\//g, '-').substring(1);
  const formattedPath = strippedUrlPath ? strippedUrlPath : 'homepage';
  cy.get('#main');
  cy.get('html').invoke('css', 'height', 'initial');
  cy.get('body').invoke('css', 'height', 'initial');
  cy.wait(1000);
  cy.matchImageSnapshot(`${formattedPath}-${size.count}`, snapshotOptions);
}

describe('Visual Regression tests', () => {
  beforeEach(() => {
    cy.intercept('GET', '/platform-backend/v0/providers/transformations/legacy.json*', {
      fixture: 'legacy.json',
    }).as('LPB datastore');
    cy.intercept('GET', '/internal/docs/forms/metadata.json', {
      fixture: 'vaForms-metadata.json',
    }).as('VA Forms Metadata');
    cy.intercept('GET', '/internal/docs/forms/v0/openapi.json', {
      fixture: 'vaForms-openapi.json',
    }).as('VA Forms OpenAPI');
  });

  viewports.forEach(size => {
    it(`Check regular page types for visual regressions at ${size.width}px width.`, () => {
      testPaths.forEach(path => {
        cy.viewport(size.width, size.height);
        cy.visit(path);
        testVisualRegressions(path, size);
      });
    });

    it(`Check Swagger page has no visual regressions at ${size.width}px width.`, () => {
      const path = '/explore/vaForms/docs/vaForms';
      cy.viewport(size.width, size.height);
      cy.visit(path);
      cy.wait(5000); // Gives Swagger UI plenty of time to load
      testVisualRegressions(path, size);
    });
  });
});
