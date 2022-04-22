/// <reference types="cypress" />

describe('News page', () => {
  beforeEach(() => {
    cy.visit('/about/news');
  });

  describe('side nav links', () => {
    it('Check all news sections receive focus from sidebar links', () => {
      ['News releases', 'Articles', 'Digital media'].forEach(item => {
        let hash = item.replace(' ', '-');
        cy.get('nav a[href="/about/news#' + hash).click();
        cy.focused().should('have.id', hash);
      });
    });
  });

  describe('card links', () => {
    it('Check all news sections receive focus from card links', () => {
      ['News releases', 'Articles', 'Digital media'].forEach(item => {
        let hash = item.replace(' ', '-');
        cy.get('.card-content a[href="/about/news#' + hash).click();
        cy.focused().should('have.id', hash);
      });
    });
  });
});
