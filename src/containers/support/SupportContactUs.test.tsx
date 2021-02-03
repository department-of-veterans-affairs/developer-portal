import { render, screen } from '@testing-library/react';
import React from 'react';
import { useLocation } from 'react-router';
import { FlagsProvider, getFlags } from '../../flags';
import SupportContactUs from './SupportContactUs';

jest.mock('react-router', () => ({
  useLocation: jest.fn(() => ({})),
}));

const mockUseLocation = useLocation as jest.Mock;

describe('SupportContactUs', () => {
  beforeEach(() => {
    mockUseLocation.mockClear();
  });

  const renderComponent = (): void => {
    render(
      <FlagsProvider flags={getFlags()}>
        <SupportContactUs />
      </FlagsProvider>);
  };
  describe('query params', () => {
    describe('default is set to publishing', () => {
      beforeEach(() => {
        mockUseLocation.mockImplementation(() => ({ search: '?default=publishing' }));
      });

      it('sets the default form to publishing', async () => {
        renderComponent();
        expect(await screen.findByLabelText(/Include as much information about your API as possible/)).toBeInTheDocument();
      });
    });

    describe('default is not  set to publishing', () => {
      beforeEach(() => {
        mockUseLocation.mockImplementation(() => ({ search: '?default=default' }));
      });

      it('sets the default form to the default support form', async () => {
        renderComponent();
        expect(await screen.findByLabelText(/Describe your question or issue in as much detail as you can. If your question is about an error, include steps you took to get it and any error messaging you received./)).toBeInTheDocument();
      });
    });
  });
});
