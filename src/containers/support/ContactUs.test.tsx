import { render, screen } from '@testing-library/react';
import React from 'react';
import { MemoryRouter, useLocation } from 'react-router-dom';
import ContactUs from './ContactUs';

jest.mock('react-router-dom', () => ({
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
  ...(jest.requireActual('react-router-dom') as Record<string, unknown>),
  useLocation: jest.fn(() => ({})),
}));

const mockUseLocation = useLocation as jest.Mock;

describe('ContactUs', () => {
  beforeEach(() => {
    mockUseLocation.mockClear();
  });

  const renderComponent = (): void => {
    render(
      <MemoryRouter>
        <ContactUs />
      </MemoryRouter>,
    );
  };

  it('Page renders as expected', () => {
    render(
      <MemoryRouter>
        <ContactUs />
      </MemoryRouter>,
    );
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveTextContent('Developer portal support');
  });

  describe('query params', () => {
    describe('type is set to publishing', () => {
      beforeEach(() => {
        mockUseLocation.mockImplementation(() => ({ search: '?type=publishing' }));
      });

      it('sets the form to publishing', async () => {
        renderComponent();
        expect(
          await screen.findByLabelText(/Include as much information about your API as possible/),
        ).toBeInTheDocument();
      });
    });

    describe('type is not set to publishing', () => {
      beforeEach(() => {
        mockUseLocation.mockImplementation(() => ({ search: '?type=consumer' }));
      });

      it('sets the form to the consumer support form', async () => {
        renderComponent();
        expect(
          await screen.findByLabelText(
            /Describe your question or issue in as much detail as you can./,
          ),
        ).toBeInTheDocument();
      });
    });

    describe('no query param is present', () => {
      beforeEach(() => {
        mockUseLocation.mockImplementation(() => ({ search: '' }));
      });

      it('sets the form to the consumer support form', async () => {
        renderComponent();
        expect(
          await screen.findByLabelText(
            /Describe your question or issue in as much detail as you can./,
          ),
        ).toBeInTheDocument();
      });
    });
  });
});
