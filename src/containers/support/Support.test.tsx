import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import SupportOverview from './Overview';
import { sections } from './Support';

describe('SupportFAQ', () => {
  it('Page renders as expected', () => {
    render(
      <MemoryRouter initialEntries={['/support']}>
        <SupportOverview sections={sections} />
      </MemoryRouter>,
    );
    const linkFAQ = screen.getByRole('link', { name: 'FAQ' });
    const linkContactUs = screen.getByRole('link', { name: 'Contact Us' });
    expect(linkFAQ).toBeInTheDocument();
    expect(linkContactUs).toBeInTheDocument();
  });
});
