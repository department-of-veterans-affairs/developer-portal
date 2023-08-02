/// <reference types="cypress" />

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
  '/about/news',
];

describe('App wide tests', () => {
  beforeEach(() => {
    cy.intercept('GET', '/platform-backend/v0/providers/transformations/legacy.json*', {
      fixture: 'legacy.json',
    }).as('LPB datastore');
  });

  it('Skip navigation should receive focus on first tab after homepage load', () => {
    cy.visit('/');
    cy.get('body').tab();
    cy.focused().realHover().should('contain.text', 'Skip to main content').click();
    cy.focused().should('have.id', 'main');
  });

  it('Sub pages should focus skip nav on tab after load', () => {
    cy.visit('/explore/api/claims');
    cy.get('body').tab();
    cy.focused().realHover().should('contain.text', 'Skip to main content').click();
    cy.focused().should('have.id', 'main');
    // Need lots of tab presses to get past the breadcrumbs
    cy.get('#main').realPress('Tab').realPress('Tab').realPress('Tab').realPress('Tab');
    cy.focused().realHover().should('contain.text', 'Skip Page Navigation').click();
    cy.focused().should('have.id', 'page-header');
  });

  it('All page types should include a link to the TOS', () => {
    testPaths.forEach(item => {
      cy.visit(item);
      cy.get('a[href="/terms-of-service"]').should('exist');
    });
  });
});
