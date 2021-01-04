import { render, screen } from '@testing-library/react';
import 'jest';
import * as React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { AuthorizationCard } from '..';

describe('Authorization Card', () => {
  it('should render default link', () => {
    render(
      <MemoryRouter>
        <AuthorizationCard />
      </MemoryRouter>,
    );
    const cardLink = screen.getByRole('link');
    expect(cardLink).toHaveAttribute('href', '/explore/authorization');
  });

  it('should render link based on passed categoryKey', () => {
    render(
      <MemoryRouter>
        <AuthorizationCard categoryKey="test" />
      </MemoryRouter>,
    );
    const cardLink = screen.getByRole('link');
    expect(cardLink).toHaveAttribute('href', '/explore/test/docs/authorization');
  });

  it('should render correct text content', () => {
    render(
      <MemoryRouter>
        <AuthorizationCard />
      </MemoryRouter>,
    );
    const elementContainingContent = screen.getByText(
      'Use the OpenID Connect standard to allow Veterans to authorize third-party application to access data on their behalf.',
    );
    expect(elementContainingContent).toBeDefined();
  });
});
