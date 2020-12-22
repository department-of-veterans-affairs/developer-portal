import * as React from 'react';
import 'jest';
import {  render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import * as logoImage from '../../__mocks__/fakeImage';
import { Hero } from './Hero';

describe('Hero', () => {
  it('checks image source', () => {
    render(
      <Router>
        <Hero />
      </Router>
    );

    const heroImage = screen.getByRole('presentation');
    expect(heroImage).toBeInTheDocument();
    expect(heroImage).toHaveAttribute('src', (logoImage.default));
  });

  it('checks api key url', () => {
    render(
      <Router>
        <Hero />
      </Router>
    );

    const apiLink = screen.getByText('Request an API Key');
    expect(apiLink).toBeInTheDocument();
    expect(apiLink).toHaveAttribute('href', ('/apply'));
  });

  it('checks h1 text', () => {
    render(
      <Router>
        <Hero />
      </Router>
    );

    const desiredText = 'A Veteran-centered API platform for securely accessing VA data.';
    const heroText = screen.getByText(desiredText);
    expect(heroText).toBeInTheDocument();
    expect(heroText).toHaveClass('vads-u-color--white',
      'vads-u-font-size--h2',
      'small-desktop-screen:vads-u-font-size--h1');
  });
});
