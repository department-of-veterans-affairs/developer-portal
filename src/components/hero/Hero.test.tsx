import * as React from 'react';
import 'jest';
import '@testing-library/jest-dom/extend-expect';
import {  render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import * as logoImage from '../../__mocks__/fakeImage';
import { Hero } from './Hero';

describe('Hero', () => {
  it('checks image source', () => {
    render(<Router><Hero /></Router>);
    const heroImage = screen.getByRole('presentation');

    expect(heroImage).toBeInTheDocument();
    expect(heroImage).toHaveAttribute('src', (logoImage.default));
  });
});
