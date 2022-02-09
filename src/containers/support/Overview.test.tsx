import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import SupportOverview from './Overview';
import { sections } from './Support';

describe('SupportFAQ', () => {
  it('Page renders as expected', () => {
    render(
      <Router>
        <SupportOverview sections={sections} />
      </Router>,
    );
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveTextContent('Support');
  });
});
