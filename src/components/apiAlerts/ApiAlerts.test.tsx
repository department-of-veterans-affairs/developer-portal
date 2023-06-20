import { render } from '@testing-library/react';
import { screen } from 'shadow-dom-testing-library';
import { MemoryRouter } from 'react-router-dom';
import * as React from 'react';
import 'jest';
import { ApiAlerts } from './ApiAlerts';

describe('ApiAlerts', () => {
  it('should render api alerts', async () => {
    render(
      <MemoryRouter initialEntries={['/explore/api/va-facilities']}>
        <ApiAlerts />
      </MemoryRouter>,
    );
    expect(await screen.findByShadowText(/VA Facilities API/)).toBeInTheDocument();
  });
});
