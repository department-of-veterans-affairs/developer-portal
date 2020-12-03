import { render, screen } from '@testing-library/react';
import 'jest';
import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthorizationCard } from '..';

const renderAuthorizationCard = (categoryKey?: string): void => {
  render(
    <BrowserRouter>
      { categoryKey && <AuthorizationCard categoryKey={categoryKey} />}
      { !categoryKey && <AuthorizationCard />}
    </BrowserRouter>
  );
};

describe('Authorization Card', () => {
  it('should render default link', () => {
    renderAuthorizationCard();
    const cardLink = screen.getByRole('link');
    expect(cardLink).toBeDefined();
    expect((cardLink as HTMLLinkElement).href).toBe(
      'http://localhost:4444/explore/authorization'
    );
  });

  it('should render link based on passed categoryKey', () => {
    renderAuthorizationCard('testCategory');
    const cardLink = screen.getByRole('link');
    expect(cardLink).toBeDefined();
    expect((cardLink as HTMLLinkElement).href).toBe(
      'http://localhost:4444/explore/testCategory/docs/authorization'
    );
  });
});
