import React from 'react';
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router';
import { makeRequest } from '../../utils/makeRequest';
import { Apply } from './Apply';

jest.mock('../../utils/makeRequest', () => ({
  ...jest.requireActual<Record<string, string>>('../../utils/makeRequest'),
  makeRequest: jest.fn(),
}));

const mockMakeRequest = makeRequest as jest.Mock;

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
        userEvent.click(screen.getByRole('checkbox', { name: /VA Benefits API/ }));
        userEvent.click(screen.getByRole('checkbox', { name: /Terms of Service/ }));
      });

      userEvent.click(submitButton);

      expect(await screen.findByText('lord-of-moria')).toBeInTheDocument();
    });
  });

  describe('rendering', () => {
    it('displays the expected checkboxes', () => {
      expect(screen.getByRole('checkbox', { name: /Claims Attributes API/ })).toBeInTheDocument();
      expect(screen.getByRole('checkbox', { name: /VA Benefits API/ })).toBeInTheDocument();
      expect(screen.getByRole('checkbox', { name: /VA Facilities API/ })).toBeInTheDocument();
      expect(screen.getByRole('checkbox', { name: /VA Forms API/ })).toBeInTheDocument();
      expect(
        screen.getByRole('checkbox', { name: /VA Veteran Confirmation API/ }),
      ).toBeInTheDocument();

      expect(screen.getByRole('checkbox', { name: /VA Claims API/ })).toBeInTheDocument();
      expect(screen.getByRole('checkbox', { name: /VA Health API/ })).toBeInTheDocument();
      expect(
        screen.getByRole('checkbox', { name: /Community Care Eligibility API/ }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole('checkbox', { name: /VA Veteran Verification API/ }),
      ).toBeInTheDocument();
    });
  });
});
