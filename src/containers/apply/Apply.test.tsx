import React from 'react';
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router';
import { makeRequest } from '../../utils/makeRequest';
import { FlagsProvider, getFlags } from '../../flags';
import { Apply } from './Apply';

jest.mock('../../utils/makeRequest', () => ({
  ...jest.requireActual<Record<string, string>>('../../utils/makeRequest'),
  makeRequest: jest.fn(),
}));

const mockMakeRequest = makeRequest as jest.Mock;

describe('Apply', () => {
  beforeEach(() => {
    document.querySelectorAll = jest.fn(() => [{ focus: jest.fn() }] as unknown as NodeList);
    mockMakeRequest.mockReset();
    render(
      <FlagsProvider flags={getFlags()}>
        <MemoryRouter>
          <Apply />
        </MemoryRouter>
      </FlagsProvider>,
    );
  });

  describe('filling out the form', () => {
    it('takes you to the submission success page', async () => {
      mockMakeRequest.mockResolvedValue({
        body: {
          clientID: 1234,
          token: 'lord-of-moria',
        },
      });
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

      expect(await screen.findByText('lord-of-moria')).toBeInTheDocument();
    });
  });
});
