import { render } from '@testing-library/react';
import { screen } from 'shadow-dom-testing-library';
import { MemoryRouter } from 'react-router-dom';
import * as React from 'react';
import 'jest';
import { ApiAlerts } from './ApiAlerts';

describe('ApiAlerts', () => {
  it('should render api alerts', async () => {
    const { container } = render(
      <MemoryRouter initialEntries={['/explore/api/va-facilities']}>
        <ApiAlerts />
      </MemoryRouter>,
    );
    const alert = container.querySelector('va-alert');
    expect(alert).toBeInTheDocument();
    expect(await screen.findByShadowText(/VA Facilities API/)).toBeInTheDocument();
  });

  it('should not render api alert', () => {
    const { container } = render(
      <MemoryRouter initialEntries={['/']}>
        <ApiAlerts />
      </MemoryRouter>,
    );

    const alert = container.querySelector('va-alert');
    expect(alert).not.toBeInTheDocument();
  });
});
