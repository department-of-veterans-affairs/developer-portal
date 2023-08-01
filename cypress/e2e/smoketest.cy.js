/// <reference types="cypress" />

const apis = require('../../requiredApiSignups');

describe('Apikey Sandbox Signup Form', () => {
  apis.apikey.forEach(api => {
    it(`Test ${api.name}`, () => {
      cy.wait(5000);
      cy.visit(`https://dev-developer.va.gov/explore/api/${api.urlSlug}/sandbox-access`);
      cy.get('#firstNameFormField').type('Smoke');
      cy.get('#lastNameFormField').type('Tester');
      cy.get('#emailFormField').type('smoketester@va.gov');

      cy.get('#main form input[type="checkbox"]').each(async element => {
        await element.trigger('click');
      });

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
      const outputFile = `./cypress/downloads/sandbox-${api.altID}-apikey-response.json`;
      cy.get('#main button[type="submit"]').click();
      cy.wait('@postSandboxForm')
        .then(() => {
          cy.writeFile(outputFile, responseBody);
        })
        .then(() => {
          expect(responseBody).to.not.have.property('errors');
          cy.readFile(outputFile).its('apis').should('eq', api.altID);
          cy.readFile(outputFile).its('clientID').should('eq', null);
          cy.readFile(outputFile).its('clientSecret').should('eq', null);
          cy.readFile(outputFile).its('ccgClientId').should('eq', null);
          cy.readFile(outputFile).its('redirectURI').should('eq', null);
          cy.readFile(outputFile).its('email').should('eq', 'smoketester@va.gov');
          cy.readFile(outputFile).its('kongUsername').should('eq', 'Tester');
          cy.readFile(outputFile).its('token').should('be.not.empty');
        });
    });
  });
});
describe('ACG Sandbox Signup Form', () => {
  apis.acg.forEach(api => {
    it(`Test ${api.name}`, () => {
      cy.wait(5000);
      cy.visit(`https://dev-developer.va.gov/explore/api/${api.urlSlug}/sandbox-access`);
      cy.get('#firstNameFormField').type('Smoke');
      cy.get('#lastNameFormField').type('Tester');
      cy.get('#emailFormField').type('smoketester@va.gov');
      if (api.oAuthTypes.length == 2) {
        cy.get(`#typeAndApiFormFieldacg${api.altID}`).click();
      }
      cy.get('#oAuthApplicationTypeFormFieldweb').click();
      cy.get('#oAuthRedirectURIFormField').type('https://developer.va.gov/oauth');

      cy.get('#main form input[type="checkbox"]').each(async element => {
        await element.trigger('click');
      });

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
      const outputFile = `./cypress/downloads/sandbox-${api.altID}-acg-response.json`;
      cy.get('#main button[type="submit"]').click();
      cy.wait('@postSandboxForm')
        .then(() => {
          cy.writeFile(outputFile, responseBody);
        })
        .then(() => {
          expect(responseBody).to.not.have.property('errors');
          cy.readFile(outputFile).its('apis').should('eq', api.altID);
          cy.readFile(outputFile).its('clientID').should('be.not.empty');
          cy.readFile(outputFile).its('clientSecret').should('be.not.empty');
          cy.readFile(outputFile).its('ccgClientId').should('eq', null);
          cy.readFile(outputFile).its('email').should('eq', 'smoketester@va.gov');
          cy.readFile(outputFile).its('kongUsername').should('eq', null);
          cy.readFile(outputFile).its('token').should('eq', null);
          cy.readFile(outputFile).its('redirectURI').should('eq', 'https://developer.va.gov/oauth');
        });
    });
  });
});
describe('CCG Sandbox Signup Form', () => {
  apis.ccg.forEach(api => {
    it(`Test ${api.name}`, () => {
      cy.wait(5000);
      cy.visit(`https://dev-developer.va.gov/explore/api/${api.urlSlug}/sandbox-access`);
      cy.get('#firstNameFormField').type('Smoke');
      cy.get('#lastNameFormField').type('Tester');
      cy.get('#emailFormField').type('smoketester@va.gov');
      if (api.oAuthTypes.length == 2) {
        cy.get(`#typeAndApiFormFieldccg${api.altID}`).click();
      }
      cy.get('#oAuthPublicKeyFormField').type(
        '{"kid": null,"kty": "RSA","e": "AQAB","use": null,"n": "2Fb4_D4-RSjvl11txu-0s9bThk8hTo2SJauTRrS9N7piFlpGi6PBql3KzLmEu_T36YMbmTjDRPyybEEBD_XkEDuNdWSQph5Da7atfFM04IW5WH3MGPuvmaH6WpZB4Li5qESTFaMk0677uCDvOLcJmfa8bzunvbtlB4U-1WLjtDBODWiVpLlGEUofNQdX2MvTF9shtm-QqPk7K-a2Z36LrZpgcQBB1U8QtqexdaLrMgaoxmEbSgXGAc-uDkmQx1VOAsREozYZ9f1tASmOKGlxfVyBHcf6dePxq1cewpmrUfRTezky5A4K6v17uBYSpEols4ritWDRDymb7rFlUwxBjqdCjmtV18HiLIrgBNPQ2-5Jlnt-BCJg3lP_UG0r6cMO2DEtTkAkDcy4HzNuMQCrXn5ZL4kSUITrf9Mixny3vFn3aVcSNsCqLUSAfnpfRIz9oUUz5xI-FD9QsJJ1vneC8mfo-1lNaVRLNhn2t9VWY0kqhNNzS2HIktkZGzGv7gsB"}',
        { parseSpecialCharSequences: false },
      );
      cy.get('#main form input[type="checkbox"]').each(async element => {
        await element.trigger('click');
      });

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
      const outputFile = `./cypress/downloads/sandbox-${api.altID}-ccg-response.json`;
      cy.get('#main button[type="submit"]').click();
      cy.wait('@postSandboxForm')
        .then(() => {
          cy.writeFile(outputFile, responseBody);
        })
        .then(() => {
          expect(responseBody).to.not.have.property('errors');
          cy.readFile(outputFile).its('apis').should('eq', api.altID);
          cy.readFile(outputFile).its('clientID').should('eq', null);
          cy.readFile(outputFile).its('clientSecret').should('eq', null);
          cy.readFile(outputFile).its('ccgClientId').should('not.be.empty');
          cy.readFile(outputFile).its('email').should('eq', 'smoketester@va.gov');
          cy.readFile(outputFile).its('kongUsername').should('eq', null);
          cy.readFile(outputFile).its('token').should('eq', null);
          cy.readFile(outputFile).its('redirectURI').should('eq', null);
        });
    });
  });
});
