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
  '/explore/va-benefits',
  '/explore?auth=acg&q=health',
  '/explore/health?q=health',
  '/explore/health?auth=acg',
  '/explore/health?auth=acg&q=health',
  '/explore/api/claims',
  '/explore/api/claims/docs',
  '/explore/api/claims/authorization-code',
  '/explore/api/claims/client-credentials',
  '/explore/api/claims/release-notes',
  '/explore/api/claims/sandbox-access',
  '/api-publishing',
  '/api-publishing/process',
  '/onboarding',
  '/onboarding/production-access-application',
  '/about',
  '/about/news',
];

const imageSnapshotsDir = path.resolve(__dirname, '../../test/image_snapshots');
const snapshotOptions = {
  capture: 'fullPage',
  customSnapshotsDir: imageSnapshotsDir,
  failureThreshold: 0.01,
  failureThresholdType: 'percent',
};

function testVisualRegressions(path, size, offset) {
  // Don't allow the Touchpoints survey button to clutter visual regressions
  cy.get('#touchpoints-survey')
    .invoke('css', 'visibility', 'hidden')
    .invoke('css', 'pointer-events', 'none');
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
  if (offset) {
    cy.scrollTo(0, offset);
    cy.wait(1000);
    cy.matchImageSnapshot(`${formattedPath}-${size.count}-${offset}`, {
      ...snapshotOptions,
      capture: 'viewport',
    });
    return;
  }
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
      const path = '/explore/api/va-forms/docs';
      cy.viewport(size.width, size.height);
      cy.visit(path);
      cy.wait(5000); // Gives Swagger UI plenty of time to load
      testVisualRegressions(path, size);
    });

    it(`Check Explore APIs page for visual regression at ${size.width}px width and 400px scroll offset `, () => {
      const path = `/explore?auth=acg+ccg`;
      const offset = 400;
      cy.viewport(size.width, size.height);
      cy.visit(path);
      testVisualRegressions(path, size, offset);
    });
  });
});