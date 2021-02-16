import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SupportContactUsFormPublishing from './SupportContactUsFormPublishing';

describe('SupportContactUsFormPublishing', () => {
  it('renders the contact info fields', () => {
    render(<SupportContactUsFormPublishing onSuccess={jest.fn()} />);
    expect(screen.getByLabelText(/First Name/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Last Name/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/)).toBeInTheDocument();
    expect(screen.getByLabelText(/Organization/)).toBeInTheDocument();
  });

  describe('form type toggle', () => {
    it('defaults to the consumer contact form', () => {
      render(<SupportContactUsFormPublishing onSuccess={jest.fn()} />);
      expect(screen.getByRole('group', { name: /What can we help you with\?/ })).toBeInTheDocument();
    });

    describe('default is selected', () => {
      beforeEach(() => {
        render(<SupportContactUsFormPublishing onSuccess={jest.fn()} />);
      });

      it('renders the description field', () => {
        expect(screen.getByLabelText(/Describe your question or issue in as much detail as you can. If your question is about an error, include steps you took to get it and any error messaging you received./));
      });
    });

    describe('publishing is selected', () => {
      beforeEach(() => {
        render(<SupportContactUsFormPublishing onSuccess={jest.fn()} />);
        userEvent.click(screen.getByLabelText('Publish your API to Lighthouse - Internal VA use only'));
      });

      it('renders the publishing fields', async () => {
        expect(await screen.findByLabelText(/Tell us about your API/));
        expect(await screen.findByRole('group', { name: /Do you have concerns about publishing your API for public use\?/ })).toBeInTheDocument();
        expect(await screen.findByLabelText(/Tell us about your API/));
        expect(await screen.findByLabelText(/Other information/));
      });

      describe('api internal-only field', () => {
        it('does not display the internal-only details field', async () => {
          await waitFor(
            () => screen.getByRole('group', { name: /Do you have concerns about publishing your API for public use\?/ })
          );
          expect(screen.queryByLabelText(/Tell us more about why the API needs to be restricted to internal VA use./)).not.toBeInTheDocument();
        });
        describe('clicking yes', () => {
          it('displays the internal-only details field', async() => {
            userEvent.click(await screen.findByLabelText('Yes'));
            expect(await screen.findByLabelText(/Tell us more about why the API needs to be restricted to internal VA use./)).toBeInTheDocument();
          });
        });
      });
    });
  });
});
