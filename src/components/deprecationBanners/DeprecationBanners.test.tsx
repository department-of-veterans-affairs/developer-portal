import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import * as React from 'react';
import 'jest';
import { DeprecationBanners } from './DeprecationBanners';

describe('DeprecationBanners', () => {
  it('should render deprecation banners', () => {
    render(
      <MemoryRouter initialEntries={['/explore/api/va-facilities']}>
        <DeprecationBanners />
      </MemoryRouter>,
    );
    expect(screen.queryByText(/VA Facilities API/)).toBeInTheDocument();
  });
});
