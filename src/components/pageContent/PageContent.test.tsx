import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { FlagsProvider, getFlags } from '../../flags';
import store from '../../store';
import { PageContent } from './PageContent';

const spyScrollTo: jest.Mock<never, []> = jest.fn<never, []>();

describe('PageContent', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'scrollTo', { value: spyScrollTo });
    spyScrollTo.mockClear();

    render(
      <Provider store={store}>
        <FlagsProvider flags={getFlags()}>
          <MemoryRouter>
            <PageContent />
          </MemoryRouter>
        </FlagsProvider>
      </Provider>,
    );
  });

  it('renders successfully', () => {
    expect(screen.getByRole('main')).toBeInTheDocument();
  });

  it('loads new page content after navigating to a different route', () => {
    setTimeout(() => {
      expect(screen.getAllByText(/A Veteran-centered API platform/).length).toBeGreaterThanOrEqual(
        2,
      );

      const documentationLink = screen.getByRole('link', { name: 'Request an API Key' });
      userEvent.click(documentationLink);

      const documentationPageHeader = screen.findByRole('heading', {
        name: 'Request Sandbox Access',
      });
      expect(documentationPageHeader).toBeInTheDocument();
    }, 0);
  });

  it('scrolls the window to the top position after navigation', () => {
    setTimeout(() => {
      userEvent.click(screen.getByRole('link', { name: 'Request an API Key' }));

      void screen.findByRole('heading', {
        name: 'Request Sandbox Access',
      });
      setTimeout(() => {
        expect(window.scrollTo).toHaveBeenCalledTimes(2);
        expect(window.scrollTo).toHaveBeenCalledWith(0, 0);
      }, 0);
    }, 0);
  });
});
