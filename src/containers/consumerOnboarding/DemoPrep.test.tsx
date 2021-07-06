import { render, screen } from '@testing-library/react';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import DemoPrep from './DemoPrep';

describe('DemoPrep', () => {
  beforeEach(() => {
    render(
      <Router>
        <DemoPrep />
      </Router>
    );
  });

  it('renders the main heading', () => {
    const heading = screen.getByRole('heading', {
      level: 1,
      name: 'Prepare for and complete a demo',
    });
    expect(heading).toBeInTheDocument();
  });

  it.each([
    'We may also discuss API-specific needs or topics, depending on which API you’re using.',
    'Post-demo tasks',
  ])('renders the "%s" subheading as an h2', (headingText: string) => {
    const heading = screen.getByRole('heading', {
      level: 2,
      name: headingText,
    });
    expect(heading).toBeInTheDocument();
  });

  it.each([
    'Benefits Intake',
    'Health',
    'Veteran Verification',
    'Appeals (internal VA only)',
    'Loan Guaranty (internal VA only)',
    'Address Validation (internal VA only)',
  ])('renders the "%s" subheading as an h3', (api: string) => {
    const heading = screen.getByRole('heading', {
      level: 3,
      name: api,
    });
    expect(heading).toBeInTheDocument();
  });
});
