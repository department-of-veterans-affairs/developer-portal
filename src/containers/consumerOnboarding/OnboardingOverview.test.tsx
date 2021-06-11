import { render, screen } from '@testing-library/react';
import React from 'react';
import OnboardingOverview from './OnboardingOverview';

describe('OnboardingOverview', () => {
  beforeEach(() => {
    render(<OnboardingOverview />);
  });

  it('renders the heading', () => {
    const heading = screen.getByRole('heading', { name: 'API Consumer Onboarding' });
    expect(heading).toBeInTheDocument();
  });
});
