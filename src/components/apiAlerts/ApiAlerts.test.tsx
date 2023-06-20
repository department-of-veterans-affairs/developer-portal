import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import * as React from 'react';
import 'jest';
import { ApiAlerts } from './ApiAlerts';

describe('ApiAlerts', () => {
  it('should render api alerts', () => {
    render(
      <MemoryRouter initialEntries={['/explore/api/va-facilities']}>
        <ApiAlerts />
      </MemoryRouter>,
    );
    expect(screen.queryByText(/VA Facilities API/)).toBeInTheDocument();
  });
});
