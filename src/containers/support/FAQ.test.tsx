import { render, screen } from '@testing-library/react';
import * as React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import SupportFAQ from './FAQ';

describe('SupportFAQ', () => {
  it('Page renders as expected', () => {
    render(
      <Router>
        <SupportFAQ />
      </Router>,
    );
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveTextContent('FAQ');
  });
});
