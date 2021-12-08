import { render, screen } from '@testing-library/react';
import React from 'react';
import { FlagsProvider, getFlags } from '../../flags';
import ProductionAccess from './ProductionAccess';

describe('ProductionAccess', () => {
  beforeEach(() => {
    render(
      <FlagsProvider flags={getFlags()}>
        <ProductionAccess />
      </FlagsProvider>
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
