import { render, screen } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router';

import { SandboxAccessSuccess } from './SandboxAccessSuccess';

describe('SandboxAccessSuccess with results', () => {
  describe('with results', () => {
    describe('all apis', () => {
      beforeEach(() => {
        render(
          <MemoryRouter>
            <SandboxAccessSuccess
              result={{
                apis: ['benefits', 'facilities', 'vaForms', 'confirmation'],
                clientID: 'gimli',
                clientSecret: 'sonofgloin',
                email: 'gimli@eredluin.com',
                kongUsername: 'Onering',
                redirectURI: 'http://theshire.com',
                token: 'elf-friend',
              }}
            />
          </MemoryRouter>,
        );
      });

      it('renders successfully', () => {
        expect(screen.getByText('Thank you for signing up!')).toBeInTheDocument();
      });
    });

    describe('standard apis', () => {
      beforeEach(() => {
        render(
          <MemoryRouter>
            <SandboxAccessSuccess
              result={{
                apis: ['benefits', 'facilities', 'vaForms', 'confirmation'],
                clientID: 'gimli',
                clientSecret: 'sonofgloin',
                email: 'gimli@eredluin.com',
                kongUsername: 'Onering',
                redirectURI: 'http://theshire.com',
                token: 'elf-friend',
              }}
            />
          </MemoryRouter>,
        );
      });

      it('displays the API Key generated by the backend', () => {
        expect(screen.getByText('Your VA API key is:')).toBeInTheDocument();
        expect(screen.getByText('elf-friend')).toBeInTheDocument();
      });

      it('displays the provided email address', () => {
        expect(
          screen.getByText(/You should receive an email at gimli@eredluin\.com/m),
        ).toBeInTheDocument();
      });

      it('displays confirmation for only standard APIs', () => {
        expect(
          screen.getByText(
            /Benefits Intake API, VA Facilities API, VA Form API, and Veteran Confirmation API/,
          ),
        ).toBeInTheDocument();

        expect(
          screen.queryByText(
            /Benefits Claims API, Community Care API, VA Health API, and Veteran Verification API/,
          ),
        ).not.toBeInTheDocument();
      });
    });

    describe('oauth acg apis', () => {
      beforeEach(() => {
        render(
          <MemoryRouter>
            <SandboxAccessSuccess
              result={{
                apis: ['claims', 'communityCare', 'health', 'verification'],
                clientID: 'gimli',
                clientSecret: 'sonofgloin',
                email: 'gimli@eredluin.com',
                kongUsername: 'Onering',
                redirectURI: 'http://theshire.com',
                token: 'elf-friend',
              }}
            />
          </MemoryRouter>,
        );
      });

      it('displays the API OAuth Client Id generated by the backend', () => {
        expect(screen.getByText('Your VA API OAuth Client ID:')).toBeInTheDocument();
        expect(screen.getByText('gimli')).toBeInTheDocument();
      });

      it('displays the API OAuth Client Secret generated by the backend', () => {
        expect(screen.getByText('Your VA API OAuth Client Secret:')).toBeInTheDocument();
        expect(screen.getByText('sonofgloin')).toBeInTheDocument();
      });

      it('displays the provided email address', () => {
        expect(
          screen.getByText(/You should receive an email at gimli@eredluin\.com/gm),
        ).toBeInTheDocument();
      });

      it('displays confirmation for only oauth APIs', () => {
        expect(
          screen.queryByText(
            /Benefits Intake API, VA Facilities API, VA Form API, and Veteran Confirmation API/,
          ),
        ).not.toBeInTheDocument();

        expect(
          screen.getByText(
            /Benefits Claims API, Community Care API, VA Health API, and Veteran Verification API/,
          ),
        ).toBeInTheDocument();
      });

      it('contains a link to oauth documentation', () => {
        const oauthDocumentationLink = screen.getByRole('link', { name: 'OAuth Documentation' });

        expect(oauthDocumentationLink).toBeInTheDocument();
        expect(oauthDocumentationLink.getAttribute('href')).toBe(
          '/explore/authorization/docs/authorization-code',
        );
      });
    });

    describe('oauth ccg apis', () => {
      beforeEach(() => {
        render(
          <MemoryRouter>
            <SandboxAccessSuccess
              result={{
                apis: ['claims'],
                ccgClientId: 'gimli',
                email: 'gimli@eredluin.com',
                kongUsername: 'Onering',
                redirectURI: 'http://theshire.com',
                token: 'elf-friend',
              }}
            />
          </MemoryRouter>,
        );
      });

      it('displays the API OAuth Client Id generated by the backend', () => {
        expect(screen.getByText('Your VA API OAuth Client ID:')).toBeInTheDocument();
        expect(screen.getByText('gimli')).toBeInTheDocument();
      });

      it('does not display an API OAuth Client Secret', () => {
        expect(screen.getByText('Your VA API OAuth Client Secret:')).not.toBeInTheDocument();
      });

      it('displays the provided email address', () => {
        expect(
          screen.getByText(/You should receive an email at gimli@eredluin\.com/gm),
        ).toBeInTheDocument();
      });

      it('displays confirmation for only oauth APIs', () => {
        expect(
          screen.queryByText(
            /Benefits Intake API, VA Facilities API, VA Form API, and Veteran Confirmation API/,
          ),
        ).not.toBeInTheDocument();

        expect(screen.getByText(/Benefits Claims API/)).toBeInTheDocument();
      });

      it('contains a link to oauth documentation', () => {
        const oauthDocumentationLink = screen.getByRole('link', { name: 'OAuth Documentation' });

        expect(oauthDocumentationLink).toBeInTheDocument();
        expect(oauthDocumentationLink.getAttribute('href')).toBe(
          '/explore/authorization/docs/client-credentials',
        );
      });
    });

    describe('internal apis', () => {
      beforeEach(() => {
        render(
          <MemoryRouter>
            <SandboxAccessSuccess
              result={{
                apis: [
                  'addressValidation',
                  'communityCare',
                  'health',
                  'verification',
                  'claims',
                  'benefits',
                  'facilities',
                  'vaForms',
                  'confirmation',
                ],
                email: 'gimli@va.gov',
              }}
            />
          </MemoryRouter>,
        );
      });

      it('displays the provided email address', () => {
        expect(
          screen.getByText(/You should receive an email at gimli@va\.gov/gm),
        ).toBeInTheDocument();
      });

      it('does not list selected apis when an internal api is selected', () => {
        expect(
          screen.queryByText(
            /Benefits Intake API, VA Facilities API, VA Form API, and Veteran Confirmation API/,
          ),
        ).not.toBeInTheDocument();

        expect(
          screen.queryByText(
            /Benefits Claims API, Community Care API, VA Health API, and Veteran Verification API/,
          ),
        ).not.toBeInTheDocument();
      });
    });
  });
});
