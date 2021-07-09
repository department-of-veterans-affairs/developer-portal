import { render, screen } from '@testing-library/react';
import React from 'react';
import WorkingWithOurAPIs from './WorkingWithOurAPIs';

describe('WorkingWithOurAPIs', () => {
  beforeEach(() => {
    render(<WorkingWithOurAPIs />);
  });
  it('renders the main heading', () => {
    const heading = screen.getByRole('heading', { level: 1, name: 'Working with Lighthouse APIs' });
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
  it('renders all accordions in a closed state', () => {
    const buttons = screen.getAllByRole('button');
    buttons.forEach(button => {
      expect(button.getAttribute('aria-expanded')).toBe('false');
    });
  });
});
