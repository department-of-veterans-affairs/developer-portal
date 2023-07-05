/// <reference types="cypress" />

import 'cypress-axe';

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
  // '/explore/api/claims/docs',
  '/explore/api/claims/authorization-code',
  '/explore/api/claims/client-credentials',
  '/explore/api/claims/release-notes',
  '/explore/api/claims/sandbox-access',
  '/api-publishing',
  '/api-publishing/process',
  '/onboarding',
  '/onboarding/production-access-application',
  '/about/news',
];

function logAxeViolations(path) {
  // Return the callback that logs the violations
  return violations => {
    cy.task(
      'log',
      `${violations.length} accessibility violation${violations.length === 1 ? '' : 's'} ${
        violations.length === 1 ? 'was' : 'were'
      } detected for ${path}`,
    );
    // pluck specific keys to keep the table readable
    const violationData = violations.map(({ id, impact, description, nodes }) => ({
      id,
      impact,
      description,
      nodes: nodes.length,
    }));

    cy.task('table', violationData);
  };
}

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
    cy.intercept('GET', '/internal/docs/benefits-claims/v1/openapi-sf.json', {
      fixture: 'claims-openapi.json',
    }).as('Claims OpenAPI - Swagger Safe');
  });

  it('Regular page types have no axe violations.', () => {
    testPaths.forEach(path => {
      cy.visit(path);
      cy.injectAxe();
      cy.configureAxe({
        rules: [
          {
            id: 'duplicate-id-aria',
            enabled: false,
          },
          {
            id: 'button-name',
            enabled: false,
          },
        ],
      });
      cy.checkA11y(null, null, logAxeViolations(path));
    });
  });

  it('Swagger page has no axe violations', () => {
    const path = '/explore/api/claims/docs';
    cy.visit(path);
    cy.injectAxe();
    cy.wait(5000); // Gives Swagger UI plenty of time to load
    cy.checkA11y(null, null, logAxeViolations(path));
  });
});
