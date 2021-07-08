/* eslint-disable max-lines */
import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { MemoryRouter } from 'react-router';
import { makeRequest } from '../../utils/makeRequest';
import { getAllKeyAuthApis, getAllOauthApis } from '../../apiDefs/query';
import { APIDescription } from '../../apiDefs/schema';
import { FlagsProvider, getFlags } from '../../flags';
import { ApplyForm } from './ApplyForm';

jest.mock('../../utils/makeRequest', () => ({
  ...jest.requireActual<Record<string, string>>('../../utils/makeRequest'),
  makeRequest: jest.fn(),
}));

const mockOnSuccess = jest.fn();
const mockMakeRequest = makeRequest as jest.Mock;

const allOauthApis = getAllOauthApis()
  .filter(api => api.altID && !api.vaInternalOnly)
  .map((api: APIDescription) => api.name);

const allKeyAuthApis = getAllKeyAuthApis()
  .filter(api => api.altID)
  .map((api: APIDescription) => api.name);

describe('ApplyForm', () => {
  beforeEach(() => {
    document.querySelectorAll = jest.fn(() => [{ focus: jest.fn() }] as unknown as NodeList);
    mockOnSuccess.mockReset();
    mockMakeRequest.mockReset();
    render(
      <FlagsProvider flags={getFlags()}>
        <MemoryRouter>
          <ApplyForm onSuccess={mockOnSuccess} />
        </MemoryRouter>
      </FlagsProvider>,
    );
  });

  describe('ouath apis', () => {
    it('adds required fields if selected', async () => {
      await act(async () => {
        await userEvent.type(screen.getByRole('textbox', { name: /First name/ }), 'Samwise', {
          delay: 0.01,
        });
        await userEvent.type(screen.getByRole('textbox', { name: /Last name/ }), 'Gamgee', {
          delay: 0.01,
        });
        await userEvent.type(screen.getByRole('textbox', { name: /Email/ }), 'sam@theshire.net', {
          delay: 0.01,
        });
        await userEvent.type(screen.getByRole('textbox', { name: /^Organization/ }), 'Fellowship', {
          delay: 0.01,
        });
        userEvent.click(screen.getByRole('checkbox', { name: /Benefits Intake/ }));
        userEvent.click(screen.getByRole('checkbox', { name: /Terms of Service/ }));
      });

      userEvent.click(screen.getByRole('checkbox', { name: /Benefits Claims/ }));

      expect(await screen.findByRole('radio', { name: 'Yes' })).toBeInTheDocument();
      expect(await screen.findByRole('radio', { name: 'No' })).toBeInTheDocument();
      expect(
        await screen.findByRole('textbox', { name: /OAuth Redirect URI/ }),
      ).toBeInTheDocument();
    });

    it('loads the OAuthAppInfo component links when an OAuth API is selected', () => {
      expect(screen.queryByRole('link', { name: /PKCE/ })).not.toBeInTheDocument();
      userEvent.click(screen.getByRole('checkbox', { name: /Benefits Claims/ }));
      expect(screen.getAllByRole('link', { name: /PKCE/ })).toHaveLength(2);
    });
  });

  describe('description textarea', () => {
    it('should update input on typing', async () => {
      const descriptionTextarea: HTMLInputElement = screen.getByRole('textbox', {
        name: 'Briefly describe how your organization will use VA APIs:',
      }) as HTMLInputElement;

      void userEvent.type(descriptionTextarea, 'One Ring to rule them all');

      await waitFor(() => expect(descriptionTextarea.value).toBe('One Ring to rule them all'));
    });
  });

  describe('terms of service', () => {
    it('should toggle when clicked', () => {
      const tosCheckbox: HTMLInputElement = screen.getByRole('checkbox', {
        name: /Terms of Service/,
      }) as HTMLInputElement;

      expect(tosCheckbox).toBeInTheDocument();
      expect(tosCheckbox).not.toBeChecked();

      userEvent.click(tosCheckbox);

      expect(tosCheckbox).toBeChecked();
    });

    it('should contain a link to the terms of service page', () => {
      const tosLink = screen.getByRole('link', { name: 'Terms of Service' });

      expect(tosLink).toBeInTheDocument();
      expect(tosLink.getAttribute('href')).toBe('/terms-of-service');
    });
  });

  describe('submit button', () => {
    beforeEach(() => {
      mockMakeRequest.mockResolvedValue({
        body: {
          clientID: 'lord-of-moria',
          token: 1234,
        },
      });
    });

    it('triggers validation when clicked', async () => {
      expect(screen.queryByRole('button', { name: 'Sending...' })).not.toBeInTheDocument();

      await act(async () => {
        await userEvent.type(screen.getByRole('textbox', { name: /First name/ }), 'Peregrin', {
          delay: 0.01,
        });
        await userEvent.type(screen.getByRole('textbox', { name: /Last name/ }), 'Took', {
          delay: 0.01,
        });

        await userEvent.type(screen.getByRole('textbox', { name: /Email/ }), 'pippin@theshire', {
          delay: 0.01,
        });

        await userEvent.type(screen.getByRole('textbox', { name: /^Organization/ }), 'Fellowship', {
          delay: 0.01,
        });
        userEvent.click(screen.getByRole('checkbox', { name: /Benefits Intake/ }));
        userEvent.click(screen.getByRole('checkbox', { name: /Terms of Service/ }));
      });
      userEvent.click(screen.getByRole('button', { name: 'Submit' }));

      expect(await screen.findByText('Enter a valid email address.')).toBeInTheDocument();
    });

    it('validates oauth fields when clicked', async () => {
      await act(async () => {
        await userEvent.type(screen.getByRole('textbox', { name: /First name/ }), 'Peregrin', {
          delay: 0.01,
        });
        await userEvent.type(screen.getByRole('textbox', { name: /Last name/ }), 'Took', {
          delay: 0.01,
        });

        await userEvent.type(
          screen.getByRole('textbox', { name: /Email/ }),
          'pippin@theshire.com',
          {
            delay: 0.01,
          },
        );

        await userEvent.type(screen.getByRole('textbox', { name: /^Organization/ }), 'Fellowship', {
          delay: 0.01,
        });
        userEvent.click(screen.getByRole('checkbox', { name: /Benefits Claims/ }));
        userEvent.click(screen.getByRole('checkbox', { name: /Terms of Service/ }));
      });
      userEvent.click(screen.getByRole('button', { name: 'Submit' }));

      expect(await screen.findByText('Choose an option.')).toBeInTheDocument();
      expect(await screen.findByText('Enter an http or https URI.')).toBeInTheDocument();
    });

    it('displays `Sending...` during form submission', async () => {
      expect(screen.queryByRole('button', { name: 'Sending...' })).not.toBeInTheDocument();

      await act(async () => {
        await userEvent.type(screen.getByRole('textbox', { name: /First name/ }), 'Peregrin', {
          delay: 0.01,
        });
        await userEvent.type(screen.getByRole('textbox', { name: /Last name/ }), 'Took', {
          delay: 0.01,
        });
        await userEvent.type(
          screen.getByRole('textbox', { name: /Email/ }),
          'pippin@theshire.net',
          { delay: 0.01 },
        );
        await userEvent.type(screen.getByRole('textbox', { name: /^Organization/ }), 'Fellowship', {
          delay: 0.01,
        });
        userEvent.click(screen.getByRole('checkbox', { name: /Benefits Intake/ }));
        userEvent.click(screen.getByRole('checkbox', { name: /Terms of Service/ }));
      });
      userEvent.click(screen.getByRole('button', { name: 'Submit' }));

      expect(await screen.findByRole('button', { name: 'Sending...' })).toBeInTheDocument();
    });

    it('submits the form when all required fields are filled', async () => {
      const submitButton = screen.getByRole('button', { name: 'Submit' });

      await act(async () => {
        await userEvent.type(screen.getByRole('textbox', { name: /First name/ }), 'Meriadoc', {
          delay: 0.01,
        });
        await userEvent.type(screen.getByRole('textbox', { name: /Last name/ }), 'Brandybuck', {
          delay: 0.01,
        });
        await userEvent.type(screen.getByRole('textbox', { name: /Email/ }), 'merry@theshire.net', {
          delay: 0.01,
        });
        await userEvent.type(screen.getByRole('textbox', { name: /^Organization/ }), 'Fellowship', {
          delay: 0.01,
        });
        userEvent.click(screen.getByRole('checkbox', { name: /Benefits Intake/ }));
        userEvent.click(screen.getByRole('checkbox', { name: /Terms of Service/ }));
      });

      userEvent.click(submitButton);

      await waitFor(() => {
        expect(mockMakeRequest).toHaveBeenCalled();
        expect(mockOnSuccess).toHaveBeenCalled();
      });
    });
  });

  describe('error message', () => {
    beforeEach(() => {
      mockMakeRequest.mockRejectedValue('bad time');
    });

    it('displays an error on form submission error', async () => {
      expect(
        screen.queryByRole('heading', {
          name: 'We encountered a server error while saving your form. Please try again later.',
        }),
      ).not.toBeInTheDocument();

      const submitButton = screen.getByRole('button', { name: 'Submit' });

      await act(async () => {
        await userEvent.type(screen.getByRole('textbox', { name: /First name/ }), 'Meriadoc', {
          delay: 0.01,
        });
        await userEvent.type(screen.getByRole('textbox', { name: /Last name/ }), 'Brandybuck', {
          delay: 0.01,
        });
        await userEvent.type(screen.getByRole('textbox', { name: /Email/ }), 'merry@theshire.net', {
          delay: 0.01,
        });
        await userEvent.type(screen.getByRole('textbox', { name: /^Organization/ }), 'Fellowship', {
          delay: 0.01,
        });
        userEvent.click(screen.getByRole('checkbox', { name: /Benefits Intake/ }));
        userEvent.click(screen.getByRole('checkbox', { name: /Terms of Service/ }));
      });

      userEvent.click(submitButton);
      expect(
        await screen.findByRole('heading', {
          name: 'We encountered a server error while saving your form. Please try again later.',
        }),
      ).toBeInTheDocument();
    });

    it('contains a link to the support page', async () => {
      const submitButton = screen.getByRole('button', { name: 'Submit' });
      await act(async () => {
        await userEvent.type(screen.getByRole('textbox', { name: /First name/ }), 'Meriadoc', {
          delay: 0.01,
        });
        await userEvent.type(screen.getByRole('textbox', { name: /Last name/ }), 'Brandybuck', {
          delay: 0.01,
        });
        await userEvent.type(screen.getByRole('textbox', { name: /Email/ }), 'merry@theshire.net', {
          delay: 0.01,
        });
        await userEvent.type(screen.getByRole('textbox', { name: /^Organization/ }), 'Fellowship', {
          delay: 0.01,
        });
        userEvent.click(screen.getByRole('checkbox', { name: /Benefits Intake/ }));
        userEvent.click(screen.getByRole('checkbox', { name: /Terms of Service/ }));
      });

      userEvent.click(submitButton);

      const supportLink = await screen.findByRole('link', { name: 'Support page' });

      expect(supportLink).toBeInTheDocument();
      expect(supportLink.getAttribute('href')).toBe('/support');
    });
  });

  describe('SelectedApis', () => {
    describe('Standard APIs', () => {
      it.each(allKeyAuthApis)('toggles the %s checkbox on click', name => {
        const checkbox: HTMLInputElement = screen.getByRole('checkbox', {
          name,
        }) as HTMLInputElement;
        expect(checkbox.checked).toBeFalsy();

        userEvent.click(checkbox);

        expect(checkbox.checked).toBeTruthy();
      });
    });

    describe('OAuth APIs', () => {
      it.each(allOauthApis)('toggles the %s checkbox on click', name => {
        const checkbox: HTMLInputElement = screen.getByRole('checkbox', {
          name,
        }) as HTMLInputElement;
        expect(checkbox.checked).toBeFalsy();

        userEvent.click(checkbox);

        expect(checkbox.checked).toBeTruthy();
      });
    });
  });
});
