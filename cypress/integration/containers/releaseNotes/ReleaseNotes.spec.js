/// <reference types="cypress" />

describe('Release notes tests', () => {
  beforeEach(() => {
    cy.visit('/release-notes/benefits');
  });

  it('Check all Benefits sections receive focus from sidebar links', () => {
    ['claims', 'benefits', 'benefits-reference_data'].forEach(hash => {
      cy.get('nav a[href="/release-notes/benefits#' + hash).click();
      cy.focused().should('have.id', hash);
    });
  });

  it('Check all news sections receive focus from card links', () => {
    ['claims', 'benefits', 'benefits-reference_data'].forEach(hash => {
      cy.get('.card-content a[href="/release-notes/benefits#' + hash).click();
      cy.focused().should('have.id', hash);
    });
  });
});
