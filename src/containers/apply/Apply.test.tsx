import React from 'react';
import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router';
import { makeRequest } from '../../utils/makeRequest';
import { Apply } from './Apply';
import { isApiDeactivated } from '../../apiDefs/deprecated';
import { getAllApis } from '../../apiDefs/query';
import { APIDescription } from '../../apiDefs/schema';

jest.mock('../../utils/makeRequest', () => ({
  ...jest.requireActual<Record<string, string>>('../../utils/makeRequest'),
  makeRequest: jest.fn(),
}));

const mockMakeRequest = makeRequest as jest.Mock;

const allCheckboxApis = getAllApis()
  .filter((api: APIDescription) => api.altID && !isApiDeactivated(api))
  .map((api: APIDescription) => api.name);

describe('Apply', () => {
  beforeEach(() => {
    mockMakeRequest.mockReset();
    render(
      <MemoryRouter>
        <Apply />
      </MemoryRouter>,
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
      await waitFor(() => expect(submitButton).toBeDisabled());
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

      await waitFor(() => expect(submitButton).toBeEnabled());

      userEvent.click(submitButton);

      expect(await screen.findByText('lord-of-moria')).toBeInTheDocument();
    });
  });

  describe('rendering', () => {
    it.each(allCheckboxApis)('displays the expected checkboxes', name => {
      expect(screen.getByRole('checkbox', { name })).toBeInTheDocument();
    });
  });
});
