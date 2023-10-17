import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import 'jest';
import * as React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import { MainNavItem } from './MainNavItem';

const mockProps = {
  className: 'mock',
  largeScreenProps: {
    isActive: (): boolean => false,
    onMouseEnter: jest.fn(),
    onMouseLeave: jest.fn(),
  },
  onClick: jest.fn(),
  targetUrl: '/mock',
};

describe('MainNavItem', () => {
  it('should render the MainNavItem', () => {
    render(
      <Router>
        <MainNavItem {...mockProps}>Mock</MainNavItem>
      </Router>,
    );
    const links = screen.getAllByRole('link', { name: 'Mock' });

    // technically separate links for desktop and mobile
    expect(links).toHaveLength(2);
    links.forEach(link => {
      expect(link.getAttribute('href')).toBe('/mock');
    });
  });

  it('if mobile, should call the onClick prop when its NavLink child has been been clicked', async () => {
    // this test is applicable only to mobile
    render(
      <Router>
        <MainNavItem excludeLargeScreen {...mockProps}>
          Mock
        </MainNavItem>
      </Router>,
    );

    // only one link since we excluded the desktop link
    const link = screen.getByRole('link', { name: 'Mock' });
    await userEvent.click(link);
    expect(mockProps.onClick).toHaveBeenCalled();
  });
});
