import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import 'jest';
import * as React from 'react';
import { MemoryRouter } from 'react-router-dom';
import * as Stickyfill from 'stickyfilljs';
import { SideNav } from './SideNav';

jest.mock('stickyfilljs', () => ({
  addOne: jest.fn(),
}));

describe('Authorization Card', () => {
  const ariaLabel = 'navigation';
  const customClass = 'custom-class';

  const getNavItems = (): JSX.Element => (
    <>
      <li data-testid="item1">item one</li>
      <li data-testid="item2">item two</li>
      <li data-testid="item3">item three</li>
    </>
  );

  it('checks props are properly reflected and skip to content link is present.', () => {
    render(
      <MemoryRouter>
        <SideNav ariaLabel={ariaLabel} className={customClass}>
          {getNavItems()}
        </SideNav>
      </MemoryRouter>,
    );

    const skipContentLink = screen.queryByText('Skip Page Navigation');
    expect(skipContentLink).toBeInTheDocument();
    expect(skipContentLink).toHaveAttribute('href', '/#page-header');

    const navigation = screen.queryByRole('navigation');
    expect(navigation?.className).toContain('custom-class');
    expect(navigation).toBeInTheDocument();
    expect(navigation).toHaveAttribute('aria-label', ariaLabel);

    expect(screen.getByTestId('item1')).toBeInTheDocument();
    expect(screen.getByTestId('item2')).toBeInTheDocument();
    expect(screen.getByTestId('item3')).toBeInTheDocument();
  });

  it('checks stickyfilljs library is properly setup.', () => {
    render(
      <MemoryRouter>
        <SideNav ariaLabel={ariaLabel} className={customClass}>
          {getNavItems()}
        </SideNav>
      </MemoryRouter>,
    );

    expect(Stickyfill.addOne).toHaveBeenCalled();
  });

  /*
   * it('checks stickyfilljs library is properly setup.', () => {
   *const useRefSpy =  jest.spyOn(React, 'useRef').mockReturnValue({ current: undefined });
   *render(
   *  <MemoryRouter>
   *    <SideNav ariaLabel={ariaLabel} className={customClass}>
   *      {getNavItems()}
   *    </SideNav>
   *  </MemoryRouter>,
   *);
   *
   *expect(Stickyfill.addOne).not.toHaveBeenCalled();
   *useRefSpy.mockRestore();
   *});
   */
});
