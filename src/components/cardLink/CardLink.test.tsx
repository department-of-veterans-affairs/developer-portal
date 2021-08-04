import { render, screen } from '@testing-library/react';
import 'jest';
import * as React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { CardLink } from './CardLink';

describe('CardLink', () => {
  it('renders the name', () => {
    render(
      <Router>
        <CardLink name="Special API" url="/special" callToAction="View Special API">
          Use this to manage something!
        </CardLink>
      </Router>,
    );

    const titleLink = screen.getByRole('link', { name: 'Special API' });
    expect(titleLink).toBeInTheDocument();
  });

  it('renders the description', () => {
    render(
      <Router>
        <CardLink name="Special API" url="/special" callToAction="View Special API">
          Use this to manage something!
        </CardLink>
      </Router>,
    );

    const cardDescription = screen.getByText('Use this to manage something!');
    expect(cardDescription).toBeInTheDocument();
  });

  it('renders the subhead between the name and description', () => {
    render(
      <Router>
        <CardLink
          name="Special API"
          subhead={<div>Test subhead</div>}
          url="/special"
          callToAction="View Special API"
        >
          Use this to manage something!
        </CardLink>
      </Router>,
    );

    const link = screen.getByRole('link', { name: 'Special API' }).parentElement;

    expect(link).toBeInTheDocument();
    expect(link?.childElementCount).toBe(5);

    expect(link?.children[1]).toHaveTextContent('Special API');
    expect(link?.children[2]).toHaveTextContent('Test subhead');
    expect(link?.children[3]).toHaveTextContent('Use this to manage something!');
  });
});
