/// <reference types="cypress" />

const newsSections = ['News releases', 'Articles', 'Digital media'];

describe('News page', () => {
  beforeEach(() => {
    cy.visit('/about/news');
  });

  newsSections.forEach(item => {
    it(`Check ${item} receives focus from sidebar and card links`, () => {
      let hash = item.replace(' ', '-');
      cy.get('nav a[href="/about/news#' + hash).click();
      cy.focused().should('have.id', hash);
      cy.get('.card-content a[href="/about/news#' + hash).click();
      cy.focused().should('have.id', hash);
    });
  });
});
