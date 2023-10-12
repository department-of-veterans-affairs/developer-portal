import { render, screen } from '@testing-library/react';
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
});
