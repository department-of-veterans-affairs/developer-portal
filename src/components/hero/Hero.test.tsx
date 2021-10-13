import * as React from 'react';
import 'jest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import * as logoImage from '../../__mocks__/fakeImage';
import { CONSUMER_SANDBOX_PATH } from '../../types/constants/paths';
import { Hero } from './Hero';

describe('Hero', () => {
  beforeEach(() => {
    render(
      <Router>
        <Hero />
      </Router>,
    );
  });

  it('checks image source', () => {
    const heroImage = screen.getByRole('presentation');
    expect(heroImage).toBeInTheDocument();
    expect(heroImage).toHaveAttribute('src', logoImage.default);
  });

  it('contains a link to apply page', () => {
    const apiLink = screen.getByRole('link', { name: 'Request an API Key' });
    expect(apiLink).toBeInTheDocument();
    expect(apiLink).toHaveAttribute('href', CONSUMER_SANDBOX_PATH);
  });

  it('checks h1 text', () => {
    const desiredText = 'A Veteran-centered API platform for securely accessing VA data';
    const heroText = screen.getByText(desiredText);
    expect(heroText).toBeInTheDocument();
    expect(heroText).toHaveClass(
      'vads-u-color--white',
      'vads-u-font-size--h2',
      'small-desktop-screen:vads-u-font-size--h1',
    );
  });
});
