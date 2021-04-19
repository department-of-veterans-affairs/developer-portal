import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { MemoryRouter } from 'react-router';
import { makeRequest } from '../../utils/makeRequest';

import { ApplyForm } from './ApplyForm';

jest.mock('../../utils/makeRequest', () => ({
  ...jest.requireActual<Record<string, string>>('../../utils/makeRequest'),
  makeRequest: jest.fn(),
}));

const mockOnSuccess = jest.fn();
const mockMakeRequest = makeRequest as jest.Mock;

describe('ApplyForm', () => {
  beforeEach(() => {
    mockOnSuccess.mockReset();
    mockMakeRequest.mockReset();
    render(
      <MemoryRouter>
        <ApplyForm onSuccess={mockOnSuccess} />
      </MemoryRouter>
    );
  });

  describe('ouath apis', () => {
    it('adds required fields if selected', async () => {
      const submitButton: HTMLButtonElement = screen.getByRole('button', {
        name: 'Submit',
      }) as HTMLButtonElement;
      await act(async () => {
        await userEvent.type(screen.getByRole('textbox', { name: /First name/ }), 'Samwise', { delay: 0.01 });
        await userEvent.type(screen.getByRole('textbox', { name: /Last name/ }), 'Gamgee', { delay: 0.01 });
        await userEvent.type(screen.getByRole('textbox', { name: /Email/ }), 'sam@theshire.net', { delay: 0.01 });
        await userEvent.type(screen.getByRole('textbox', { name: /^Organization/ }), 'Fellowship', { delay: 0.01 });
        userEvent.click(screen.getByRole('checkbox', { name: /VA Benefits API/ }));
        userEvent.click(screen.getByRole('checkbox', { name: /Terms of Service/ }));
      });

      await waitFor(() => {
        expect(submitButton).not.toBeDisabled();
      });

      userEvent.click(screen.getByRole('checkbox', { name: /VA Claims API/ }));

      await waitFor(() => {
        expect(submitButton).toBeDisabled();
      });

      userEvent.click(await screen.findByRole('radio', { name: 'Yes' }));

      void userEvent.type(
        screen.getByRole('textbox', { name: /OAuth Redirect URI/ }),
        'http://prancingpony.pub/',
      );

      await waitFor(() => expect(submitButton).not.toBeDisabled());
    });
  });

  describe('oauth info', () => {
    it('loads the OAuthAppInfo component when an OAuth API is selected', () => {
      expect(
        screen.queryByRole('link', { name: 'authorization code flow' }),
      ).not.toBeInTheDocument();

      userEvent.click(screen.getByRole('checkbox', { name: 'VA Claims API' }));

      expect(screen.getByRole('link', { name: 'authorization code flow' })).toBeInTheDocument();
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

    it('is disabled when not all required fields are filled in', async () => {
      const submitButton: HTMLButtonElement = screen.getByRole('button', {
        name: 'Submit',
      }) as HTMLButtonElement;

      expect(submitButton).toBeInTheDocument();
      expect(submitButton).toBeDisabled();

      userEvent.type(screen.getByRole('textbox', { name: /First name/ }), 'Peregrin');
      userEvent.type(screen.getByRole('textbox', { name: /Last name/ }), 'Took');
      userEvent.type(screen.getByRole('textbox', { name: /Email/ }), 'pippin@theshire.net');
      userEvent.type(screen.getByRole('textbox', { name: /^Organization/ }), 'Fellowship');
      userEvent.click(screen.getByRole('checkbox', { name: /VA Benefits API/ }));

      await waitFor(() => expect(submitButton).toBeDisabled());

      userEvent.click(screen.getByRole('checkbox', { name: /Terms of Service/ }));

      await waitFor(() => expect(submitButton).not.toBeDisabled());
    });

    it('displays `Sending...` during form submission', async () => {
      expect(screen.queryByRole('button', { name: 'Sending...' })).not.toBeInTheDocument();

      await act(async () => {
        await userEvent.type(screen.getByRole('textbox', { name: /First name/ }), 'Peregrin', { delay: 0.01 });
        await userEvent.type(screen.getByRole('textbox', { name: /Last name/ }), 'Took', { delay: 0.01 });
        await userEvent.type(screen.getByRole('textbox', { name: /Email/ }), 'pippin@theshire.net', { delay: 0.01 });
        await userEvent.type(screen.getByRole('textbox', { name: /^Organization/ }), 'Fellowship', { delay: 0.01 });
        userEvent.click(screen.getByRole('checkbox', { name: /VA Benefits API/ }));
        userEvent.click(screen.getByRole('checkbox', { name: /Terms of Service/ }));
      });
      userEvent.click(screen.getByRole('button', { name: 'Submit' }));

      expect(await screen.findByRole('button', { name: 'Sending...' })).toBeInTheDocument();
    });

    it('submits the form when all required fields are filled', async () => {
      const submitButton = screen.getByRole('button', { name: 'Submit' });
      await waitFor(() => expect(submitButton).toBeDisabled());
      await act(async () => {
        await userEvent.type(screen.getByRole('textbox', { name: /First name/ }), 'Meriadoc', { delay: 0.01 });
        await userEvent.type(screen.getByRole('textbox', { name: /Last name/ }), 'Brandybuck', { delay: 0.01 });
        await userEvent.type(screen.getByRole('textbox', { name: /Email/ }), 'merry@theshire.net', { delay: 0.01 });
        await userEvent.type(screen.getByRole('textbox', { name: /^Organization/ }), 'Fellowship', { delay: 0.01 });
        userEvent.click(screen.getByRole('checkbox', { name: /VA Benefits API/ }));
        userEvent.click(screen.getByRole('checkbox', { name: /Terms of Service/ }));
      });

      await waitFor(() => expect(submitButton).toBeEnabled());

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
      await waitFor(() => expect(submitButton).toBeDisabled());
      await act(async () => {
        await userEvent.type(screen.getByRole('textbox', { name: /First name/ }), 'Meriadoc', { delay: 0.01 });
        await userEvent.type(screen.getByRole('textbox', { name: /Last name/ }), 'Brandybuck', { delay: 0.01 });
        await userEvent.type(screen.getByRole('textbox', { name: /Email/ }), 'merry@theshire.net', { delay: 0.01 });
        await userEvent.type(screen.getByRole('textbox', { name: /^Organization/ }), 'Fellowship', { delay: 0.01 });
        userEvent.click(screen.getByRole('checkbox', { name: /VA Benefits API/ }));
        userEvent.click(screen.getByRole('checkbox', { name: /Terms of Service/ }));
      });

      await waitFor(() => expect(submitButton).toBeEnabled());

      userEvent.click(submitButton);
      expect(
        await screen.findByRole('heading', {
          name: 'We encountered a server error while saving your form. Please try again later.',
        }),
      ).toBeInTheDocument();
    });

    it('contains a link to the support page', async () => {
      const submitButton = screen.getByRole('button', { name: 'Submit' });
      await waitFor(() => expect(submitButton).toBeDisabled());
      await act(async () => {
        await userEvent.type(screen.getByRole('textbox', { name: /First name/ }), 'Meriadoc', { delay: 0.01 });
        await userEvent.type(screen.getByRole('textbox', { name: /Last name/ }), 'Brandybuck', { delay: 0.01 });
        await userEvent.type(screen.getByRole('textbox', { name: /Email/ }), 'merry@theshire.net', { delay: 0.01 });
        await userEvent.type(screen.getByRole('textbox', { name: /^Organization/ }), 'Fellowship', { delay: 0.01 });
        userEvent.click(screen.getByRole('checkbox', { name: /VA Benefits API/ }));
        userEvent.click(screen.getByRole('checkbox', { name: /Terms of Service/ }));
      });

      await waitFor(() => expect(submitButton).toBeEnabled());

      userEvent.click(submitButton);

      const supportLink = await screen.findByRole('link', { name: 'Support page' });

      expect(supportLink).toBeInTheDocument();
      expect(supportLink.getAttribute('href')).toBe('/support');
    });
  });

  describe('SelectedApis', () => {
    describe('Standard APIs', () => {
      const standardApis = [
        'VA Benefits API',
        'VA Facilities API',
        'VA Forms API',
        'VA Veteran Confirmation API',
      ];

      it.each(standardApis)('contains the %s checkbox', name => {
        expect(screen.getByRole('checkbox', { name })).toBeInTheDocument();
      });

      it.each(standardApis)('toggles the %s checkbox on click', name => {
        const checkbox: HTMLInputElement = screen.getByRole('checkbox', { name }) as HTMLInputElement;
        expect(checkbox.checked).toBeFalsy();

        userEvent.click(checkbox);

        expect(checkbox.checked).toBeTruthy();
      });
    });

    describe('OAuth APIs', () => {
      const oauthApis = [
        'VA Claims API',
        'VA Health API',
        'Community Care Eligibility API',
        'VA Veteran Verification API',
      ];

      it.each(oauthApis)('contains the %s checkbox', name => {
        expect(screen.getByRole('checkbox', { name })).toBeInTheDocument();
      });

      it.each(oauthApis)('toggles the %s checkbox on click', name => {
        const checkbox: HTMLInputElement = screen.getByRole('checkbox', { name }) as HTMLInputElement;
        expect(checkbox.checked).toBeFalsy();

        userEvent.click(checkbox);

        expect(checkbox.checked).toBeTruthy();
      });
    });
  });
});
