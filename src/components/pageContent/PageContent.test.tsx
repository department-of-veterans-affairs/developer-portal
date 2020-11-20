import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { FlagsProvider, getFlags } from '../../flags';
import { PageContent } from './PageContent';

const spyScrollTo: jest.Mock<never, []> = jest.fn<never, []>();

describe('PageContent', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'scrollTo', { value: spyScrollTo });
    spyScrollTo.mockClear();

    render(
      <FlagsProvider flags={getFlags()}>
        <MemoryRouter>
          <PageContent />
        </MemoryRouter>
      </FlagsProvider>,
    );
  });

  it('renders successfully', () => {
    expect(screen.getByRole('main')).toBeInTheDocument();
  });

  it('loads new page content after navigating to a different route', async () => {
    expect(screen.getByText(/A Veteran-centered API platform/)).toBeInTheDocument();

    const documentationLink = screen.getByText('Read our documentation');
    userEvent.click(documentationLink);

    const documentationPageDescription = await screen.findByText('Documentation');

    expect(documentationPageDescription).toBeInTheDocument();
  });

  it('scrolls the window to the top position after navigation', async () => {
    const documentationLink = screen.getByText('Read our documentation');
    userEvent.click(documentationLink);

    await screen.findByText('Documentation');

    expect(window.scrollTo).toHaveBeenCalledTimes(1);
    expect(window.scrollTo).toHaveBeenCalledWith(0, 0);
  });
});
