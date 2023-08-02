/// <reference types="cypress" />
// page-content.spec.js created with Cypress

describe('PageContent tests', () => {
  it("Ensure page doesn't randomly scroll", () => {
    cy.visit('/');
    cy.window().then($window => {
      expect($window.scrollY).to.be.equal(0, 0);
    });
    cy.get('a[href="/explore"]').first().click();
    cy.window().then($window => {
      expect($window.scrollY).to.be.equal(0, 0);
    });
    cy.get('a[href="/about"]').first().click();
    cy.window().then($window => {
      expect($window.scrollY).to.be.equal(0, 0);
    });
    cy.get('a[href="/about/news"]').first().click();
    cy.window().then($window => {
      expect($window.scrollY).to.be.equal(0, 0);
    });
    cy.get('a[href="/about/news#News-releases"]').first().click();
    cy.window().then($window => {
      expect($window.scrollY).to.be.closeTo(863, 50);
    });
  });
});
