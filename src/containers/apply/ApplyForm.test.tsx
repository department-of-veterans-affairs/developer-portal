import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { MemoryRouter } from 'react-router';

import { ApplyForm } from './ApplyForm';

describe('ApplyForm', () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <ApplyForm onSuccess={() => {}} />
      </MemoryRouter>
    );
  });

  it('should successfully render', () => {
    expect(
      screen.getByRole('region', { name: 'Apply for VA Lighthouse Developer Access' }),
    ).toBeInTheDocument();
  });

  describe('ouath apis', () => {
    it('adds required fields if selected', async () => {
      const submitButton: HTMLButtonElement = screen.getByRole('button', {
        name: 'Submit',
      }) as HTMLButtonElement;

      void userEvent.type(screen.getByRole('textbox', { name: /First name/ }), 'Samwise');
      void userEvent.type(screen.getByRole('textbox', { name: /Last name/ }), 'Gamgee');
      void userEvent.type(screen.getByRole('textbox', { name: /Email/ }), 'sam@theshire.net');
      void userEvent.type(screen.getByRole('textbox', { name: /^Organization/ }), 'Fellowship');
      userEvent.click(screen.getByRole('checkbox', { name: /VA Benefits API/ }));
      userEvent.click(screen.getByRole('checkbox', { name: /Terms of Service/ }));

      expect(submitButton).not.toBeDisabled();

      userEvent.click(screen.getByRole('checkbox', { name: /VA Claims API/ }));

      expect(submitButton).toBeDisabled();

      userEvent.click(screen.getByRole('radio', { name: 'Yes' }));

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
    it('is disabled when not all required fields are filled in', async () => {
      const submitButton: HTMLButtonElement = screen.getByRole('button', {
        name: 'Submit',
      }) as HTMLButtonElement;

      expect(submitButton).toBeInTheDocument();
      expect(submitButton).toBeDisabled();

      void userEvent.type(screen.getByRole('textbox', { name: /First name/ }), 'Peregrin');
      void userEvent.type(screen.getByRole('textbox', { name: /Last name/ }), 'Took');
      void userEvent.type(screen.getByRole('textbox', { name: /Email/ }), 'pippin@theshire.net');
      void userEvent.type(screen.getByRole('textbox', { name: /^Organization/ }), 'Fellowship');
      userEvent.click(screen.getByRole('checkbox', { name: /VA Benefits API/ }));

      await waitFor(() => expect(submitButton).toBeDisabled());

      userEvent.click(screen.getByRole('checkbox', { name: /Terms of Service/ }));

      expect(submitButton).not.toBeDisabled();
    });

    it('displays `Sending...` during form submission', () => {
      expect(screen.queryByRole('button', { name: 'Sending...' })).not.toBeInTheDocument();

      expect(screen.getByRole('button', { name: 'Sending...' })).toBeInTheDocument();
    });

    it('submits the form when all required fields are filled', async () => {
      await waitFor(() =>
        userEvent.type(screen.getByRole('textbox', { name: /First name/ }), 'Meriadoc'),
      );
      await waitFor(() =>
        userEvent.type(screen.getByRole('textbox', { name: /Last name/ }), 'Brandybuck'),
      );
      await waitFor(() =>
        userEvent.type(screen.getByRole('textbox', { name: /Email/ }), 'merry@theshire.net'),
      );
      await waitFor(() =>
        userEvent.type(screen.getByRole('textbox', { name: /^Organization/ }), 'Fellowship'),
      );
      userEvent.click(screen.getByRole('checkbox', { name: /VA Benefits API/ }));
      userEvent.click(screen.getByRole('checkbox', { name: /Terms of Service/ }));

      const submitButton: HTMLButtonElement = screen.getByRole('button', {
        name: 'Submit',
      }) as HTMLButtonElement;

      userEvent.click(submitButton);
    });
  });

  describe('error message', () => {
    it('displays an error on form submission error', () => {
      expect(
        screen.queryByRole('heading', {
          name: 'We encountered a server error while saving your form. Please try again later.',
        }),
      ).not.toBeInTheDocument();

      expect(
        screen.queryByRole('heading', {
          name: 'We encountered a server error while saving your form. Please try again later.',
        }),
      ).toBeInTheDocument();
    });

    it('contains a link to the support page', () => {
      const supportLink = screen.getByRole('link', { name: 'Support page' });

      expect(supportLink).toBeInTheDocument();
      expect(supportLink.getAttribute('href')).toBe('/support');
    });
  });
});
