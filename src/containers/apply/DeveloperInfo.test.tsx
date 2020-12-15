import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import store from '../../store';
import { DeveloperInfo } from './DeveloperInfo';

describe('DeveloperInfo', () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <DeveloperInfo />
        </MemoryRouter>
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

      await userEvent.type(input, 'Aragorn');

      expect(input.value).toBe('Aragorn');
    });
  });

  describe('last name', () => {
    it('updates the textbox on user input', async () => {
      const input: HTMLInputElement = screen.getByRole('textbox', {
        name: 'Last name (*Required)',
      }) as HTMLInputElement;

      expect(input.value).toBe('');

      await userEvent.type(input, 'Son of Arathorn');

      expect(input.value).toBe('Son of Arathorn');
    });
  });
  describe('email', () => {
    it('updates the email textbox on user input', async () => {
      const input: HTMLInputElement = screen.getByRole('textbox', {
        name: 'Email (*Required)',
      }) as HTMLInputElement;

      expect(input.value).toBe('');

      await userEvent.type(input, 'strider@gondor.org');

      expect(input.value).toBe('strider@gondor.org');
    });

    it('displays an error message when given an invalid email address', async () => {
      await userEvent.type(
        screen.getByRole('textbox', { name: 'Email (*Required)' }),
        'strider@gondor',
      );
      userEvent.tab();

      const error = screen.getByRole('alert');
      expect(error).toHaveTextContent('Must be a valid email address.');
    });
  });

  describe('organization', () => {
    it('updates the organization textbox on user input', async () => {
      const input: HTMLInputElement = screen.getByRole('textbox', {
        name: 'Organization (*Required)',
      }) as HTMLInputElement;

      expect(input.value).toBe('');

      await userEvent.type(input, 'Kingdom of Gondor');

      expect(input.value).toBe('Kingdom of Gondor');
    });
  });
});
