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

  it('loads new page content after navigating to a different route', async () => {
    expect(screen.getByText(/A Veteran-centered API platform/)).toBeInTheDocument();

    const documentationLink = screen.getByRole('link', { name: 'Read the Docs' });
    userEvent.click(documentationLink);

    const documentationPageHeader = await screen.findByRole('heading', { name: 'Documentation' });
    expect(documentationPageHeader).toBeInTheDocument();
  });

  it('scrolls the window to the top position after navigation', async () => {
    userEvent.click(screen.getByRole('link', { name: 'Read the Docs' }));

    await screen.findByRole('heading', { name: 'Documentation' });

    expect(window.scrollTo).toHaveBeenCalledTimes(1);
    expect(window.scrollTo).toHaveBeenCalledWith(0, 0);
  });
});
