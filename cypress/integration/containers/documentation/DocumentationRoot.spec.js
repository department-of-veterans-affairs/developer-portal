/// <reference types="cypress" />

describe('Documentation Root', () => {
  beforeEach(() => {
    cy.intercept('GET', '/platform-backend/v0/providers/transformations/legacy.json*', {
      fixture: 'legacy.json',
    }).as('LPB datastore');
  });

  it('Side nav is sticky on scroll', () => {
    cy.fixture('vaFormsMetaData.spec.json').then(json => {
      cy.intercept('/internal/docs/forms/metadata.json', json);
    });
    cy.fixture('vaFormsOpenAPI.spec.json').then(json => {
      cy.intercept('/internal/docs/forms/v0/openapi.json', json);
    });
    cy.visit('/explore/vaForms/docs/vaForms');
    // This is needed as a waitFor fails because Swagger UI
    // adds the DOM elements before showing them visually.
    cy.get('#operations-tag-Forms').should('be.visible');
    cy.get('.va-api-side-nav').then($el => {
      expect($el[0].offsetTop).to.equal(0);
    });
    cy.scrollTo('bottom');
    cy.get('.va-api-side-nav').then($el => {
      expect($el[0].offsetTop).to.be.greaterThan(0);
    });
  });

  it('Card navigation works in documentation pages', () => {
    cy.visit('/explore');
    cy.get('.va-api-card').eq(5).click();
    cy.focused().should('have.id', 'main');
    cy.get('#page-header').should('have.text', 'Health APIs');
    cy.get('.va-api-card').eq(1).click();
    cy.focused().should('have.id', 'main');
    cy.get('#page-header').should('have.text', 'Community Care Eligibility API');
  });

  it('Auth docs health redirect is in place', () => {
    cy.visit('/explore/health/docs/authorization');
    cy.location('pathname').should('eq', '/explore/authorization');
  });
  it('Auth docs verification redirect is in place', () => {
    cy.visit('/explore/verification/docs/authorization');
    cy.location('pathname').should('eq', '/explore/authorization/docs/authorization-code');
    cy.location('search').should('eq', '?api=veteran_verification');
  });
});
