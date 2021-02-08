import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { makeRequest } from '../../../utils/makeRequest';
import { FormType } from '../../../types/contactUsForm';
import ContactUsForm from './ContactUsForm';

jest.mock('../../../utils/makeRequest', () => ({
  ...jest.requireActual<Record<string, string>>('../../../utils/makeRequest'),
  makeRequest: jest.fn(),
}));

const mockOnSuccess = jest.fn();
const mockMakeRequest = makeRequest as jest.Mock;
const jsonSpy = jest.spyOn(JSON, 'stringify');

describe('SupportContactUsFormPublishing', () => {
  const renderComponent = (defaultType: FormType = FormType.CONSUMER): void => {
    render(<ContactUsForm onSuccess={mockOnSuccess} defaultType={defaultType} />);
  };
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the contact info fields', () => {
    renderComponent();
    expect(screen.getByLabelText(/First name/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Last name/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email address/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Organization/)).toBeInTheDocument();
  });

  describe('form is missing required fields', () => {
    beforeEach(() => {
      renderComponent();
    });
    it('disables the submit button', () => {
      expect(screen.getByRole('button', { name: 'Submit' })).toBeDisabled();
    });
  });

  describe('form type', () => {
    describe('default is consumer', () => {
      beforeEach(() => {
        renderComponent(FormType.CONSUMER);
      });
      it('renders the description field', () => {
        expect(screen.getByLabelText(/Describe your question or issue in as much detail as you can./));
      });

      describe('all fields are valid', () => {
        beforeEach(async () => {
          await userEvent.type(screen.getByLabelText(/First name/), 'Frodo', { delay: 0.00001 });
          await userEvent.type(screen.getByLabelText(/Last name/), 'Baggins', { delay: 0.00001 });
          await userEvent.type(screen.getByLabelText(/Email/), 'fbag@bagend.com', { delay: 0.00001 });
          await userEvent.type(screen.getByLabelText(
            /Describe your question or issue in as much detail as you can./
          ), 'The dark riders are coming', { delay: 0.00001 });
        });

        it('enables the submit button', () => {
          expect(screen.getByRole('button', { name: 'Submit' })).toBeEnabled();
        });

        describe('submitting the form', () => {
          beforeEach(async () => {
            userEvent.click(screen.getByRole('button', { name: 'Submit' }));
            expect(await screen.findByRole('button', { name: 'Sending...' })).toBeInTheDocument();
          });
          it('sends the values', async () => {
            expect(jsonSpy).toHaveBeenCalledWith({
              description: 'The dark riders are coming',
              email: 'fbag@bagend.com',
              firstName: 'Frodo',
              lastName: 'Baggins',
              organization: '',
              type: 'DEFAULT',
            });
            await waitFor(() => {
              expect(mockMakeRequest).toHaveBeenCalledWith('http://fake.va.gov/internal/developer-portal/public/contact-us', {
                body: expect.stringContaining('\"email\":\"fbag@bagend.com\"') as unknown,
                headers: {
                  accept: 'application/json',
                  'content-type': 'application/json',
                },
                method: 'POST',
              }, { responseType: 'TEXT' });
            });
            expect(mockOnSuccess).toHaveBeenCalled();
            expect(await screen.findByRole('button', { name: 'Submit' })).toBeInTheDocument();
          });
        });

        describe('switching to publishing', () => {
          beforeEach(async () => {
            userEvent.click(screen.getByLabelText('Publish your API to Lighthouse - Internal VA use only'));
            await waitFor(() => {
              screen.getByLabelText(/Include as much information about your API as possible/);
            });
          });

          it('disables the submit button', () => {
            expect(screen.getByRole('button', { name: 'Submit' })).toBeDisabled();
          });

          describe('switching back to default', () => {
            beforeEach(async () => {
              await userEvent.type(screen.getByLabelText(/Include as much information about your API as possible/), 'fake thing', { delay: 0.00001 });
              userEvent.click(screen.getByLabelText('Report a problem or ask a question'));
              await waitFor(() => {
                screen.getByLabelText(/Describe your question or issue in as much detail as you can./);
              });
            });

            it('enables the submit button', () => {
              expect(screen.getByRole('button', { name: 'Submit' })).toBeEnabled();
            });

            describe('submitting the form', () => {
              beforeEach(async () => {
                userEvent.click(screen.getByRole('button', { name: 'Submit' }));
                expect(await screen.findByRole('button', { name: 'Sending...' })).toBeInTheDocument();
              });
              it('does not submit the form fields from the non-selected form type', async () => {
                await waitFor(() => {
                  expect(mockMakeRequest).toHaveBeenCalledWith('http://fake.va.gov/internal/developer-portal/public/contact-us', {
                    body: expect.not.stringContaining('\"apiDetails\":\"fake thing\"') as unknown,
                    headers: {
                      accept: 'application/json',
                      'content-type': 'application/json',
                    },
                    method: 'POST',
                  }, { responseType: 'TEXT' });
                });
                expect(mockOnSuccess).toHaveBeenCalled();
                expect(await screen.findByRole('button', { name: 'Submit' })).toBeInTheDocument();
              });
            });
          });
        });
      });

      describe('some fields are invalid', () => {
        beforeEach(async () => {
          await userEvent.type(screen.getByRole('textbox', { name: /Email address/ }), 'frodo my boy', { delay: 0.00001 });
          userEvent.click(screen.getByLabelText(/First name/));
          userEvent.tab();
        });
        it('displays the validation errors', async () => {
          expect(await screen.findByText('First name must not be blank.')).toBeInTheDocument();
          expect(await screen.findByText('Must be a valid email address.')).toBeInTheDocument();
        });
      });
    });

    describe('default is publishing', () => {
      beforeEach(() => {
        renderComponent(FormType.PUBLISHING);
      });

      it('renders the publishing fields', () => {
        expect(screen.getByLabelText(/Include as much information about your API as possible/)).toBeInTheDocument();
        expect(screen.getByLabelText(/Send us your OpenAPI specification. Include a public-facing description of your API./)).toBeInTheDocument();
        expect(screen.getByRole('group', { name: /Do you have concerns about publishing your API for public use\?/ })).toBeInTheDocument();
        expect(screen.getByLabelText(/Is there anything else we should know about your API, how it’s used, or what you need from us?/)).toBeInTheDocument();
      });

      describe('api internal-only field', () => {
        it('does not display the internal-only details field', () => {
          expect(screen.queryByLabelText(/Tell us more about why the API needs to be restricted to internal VA use./)).not.toBeInTheDocument();
        });
        describe('clicking yes', () => {
          it('displays the internal-only details field', async() => {
            userEvent.click(await screen.findByLabelText('Yes'));
            expect(await screen.findByLabelText(/Tell us more about why the API needs to be restricted to internal VA use./)).toBeInTheDocument();
          });
        });
      });

      describe('all fields are valid', () => {
        beforeEach(async () => {
          await userEvent.type(screen.getByLabelText(/First name/), 'Frodo', { delay: 0.00001 });
          await userEvent.type(screen.getByLabelText(/Last name/), 'Baggins', { delay: 0.00001 });
          await userEvent.type(screen.getByLabelText(/Email/), 'fbag@bagend.com', { delay: 0.00001 });
          await userEvent.type(screen.getByLabelText(/Include as much information about your API as possible/), 'It takes the ring to mordor', { delay: 0.00001 });
          await userEvent.type(screen.getByLabelText(/Send us your OpenAPI specification. Include a public-facing description of your API./), 'www.api.com', { delay: 0.00001 });
          userEvent.click(screen.getByLabelText('Yes'));
          await userEvent.type(screen.getByLabelText(/Tell us more about why the API needs to be restricted to internal VA use./), 'The enemy has spies everywhere', { delay: 0.00001 });
          await userEvent.type(screen.getByLabelText(/Is there anything else we should know about your API, how it’s used, or what you need from us?/), 'No', { delay: 0.00001 });
        });

        it('enables the submit button', () => {
          expect(screen.getByRole('button', { name: 'Submit' })).toBeEnabled();
        });

        describe('submitting the form', () => {
          beforeEach(async () => {
            userEvent.click(screen.getByRole('button', { name: 'Submit' }));
            expect(await screen.findByRole('button', { name: 'Sending...' })).toBeInTheDocument();
          });
          it('sends the values', async () => {
            expect(jsonSpy).toHaveBeenCalledWith({
              apiDescription: 'www.api.com',
              apiDetails: 'It takes the ring to mordor',
              apiInternalOnly: true,
              apiInternalOnlyDetails: 'The enemy has spies everywhere',
              apiOtherInfo: 'No',
              email: 'fbag@bagend.com',
              firstName: 'Frodo',
              lastName: 'Baggins',
              organization: '',
              type: 'PUBLISHING',
            });
            await waitFor(() => {
              expect(mockMakeRequest).toHaveBeenCalledWith('http://fake.va.gov/internal/developer-portal/public/contact-us', {
                body: expect.stringContaining('\"email\":\"fbag@bagend.com\"') as unknown,
                headers: {
                  accept: 'application/json',
                  'content-type': 'application/json',
                },
                method: 'POST',
              }, { responseType: 'TEXT' });
            });
            expect(mockOnSuccess).toHaveBeenCalled();
            expect(await screen.findByRole('button', { name: 'Submit' })).toBeInTheDocument();
          });
        });
      });
    });
  });
});
