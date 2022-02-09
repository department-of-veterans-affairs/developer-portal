/// <reference types="cypress" />

import 'cypress-axe';

const testPaths = [
  '/',
  '/terms-of-service',
  '/explore',
  '/explore/authorization',
  '/explore/authorization/docs/authorization-code',
  '/explore/benefits',
  '/explore/health/docs/quickstart',
  // Swagger page handled individually below
  // '/explore/benefits/docs/claims',
  '/release-notes/benefits',
  '/api-publishing',
  '/api-publishing/process',
  '/onboarding',
  '/onboarding/request-sandbox-access',
  '/onboarding/production-access-application',
  '/about/news',
];

describe('Accessibility tests', () => {
  beforeEach(() => {
    cy.intercept('GET', '/platform-backend/v0/providers/transformations/legacy.json*', {
      fixture: 'legacy.json',
    }).as('LPB datastore');
    cy.intercept('GET', '/internal/docs/benefits-claims/metadata.json', {
      fixture: 'claims-metadata.json',
    }).as('Claims Metadata');
    cy.intercept('GET', '/internal/docs/benefits-claims/v1/openapi.json', {
      fixture: 'claims-openapi.json',
    }).as('Claims OpenAPI');
  });

  it('Regular page types have no axe violations.', () => {
    testPaths.forEach(path => {
      cy.visit(path);
      cy.injectAxe();
      cy.checkA11y();
    });
  });

  it('Swagger page has no axe violations', () => {
    cy.visit('/explore/benefits/docs/claims');
    cy.injectAxe();
    cy.wait(5000); // Gives Swagger UI plenty of time to load
    cy.checkA11y();
  });
});
