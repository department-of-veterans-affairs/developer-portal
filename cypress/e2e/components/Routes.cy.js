/// <reference types="cypress" />

const badUrls = ['/api-publishing/invalid', '/onboarding/invalid', '/support/invalid'];

const apiNotFoundUrls = ['/explore/api/invalid', '/explore/api/invalid/docs'];

describe('Routes Wildcard handling', () => {
  beforeEach(() => {
    cy.intercept('GET', '/platform-backend/v0/providers/transformations/legacy.json*', {
      fixture: 'legacy.json',
    }).as('LPB datastore');
  });

  badUrls.forEach(item => {
    it(`Should show the 404 page on ${item}`, () => {
      cy.visit(item);
      cy.get('h1').should('have.text', 'Page not found.');
    });
  });

  apiNotFoundUrls.forEach(item => {
    it(`Should show the 404 page through a thrown error on ${item}`, () => {
      cy.visit(item);
      cy.on('uncaught:exception', (err, runnable) => {
        return false;
      });
      cy.get('h1').should('have.text', 'Page not found.');
    });
  });
});
