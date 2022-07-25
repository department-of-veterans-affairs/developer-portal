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

  it('Remove focus from section on top of page api change', () => {
    cy.get(
      '#on-this-page + ul a[href="/explore/authorization/docs/authorization-code?api=claims#requesting-authorization',
    ).click();
    cy.get('.api-selector-container.theme-light select').first().select('clinical_health');
    cy.get('.api-selector-container.theme-light button').first().click();
    expect(cy.location().hash).to.not.equal('requesting-authorization');
  });

  it('Remove focus from section on code sample api change', () => {
    cy.get(
      '#on-this-page + ul a[href="/explore/authorization/docs/authorization-code?api=claims#requesting-authorization',
    ).click();
    cy.get('.api-selector-container.theme-dark select').first().select('clinical_health');
    cy.get('.api-selector-container.theme-dark button').first().click();
    expect(cy.location().hash).to.not.equal('requesting-authorization');
  });
});

// getting-started
// Getting Started
// building-oidc-apps
// Building OpenID Connect Applications
// authorization-code-flow
// Initiating the Authorization Code Flow
// requesting-authorization
// Requesting Authorization
// requesting-a-token
// Requesting a Token with an Authorization Code Grant
// manage-account
// Manage Account
// revoking-tokens
// Revoking Tokens
// revoking-grants
// Revoking Grants
// pkce-authorization
// PKCE (Proof Key for Code Exchange) Authorization
// pkce-requesting-authorization
// Requesting Authorization
// pkce-requesting-a-token
// Requesting a Token with an Authorization Code Grant
// scopes
// Scopes
// id-token
// ID Token
// test-users
// Test Users
// https
// HTTPS
