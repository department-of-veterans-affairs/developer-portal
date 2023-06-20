import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import * as React from 'react';
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
        <ApiBreadcrumbs api={api} />
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
        <ApiBreadcrumbs api={api} />
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
        <ApiBreadcrumbs api={api} />
      </MemoryRouter>,
    );
    expect(screen.getByText(/Release Notes/)).toBeInTheDocument();
  });
});
