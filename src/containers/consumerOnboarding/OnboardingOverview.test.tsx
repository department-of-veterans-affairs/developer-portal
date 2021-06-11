import { getAllByRole, render, screen } from '@testing-library/react';
import React from 'react';
import OnboardingOverview from './OnboardingOverview';

describe('OnboardingOverview', () => {
  beforeEach(() => {
    render(<OnboardingOverview />);
  });

  it('renders the main heading', () => {
    const heading = screen.getByRole('heading', { level: 1, name: 'API Consumer Onboarding' });
    expect(heading).toBeInTheDocument();
  });

  it.each([
    'Onboarding steps',
    'Onboarding timeline',
    'About us',
  ])('renders the "%s" heading', (headingText: string) => {
    const heading = screen.getByRole('heading', { level: 2, name: headingText });
    expect(heading).toBeInTheDocument();
  });

  describe('subway map/process list', () => {
    it('renders the subway map', () => {
      const list = screen.getByRole('list', { name: 'Onboarding steps' });
      expect(list).toBeInTheDocument();
    });

    describe('steps', () => {
      let steps: HTMLElement[];
      beforeEach(() => {
        const list = screen.getByRole('list', { name: 'Onboarding steps' });
        steps = getAllByRole(list, 'listitem');
      });

      it('has 4 steps', () => {
        expect(steps).toHaveLength(4);
      });

      it.each([
        ['Start developing', 1],
        ['Request production access', 2],
        ['Prepare for and complete a demo', 3],
        ['Receive production access', 4],
      ])('includes the "%s" step (step %d)', (stepName: string, stepNumber: number) => {
        expect(steps[stepNumber - 1]).toBeInTheDocument();

        const firstChild = steps[stepNumber - 1].children[0];
        expect(firstChild.tagName).toBe('STRONG');
        expect(firstChild).toHaveTextContent(stepName);
      });
    });
  });
});
