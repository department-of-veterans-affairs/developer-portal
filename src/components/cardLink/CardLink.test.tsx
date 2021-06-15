import { render, screen } from '@testing-library/react';
import 'jest';
import * as React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { CardLink } from './CardLink';

describe('CardLink', () => {
  it('renders the name', () => {
    render(
      <Router>
        <CardLink name="Special API" url="/special">
          Use this to manage something!
        </CardLink>
      </Router>,
    );

    const link = screen.getByRole('link', { name: /^Special API/ });
    expect(link).toBeInTheDocument();
    expect(link.firstElementChild).toHaveTextContent('Special API');
  });

  it('renders the description', () => {
    render(
      <Router>
        <CardLink name="Special API" url="/special">
          Use this to manage something!
        </CardLink>
      </Router>,
    );

    const link = screen.getByRole('link', { name: /^Special API/ });
    expect(link).toBeInTheDocument();
    expect(link.firstElementChild?.nextElementSibling).toHaveTextContent(
      'Use this to manage something!'
    );
  });

  it('renders the subhead between the name and description', () => {
    render(
      <Router>
        <CardLink name="Special API" subhead={<div>Test subhead</div>} url="/special">
          Use this to manage something!
        </CardLink>
      </Router>,
    );

    const link = screen.getByRole('link', { name: /^Special API/ });
    expect(link).toBeInTheDocument();
    expect(link.childElementCount).toBe(3);

    expect(link.children[0]).toHaveTextContent('Special API');
    expect(link.children[1]).toHaveTextContent('Test subhead');
    expect(link.children[2]).toHaveTextContent('Use this to manage something!');
  });
});
