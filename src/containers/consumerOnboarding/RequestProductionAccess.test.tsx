import { render, screen } from '@testing-library/react';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import RequestProductionAccess from './RequestProductionAccess';

describe('RequestProductionAccess', () => {
  beforeEach(() => {
    render(
      <Router>
        <RequestProductionAccess />
      </Router>,
    );
  });

  it('renders the main heading', () => {
    const heading = screen.getByRole('heading', {
      level: 1,
      name: 'Request production access',
    });
    expect(heading).toBeInTheDocument();
  });

  it('renders the h2 subheading', () => {
    const heading = screen.getByRole('heading', {
      level: 2,
      name: "Learn what's needed on the form",
    });
    expect(heading).toBeInTheDocument();
  });
});
