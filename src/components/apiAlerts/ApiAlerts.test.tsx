import * as React from 'react';
import { render } from '@testing-library/react';
import { screen } from 'shadow-dom-testing-library';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import 'jest';
import { ApiAlerts } from './ApiAlerts';

describe('ApiAlerts', () => {
  it('should render api alerts', async () => {
    const { container } = render(
      <MemoryRouter initialEntries={['/explore/api/va-facilities']}>
        <Routes>
          <Route path="/explore/api/:urlSlug" element={<ApiAlerts />} />
        </Routes>
      </MemoryRouter>,
    );
    const alert = container.querySelector('va-alert');
    expect(alert).toBeInTheDocument();
    expect(await screen.findByShadowText(/VA Facilities API/)).toBeInTheDocument();
  });

  it('should not render api alert', () => {
    const { container } = render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<ApiAlerts />} />
        </Routes>
      </MemoryRouter>,
    );

    const alert = container.querySelector('va-alert');
    expect(alert).not.toBeInTheDocument();
  });
});
