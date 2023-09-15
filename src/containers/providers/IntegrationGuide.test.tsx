import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../../store';
import IntegrationGuide from './IntegrationGuide';

describe('IntegrationGuide', () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/providers/integration-guide']}>
          <IntegrationGuide />
        </MemoryRouter>
      </Provider>,
    );
  });

  it('renders the introduction page initially', () => {
    const header = screen.getByRole('heading', {
      name: 'Lighthouse API Provider Integration Guide',
    });
    expect(header).toBeInTheDocument();
  });
});
