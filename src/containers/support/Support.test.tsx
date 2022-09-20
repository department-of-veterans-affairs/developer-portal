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
    const linkFAQ = screen.getByRole('link', { name: 'FAQs' });
    const linkContactUs = screen.getByRole('link', { name: 'Developer portal support form' });
    expect(linkFAQ).toBeInTheDocument();
    expect(linkContactUs).toBeInTheDocument();
  });
});
