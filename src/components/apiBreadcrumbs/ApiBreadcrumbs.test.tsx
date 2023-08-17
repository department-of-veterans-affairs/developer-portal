import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import 'jest';
import { APIDescription } from '../../apiDefs/schema';
import { ApiBreadcrumbs } from './ApiBreadcrumbs';

describe('APIBreadcrumbs', () => {
  it('should render breadcrumbs', () => {
    const api = {
      name: 'Appeals Status API',
      urlSlug: 'appeals-status',
    } as APIDescription;
    render(
      <MemoryRouter initialEntries={['/explore/api/appeals-status']}>
        <Routes>
          <Route path="/explore/api/:urlSlug" element={<ApiBreadcrumbs api={api} />} />
        </Routes>
      </MemoryRouter>,
    );
    expect(screen.getByText(/Appeals Status API/)).toBeInTheDocument();
  });

  it('should not render breadcrumbs', () => {
    const api = {
      name: 'Appeals Status API',
      urlSlug: 'appeals-status',
    } as APIDescription;
    render(
      <MemoryRouter initialEntries={['/about']}>
        <Routes>
          <Route path="/about" element={<ApiBreadcrumbs api={api} />} />
        </Routes>
      </MemoryRouter>,
    );
    expect(screen.queryByText(/Appeals Status API/)).not.toBeInTheDocument();
  });

  it('should render release notes breadcrumb', () => {
    const api = {
      name: 'Appeals Status API',
      urlSlug: 'appeals-status',
    } as APIDescription;
    render(
      <MemoryRouter initialEntries={['/explore/api/appeals-status/release-notes']}>
        <Routes>
          <Route
            path="/explore/api/:urlSlug/release-notes"
            element={<ApiBreadcrumbs api={api} />}
          />
        </Routes>
      </MemoryRouter>,
    );
    expect(screen.getByText(/Release Notes/)).toBeInTheDocument();
  });

  it('should use localStorage exploreApisPath item as the value for Explore APIs path', () => {
    localStorage.setItem('exploreApisPath', '/explore/va-benefits');
    const api = {
      name: 'Appeals Status API',
      urlSlug: 'appeals-status',
    } as APIDescription;
    render(
      <MemoryRouter initialEntries={['/explore/api/appeals-status']}>
        <Routes>
          <Route path="/explore/api/:urlSlug" element={<ApiBreadcrumbs api={api} />} />
        </Routes>
      </MemoryRouter>,
    );
    expect(screen.getByText(/Explore APIs/)).toHaveAttribute('href', '/explore/va-benefits');
    localStorage.clear();
  });
});
