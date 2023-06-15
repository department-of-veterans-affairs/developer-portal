import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import * as React from 'react';
import 'jest';
import { BreadCrumbs } from './BreadCrumbs';

describe('BreadCrumbs', () => {
  it('should render breadcrumbs', () => {
    render(
      <Router>
        <BreadCrumbs>
          <Link to="/">Home</Link>
        </BreadCrumbs>
      </Router>,
    );
    expect(screen.getByText(/Home/)).toBeInTheDocument();
  });

  it('should set aria-current page to last breadcrumb', () => {
    render(
      <Router>
        <BreadCrumbs>
          <Link to="/">Home</Link>
          <Link to="/explore">Explore APIs</Link>
          <Link to="/explore/api/appeals-status">Appeals Status API</Link>
        </BreadCrumbs>
      </Router>,
    );
    const lastBreadcrumb = screen.getByText(/Appeals Status API/);
    expect(lastBreadcrumb.getAttribute('aria-current')).toBe('page');
  });

  it('should display 2 links', () => {
    render(
      <Router>
        <BreadCrumbs>
          <Link to="/">Home</Link>
          <Link to="/explore">Explore APIs</Link>
          random text here
        </BreadCrumbs>
      </Router>,
    );

    const anchorTags = screen.getAllByRole('link');
    expect(anchorTags.length).toBe(2);
  });

  it('uses provided label for nav', () => {
    render(
      <Router>
        <BreadCrumbs label="Appeals Status API breadcrumbs">
          <Link to="/">Home</Link>
          <Link to="/explore">Explore APIs</Link>
          <Link to="/explore/api/appeals-status">Appeals Status API</Link>
        </BreadCrumbs>
      </Router>,
    );
    expect(screen.getByLabelText(/Appeals Status API breadcrumbs/)).toBeInTheDocument();
  });
});
