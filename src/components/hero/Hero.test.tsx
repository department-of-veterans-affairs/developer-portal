import * as React from 'react';
import 'jest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { FlagsProvider, getFlags } from '../../flags';
import * as logoImage from '../../__mocks__/fakeImage';
import { Hero } from './Hero';

const flags = { ...getFlags(), api_publishing: true };

describe('Hero', () => {
  beforeEach(() => {
    render(
      <FlagsProvider flags={flags}>
        <Router>
          <Hero />
        </Router>
      </FlagsProvider>,
    );
  });

  it('checks image source', () => {
    const heroImage = screen.getByRole('presentation');
    expect(heroImage).toBeInTheDocument();
    expect(heroImage).toHaveAttribute('src', logoImage.default);
  });

  it('contains a link to documentation', () => {
    const apiLink = screen.getByRole('link', { name: 'Read the Docs' });
    expect(apiLink).toBeInTheDocument();
    expect(apiLink).toHaveAttribute('href', '/explore');
  });

  it('contains a link to API Publishing', () => {
    const apiLink = screen.getByRole('link', { name: 'API Publishing' });
    expect(apiLink).toBeInTheDocument();
    expect(apiLink).toHaveAttribute('href', '/api-publishing');
  });

  it('checks h1 text', () => {
    const desiredText = 'A Veteran-centered API platform for securely accessing VA data.';
    const heroText = screen.getByText(desiredText);
    expect(heroText).toBeInTheDocument();
    expect(heroText).toHaveClass(
      'vads-u-color--white',
      'vads-u-font-size--h2',
      'small-desktop-screen:vads-u-font-size--h1',
    );
  });
});
