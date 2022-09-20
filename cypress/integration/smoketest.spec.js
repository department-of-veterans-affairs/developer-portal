/// <reference types="cypress" />

describe('Sandbox Signup Form', () => {
  it('Test form fillout and submission', () => {
    cy.visit('https://dev-developer.va.gov/onboarding/request-sandbox-access');
    cy.get('#firstNameFormField').type('Smoke');
    cy.get('#lastNameFormField').type('Tester');
    cy.get('#emailFormField').type('smoketester@va.gov');
    cy.get('#organizationFormField').type('DSVA');

    cy.get('#main form input[type="checkbox"]').each(async element => {
      await element.trigger('click');
    });

    cy.get('#internalApiInfoprogramNameFormField').type('Lighthouse Smoke Test Program');
    cy.get('#internalApiInfosponsorEmailFormField').type('smoketester.sponsor@va.gov');
    cy.get('#oAuthApplicationTypeFormFieldweb').click();
    cy.get('#oAuthRedirectURIFormField').type('https://developer.va.gov/oauth');
    cy.get('#oAuthPublicKeyFormField').type(
      '{"kid": null,"kty": "RSA","e": "AQAB","use": null,"n": "2Fb4_D4-RSjvl11txu-0s9bThk8hTo2SJauTRrS9N7piFlpGi6PBql3KzLmEu_T36YMbmTjDRPyybEEBD_XkEDuNdWSQph5Da7atfFM04IW5WH3MGPuvmaH6WpZB4Li5qESTFaMk0677uCDvOLcJmfa8bzunvbtlB4U-1WLjtDBODWiVpLlGEUofNQdX2MvTF9shtm-QqPk7K-a2Z36LrZpgcQBB1U8QtqexdaLrMgaoxmEbSgXGAc-uDkmQx1VOAsREozYZ9f1tASmOKGlxfVyBHcf6dePxq1cewpmrUfRTezky5A4K6v17uBYSpEols4ritWDRDymb7rFlUwxBjqdCjmtV18HiLIrgBNPQ2-5Jlnt-BCJg3lP_UG0r6cMO2DEtTkAkDcy4HzNuMQCrXn5ZL4kSUITrf9Mixny3vFn3aVcSNsCqLUSAfnpfRIz9oUUz5xI-FD9QsJJ1vneC8mfo-1lNaVRLNhn2t9VWY0kqhNNzS2HIktkZGzGv7gsB"}',
      { parseSpecialCharSequences: false },
    );
    cy.get('#descriptionFormField').type('Just testing the form with an automated smoke test.');

    let responseBody = {};
    cy.intercept(
      'POST',
      'https://dev-developer.va.gov/platform-backend/v0/consumers/applications',
      request => {
        request.continue(response => {
          responseBody = response.body;
        });
      },
    ).as('postSandboxForm');
    cy.get('#main button[type="submit"]').click();
    cy.wait('@postSandboxForm')
      .then(() => {
        cy.writeFile('./cypress/downloads/sandbox-form-post-response.json', responseBody);
      })
      .then(() => {
        expect(responseBody).to.not.have.property('errors');
        expect(responseBody).to.have.property('ccgClientId');
        expect(responseBody).to.have.property('clientID');
      });
  });
});
