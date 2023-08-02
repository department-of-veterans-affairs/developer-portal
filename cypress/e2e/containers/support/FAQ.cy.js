/// <reference types="cypress" />

describe('FAQ page tests', () => {
  beforeEach(() => {
    cy.visit('/support/faq');
  });
  it('Basic page test', () => {
    cy.get('va-accordion-item').should('have.length', '10');
  });
  it('Single expansion/collapse test', () => {
    cy.get('va-accordion-item')
      .shadow()
      .find('h2 button')
      .first()
      .should('have.attr', 'aria-expanded', 'false');
    cy.get('va-accordion-item p').first().should('not.be.visible');
    cy.get('va-accordion-item')
      .shadow()
      .find('h2 button')
      .first()
      .click()
      .should('have.attr', 'aria-expanded', 'true');
    cy.get('va-accordion-item p').first().should('be.visible');
    cy.get('va-accordion-item')
      .shadow()
      .find('h2 button')
      .first()
      .click()
      .should('have.attr', 'aria-expanded', 'false');
    cy.get('va-accordion-item p').first().should('not.be.visible');
  });
  it('Expand/Collapse all test', () => {
    cy.get('#Development-accordions')
      .parent()
      .siblings('va-accordion')
      .shadow()
      .find('button')
      .should('have.text', 'Expand all +')
      .click();
    cy.get('va-accordion-item[open="true"]').should('have.length', '6');
    cy.get('#Development-accordions')
      .parent()
      .siblings('va-accordion')
      .shadow()
      .find('button')
      .should('have.text', 'Collapse all -')
      .click();
    cy.get('va-accordion-item[open="true"]').should('have.length', '0');
  });
});
