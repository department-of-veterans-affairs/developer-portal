import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { FlagsProvider, getFlags } from '../../flags';
import store from '../../store';
import ProductionAccess from './ProductionAccess';

describe('ProductionAccess', () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <FlagsProvider flags={getFlags()}>
          <MemoryRouter>
            <ProductionAccess />
          </MemoryRouter>
        </FlagsProvider>
      </Provider>,
    );
  });

  it('renders the main heading', () => {
    const heading = screen.getByRole('heading', {
      level: 1,
      name: 'Production access form',
    });
    expect(heading).toBeInTheDocument();
  });

  it('renders the h2 subheading', () => {
    const heading = screen.getByRole('heading', {
      level: 2,
      name: 'Step 1: Verification',
    });
    expect(heading).toBeInTheDocument();
  });
});
