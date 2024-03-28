import React from 'react';
import { getAllByRole, getByRole, render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { userEvent } from '@testing-library/user-event';
import { Provider } from 'react-redux';
import store from '../../store';
import { Publishing } from './Publishing';
import { PublishingIntroduction } from './components/publishingIntroduction';
import { PublishingOnboarding } from './components/publishingOnboarding';

describe('Publishing', () => {
  beforeEach(() => {
    const router = createMemoryRouter(
      [
        {
          children: [
            {
              element: <PublishingIntroduction />,
              index: true,
            },
            {
              element: <PublishingOnboarding />,
              path: 'process',
            },
          ],
          element: <Publishing />,
          path: '/api-publishing',
        },
      ],
      { initialEntries: ['/api-publishing'] },
    );
    render(
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>,
    );
  });

  it('renders the introduction page initially', () => {
    const header = screen.getByRole('heading', { name: 'Publishing your API' });
    expect(header).toBeInTheDocument();
  });

  it('side nav contains expected entries', () => {
    const sideNav = screen.getByRole('navigation', { name: 'API Publishing Side' });
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
        await userEvent.click(navLink);

        const newHeader = await screen.findByRole('heading', { name: 'How publishing works' });
        expect(newHeader).toBeInTheDocument();
      });
    });
  });

  it('Modal is opened on click', () => {
    const sideNavLink = screen.getByRole('button', { name: 'Requirements for APIs' });
    expect(sideNavLink).toBeInTheDocument();
    sideNavLink.click();
    setTimeout(() => {
      expect(screen.findByText('It looks like')).toBeInTheDocument();
    }, 3000);
  });
});
