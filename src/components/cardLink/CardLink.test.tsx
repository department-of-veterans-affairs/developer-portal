import { render, screen, getByRole } from '@testing-library/react';
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

    const cardHeading = screen.getByRole('heading', { name: 'Special API' });
    expect(cardHeading).toBeInTheDocument();
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

  it('link is rendered', () => {
    render(
      <Router>
        <CardLink name="Special API" url="/special" callToAction="View Special API">
          Use this to manage something!
        </CardLink>
      </Router>,
    );
    const cardHeading = screen.getByRole('heading', { name: 'Special API' });
    const link = getByRole(cardHeading, 'link', { name: 'Special API' });
    expect(link).toBeInTheDocument();
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

    const card = screen.getByRole('heading', { name: 'Special API' }).parentElement;

    expect(card).toBeInTheDocument();
    expect(card?.childElementCount).toBe(5);

    expect(card?.children[1]).toHaveTextContent('Special API');
    expect(card?.children[2]).toHaveTextContent('Test subhead');
    expect(card?.children[3]).toHaveTextContent('Use this to manage something!');
  });
  it('correct heading level rendered', () => {
    render(
      <Router>
        <CardLink name="Special API" url="/special" callToAction="View Special API" level={1}>
          Use this to manage something!
        </CardLink>
      </Router>,
    );

    const cardHeading = screen.getByRole('heading', { level: 1, name: 'Special API' });
    expect(cardHeading).toBeInTheDocument();
  });
});
