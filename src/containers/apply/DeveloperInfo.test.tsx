import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { Provider } from 'react-redux';
import store from '../../store';
import { DeveloperInfo } from './DeveloperInfo';

describe('DeveloperInfo', () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <DeveloperInfo />
      </Provider>,
    );
  });

  it('renders successfully', () => {
    expect(screen.getByRole('textbox', { name: 'First name (*Required)' })).toBeInTheDocument();
  });

  describe('first name', () => {
    it('updates the textbox on user input', async () => {
      const input: HTMLInputElement = screen.getByRole('textbox', {
        name: 'First name (*Required)',
      }) as HTMLInputElement;

      expect(input.value).toBe('');

      void userEvent.type(input, 'Aragorn');

      await waitFor(() => expect(input.value).toBe('Aragorn'));
    });
  });

  describe('last name', () => {
    it('updates the textbox on user input', async () => {
      const input: HTMLInputElement = screen.getByRole('textbox', {
        name: 'Last name (*Required)',
      }) as HTMLInputElement;

      expect(input.value).toBe('');

      void userEvent.type(input, 'Son of Arathorn');

      await waitFor(() => expect(input.value).toBe('Son of Arathorn'));
    });
  });
  describe('email', () => {
    it('updates the email textbox on user input', async () => {
      const input: HTMLInputElement = screen.getByRole('textbox', {
        name: 'Email (*Required)',
      }) as HTMLInputElement;

      expect(input.value).toBe('');

      void userEvent.type(input, 'strider@gondor.org');

      await waitFor(() => expect(input.value).toBe('strider@gondor.org'));
    });

    it('displays an error message when given an invalid email address', async () => {
      void userEvent.type(
        screen.getByRole('textbox', { name: 'Email (*Required)' }),
        'strider@gondor',
      );
      userEvent.tab();

      const error = screen.getByRole('alert');
      await waitFor(() => expect(error).toHaveTextContent('Must be a valid email address.'));
    });
  });

  describe('organization', () => {
    it('updates the organization textbox on user input', async () => {
      const input: HTMLInputElement = screen.getByRole('textbox', {
        name: 'Organization (*Required)',
      }) as HTMLInputElement;

      expect(input.value).toBe('');

      void userEvent.type(input, 'Kingdom of Gondor');

      await waitFor(() => expect(input.value).toBe('Kingdom of Gondor'));
    });
  });
});
