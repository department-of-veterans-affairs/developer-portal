import React from 'react';
import { getAllByRole, getByRole, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import store from '../../store';
import { Publishing } from './Publishing';

describe('Publishing', () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/api-publishing']}>
          <Publishing />
        </MemoryRouter>
      </Provider>,
    );
  });

  it('renders the introduction page initially', () => {
    const header = screen.getByRole('heading', { name: 'Publishing your API on Lighthouse' });
    expect(header).toBeInTheDocument();
  });

  it('side nav contains expected entries', () => {
    const sideNav = screen.getByRole('navigation', { name: 'API Publishing Side Nav' });
    const navLinks = getAllByRole(sideNav, 'link');
    expect(navLinks.length).toEqual(3);

    const publishingLink = getByRole(sideNav, 'link', { name: 'Overview' });
    expect(publishingLink).toHaveAttribute('href', '/api-publishing');

    const onBoardingLink = getByRole(sideNav, 'link', { name: 'How publishing works' });
    expect(onBoardingLink).toHaveAttribute('href', '/api-publishing/process');

    const expectationsLink = getByRole(sideNav, 'button', { name: 'Requirements for APIs' });
    expect(expectationsLink).toBeInTheDocument();

    const contactUsLink = getByRole(sideNav, 'link', { name: 'Contact Us' });
    expect(contactUsLink).toHaveAttribute('href', '/support/contact-us?type=publishing');
  });

  describe('using sidenav', () => {
    describe('clicking How publishing works link', () => {
      it('shows the how publishing works page', async () => {
        expect(
          screen.queryByRole('heading', { name: 'How publishing works' }),
        ).not.toBeInTheDocument();
        const navLink = screen.getByRole('link', { name: 'How publishing works' });
        userEvent.click(navLink);

        const newHeader = await screen.findByRole('heading', { name: 'How publishing works' });
        expect(newHeader).toBeInTheDocument();
      });
    });
  });
});
