/// <reference types="cypress" />

const testPaths = [
  '/',
  '/terms-of-service',
  '/explore',
  '/explore/authorization',
  '/explore/authorization/docs/authorization-code',
  '/explore/benefits',
  '/explore/health/docs/quickstart',
  '/explore/benefits/docs/claims', // Just need one expanded Swagger for visual testing
  '/release-notes/benefits',
  '/api-publishing',
  '/api-publishing/process',
  '/onboarding',
  '/onboarding/request-sandbox-access',
  '/onboarding/production-access-application',
  '/about/news',
];

describe('App wide tests', () => {
  it('Skip navigation should receive focus on first tab after homepage load', () => {
    cy.visit('/');
    cy.get('body').tab();
    cy.focused().realHover().should('contain.text', 'Skip to main content').click();
    cy.focused().should('have.id', 'main');
  });

  it('Sub pages should focus skip nav on tab after load', () => {
    cy.visit('/explore');
    cy.get('body').tab();
    cy.focused().realHover().should('contain.text', 'Skip to main content').click();
    cy.focused().should('have.id', 'main');
    cy.get('#main').realPress('Tab');
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
