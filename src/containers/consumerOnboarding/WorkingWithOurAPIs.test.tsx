import { render, screen } from '@testing-library/react';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import WorkingWithOurAPIs from './WorkingWithOurAPIs';

describe('WorkingWithOurAPIs', () => {
  beforeEach(() => {
    render(
      <Router>
        <WorkingWithOurAPIs />
      </Router>,
    );
  });
  it('renders the main heading', () => {
    const heading = screen.getByRole('heading', { level: 1, name: 'Working with VA APIs' });
    expect(heading).toBeInTheDocument();
  });

  it.each([
    'Versioning',
    'Deprecation and deactivation',
    'Rate limiting',
    'Environments',
    'Status alerts, uptime, and issue reporting',
    'Support',
    'Managing feature requests',
    'Auditing process and guidelines',
    'Security',
    'API Documentation Standards',
    'Authentication and authorization',
  ])('renders the "%s" heading', (headingText: string) => {
    const heading = screen.getByRole('heading', { level: 2, name: headingText });
    expect(heading).toBeInTheDocument();
  });
});
