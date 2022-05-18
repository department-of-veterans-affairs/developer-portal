/// <reference types="cypress" />

const badUrls = [
  '/api-publishing/invalid',
  '/explore/invalid',
  '/explore/invalid/docs',
  '/explore/invalid/docs/quickstart',
  '/onboarding/invalid',
  '/release-notes/invalid',
  '/support/invalid',
];

describe('Routes Wildcard handling', () => {
  badUrls.forEach(item => {
    it(`Should show the 404 page on ${item}`, () => {
      cy.visit(item);
      cy.get('h1').should('have.text', 'Page not found.');
    });
  });
});
