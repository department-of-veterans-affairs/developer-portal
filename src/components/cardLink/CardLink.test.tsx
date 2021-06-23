import { render, screen } from '@testing-library/react';
import 'jest';
import * as React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { CardLink } from './CardLink';

describe('CardLink', () => {
  it('renders the name', () => {
    render(
      <Router>
        <CardLink name="Special API" url="/special" linkText="View Special API">
          Use this to manage something!
        </CardLink>
      </Router>,
    );

    const link = screen.getByRole('link', { name: 'View Special API' });
    expect(link).toBeInTheDocument();
    expect(link.parentElement).toHaveTextContent('Special API');
  });

  it('renders the description', () => {
    render(
      <Router>
        <CardLink name="Special API" url="/special" linkText="View Special API">
          Use this to manage something!
        </CardLink>
      </Router>,
    );

    const link = screen.getByRole('link', { name: 'View Special API' });
    expect(link).toBeInTheDocument();
    expect(link.parentElement?.children[2]).toHaveTextContent('Use this to manage something!');
  });

  it('renders the subhead between the name and description', () => {
    render(
      <Router>
        <CardLink
          name="Special API"
          subhead={<div>Test subhead</div>}
          url="/special"
          linkText="View Special API"
        >
          Use this to manage something!
        </CardLink>
      </Router>,
    );

    const link = screen.getByRole('link', { name: 'View Special API' });
    expect(link).toBeInTheDocument();
    expect(link.parentElement?.childElementCount).toBe(5);

    expect(link.parentElement?.children[1]).toHaveTextContent('Special API');
    expect(link.parentElement?.children[2]).toHaveTextContent('Test subhead');
    expect(link.parentElement?.children[3]).toHaveTextContent('Use this to manage something!');
  });
});
