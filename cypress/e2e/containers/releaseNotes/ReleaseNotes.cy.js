/// <reference types="cypress" />

const releaseNotesSections = ['claims', 'benefits', 'benefits-reference_data'];

describe('Release notes tests', () => {
  beforeEach(() => {
    cy.intercept('GET', '/platform-backend/v0/providers/transformations/legacy.json*', {
      fixture: 'legacy.json',
    }).as('LPB datastore');

    cy.visit('/release-notes/benefits');
  });

  it('Check all Benefits sections receive focus from sidebar links', () => {
    releaseNotesSections.forEach(hash => {
      cy.get('nav a[href="/release-notes/benefits#' + hash).click();
      cy.focused().should('have.id', hash);
    });
  });

  it('Check all Benefits sections receive focus from card links', () => {
    releaseNotesSections.forEach(hash => {
      cy.get('.card-content a[href="/release-notes/benefits#' + hash).click();
      cy.focused().should('have.id', hash);
    });
  });
});
