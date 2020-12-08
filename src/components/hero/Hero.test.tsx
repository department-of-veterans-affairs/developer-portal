import * as React from 'react';
import 'jest';
import '@testing-library/jest-dom/extend-expect';
import {  render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import * as logoImage from '../../__mocks__/fakeImage';
import { Hero } from './Hero';

describe('Hero', () => {
  it('checks image source', () => {
    const { queryByRole } = render(<Router><Hero  /></Router>);
    const heroImage = queryByRole('presentation');

    expect(heroImage).toBeInTheDocument();
    expect(heroImage).toHaveAttribute('src', (logoImage.default));
  });
});
