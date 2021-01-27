import React from 'react';
import { getAllByRole, getByRole, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { Publishing } from './Publishing';

describe('Publishing', () => {
  beforeEach(() => {
    render(
      <MemoryRouter initialEntries={['/api-publishing']}>
        <Publishing />
      </MemoryRouter>,
    );
  });

  it('renders successfully', () => {
    const header = screen.getByRole('heading', { name: 'Publishing your API on Lighthouse' });
    expect(header).toBeInTheDocument();
  });

  it('side nav contains expected entries', () => {
    const sideNav = screen.getByRole('navigation', { name: 'API Publishing Side Nav' });
    const navLinks = getAllByRole(sideNav, 'link');
    expect(navLinks.length).toEqual(4);

    const publishingLink = getByRole(sideNav, 'link', { name: 'API Publishing' });
    expect(publishingLink).toHaveAttribute('href', '/api-publishing');

    const onBoardingLink = getByRole(sideNav, 'link', { name: 'How onboarding works' });
    expect(onBoardingLink).toHaveAttribute('href', '/api-publishing/process');

    const expectationsLink = getByRole(sideNav, 'link', { name: 'Expectations for APIs' });
    expect(expectationsLink).toHaveAttribute('href', '/api-publishing/expectations');

    const contactUsLink = getByRole(sideNav, 'link', { name: 'Contact Us' });
    expect(contactUsLink).toHaveAttribute('href', '/support/contact-us');
  });
});
