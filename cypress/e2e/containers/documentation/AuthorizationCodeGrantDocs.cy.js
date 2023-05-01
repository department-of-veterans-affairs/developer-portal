/// <reference types="cypress" />

const tableOfContents = [
  'getting-started',
  'building-oidc-apps',
  'authorization-code-flow',
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

    cy.visit('/explore/authorization/docs/authorization-code?api=claims');
  });

  it('All links in the table of contents move focus as expected', () => {
    tableOfContents.forEach(hash => {
      cy.get(
        '#on-this-page + ul a[href="/explore/authorization/docs/authorization-code?api=claims#' +
          hash,
      ).click();
      cy.focused().should('have.id', hash);
    });
  });
});
