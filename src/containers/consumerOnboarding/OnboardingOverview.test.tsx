import { getAllByRole, getByRole, render, screen } from '@testing-library/react';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import {
  CONSUMER_APIS_PATH,
  CONSUMER_DEMO_PATH,
  CONSUMER_PROD_PATH,
} from '../../types/constants/paths';
import OnboardingOverview from './OnboardingOverview';

describe('OnboardingOverview', () => {
  beforeEach(() => {
    render(
      <Router>
        <OnboardingOverview />
      </Router>,
    );
  });

  it('renders the main heading', () => {
    const heading = screen.getByRole('heading', { level: 1, name: 'API Consumer Onboarding' });
    expect(heading).toBeInTheDocument();
  });

  it.each(['Onboarding steps', 'Onboarding timeline', 'About us'])(
    'renders the "%s" heading',
    (headingText: string) => {
      const heading = screen.getByRole('heading', { level: 2, name: headingText });
      expect(heading).toBeInTheDocument();
    },
  );

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

      describe.each([
        ['Request production access', 2, CONSUMER_PROD_PATH],
        ['Prepare for and complete a demo', 3, CONSUMER_DEMO_PATH],
        ['Receive production access', 4, CONSUMER_APIS_PATH],
      ])(
        'includes the "%s" step (step %d)',
        (stepName: string, stepNumber: number, linkURL: string) => {
          it('with the appropriate step name/title', () => {
            expect(steps[stepNumber - 1]).toBeInTheDocument();

            const firstChild = steps[stepNumber - 1].children[0];
            expect(firstChild.tagName).toBe('STRONG');
            expect(firstChild).toHaveTextContent(stepName);
          });

          it('with the appropriate link to the related page', () => {
            const link = getByRole(steps[stepNumber - 1], 'link');
            expect(link).toBeInTheDocument();
            expect(link.getAttribute('href')).toBe(linkURL);
          });
        },
      );
    });
  });
});
