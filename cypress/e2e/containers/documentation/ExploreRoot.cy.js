/// <reference types="cypress" />

describe('Explore Root', () => {
  beforeEach(() => {
    cy.intercept('GET', '/platform-backend/v0/providers/transformations/legacy.json*', {
      fixture: 'legacy.json',
    }).as('LPB datastore');

    cy.visit('/explore');
  });

  it('has core page elements', () => {
    cy.get('[data-cy="page-header"]').should('have.text', 'Explore our APIs');
    cy.get('[data-cy="explore-filters"]').should('be.visible');
    cy.get('[data-cy="api-list"]').should('be.visible');
  });

  describe('HAPPY PATH', () => {
    it('navigates to first api page', () => {
      cy.get('[data-cy="api-list"] a').first().click();
      cy.url().should('include', '/explore/api/');
      cy.get('[data-cy="page-header"]').contains('API');
    });
  });
});
