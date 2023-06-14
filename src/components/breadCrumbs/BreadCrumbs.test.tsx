import { render, screen } from '@testing-library/react';
import { Link } from 'react-router-dom';
import * as React from 'react';
import 'jest';
import { BreadCrumbs } from './BreadCrumbs';

describe('BreadCrumbs', () => {
  it('should render breadcrumbs', () => {
    render(
      <BreadCrumbs>
        <Link to="/">Home</Link>
      </BreadCrumbs>,
    );

    expect(screen.getByText(/Home/)).toBeInTheDocument();
  });
});
