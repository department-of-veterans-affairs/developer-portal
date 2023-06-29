import * as React from 'react';
import 'jest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import * as logoImage from '../../__mocks__/fakeImage';
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

  it('checks h1 text', () => {
    const desiredText = 'Access VA APIs to build tools that best serve Veterans';
    const heroText = screen.getByText(desiredText);
    expect(heroText).toBeInTheDocument();
    expect(heroText).toHaveClass(
      'vads-u-color--white',
      'vads-u-font-size--h2',
      'small-desktop-screen:vads-u-font-size--h1',
      'vads-u-margin-top--1',
      'medium-screen:vads-u-margin-top--4',
    );
  });
});
