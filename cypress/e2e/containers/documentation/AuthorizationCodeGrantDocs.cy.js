/// <reference types="cypress" />

const tableOfContents = [
  'getting-started',
  'building-oidc-apps',
  'authorization-code-grant',
  'requesting-authorization',
  'requesting-a-token',
  'manage-account',
  'revoking-tokens',
  'revoking-grants',
  'pkce-authorization',
  'pkce-requesting-authorization',
  'pkce-requesting-a-token',
  'scopes',
  'id-token',
  'test-users',
  'https',
];

describe('Auth Code Grant Page', () => {
  beforeEach(() => {
    cy.intercept('GET', '/platform-backend/v0/providers/transformations/legacy.json*', {
      fixture: 'legacy.json',
    }).as('LPB datastore');

    cy.visit('/explore/api/claims/authorization-code');
  });

  it('All links in the table of contents move focus as expected', () => {
    tableOfContents.forEach(hash => {
      cy.get('#on-this-page + ul a[href="/explore/api/claims/authorization-code#' + hash).click();
      cy.focused().should('have.id', hash);
    });
  });
});
