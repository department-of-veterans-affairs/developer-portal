import React, { FC } from 'react';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';
import { desktopOnly, mobileOnly } from '../../styles/vadsUtils';

interface MainNavItemProps {
  activeClassName?: string;
  className?: string;
  excludeLargeScreen?: boolean;
  excludeSmallScreen?: boolean;
  targetUrl: string;
  onClick?: () => void;
}

const MainNavItem: FC<MainNavItemProps> = (props): JSX.Element => {
  const {
    activeClassName = '',
    className = '',
    onClick = undefined,
    targetUrl,
    excludeLargeScreen = false,
    excludeSmallScreen = false,
    children,
  } = props;

  return (
    <>
      {!excludeLargeScreen && (
        <div className={desktopOnly()}>
          <NavLink
            className={({ isActive }): string =>
              classNames('va-api-nav-link', className, {
                [activeClassName]: isActive,
                'va-api-active-nav': isActive,
              })
            }
            to={targetUrl}
          >
            {children}
          </NavLink>
        </div>
      )}
      {!excludeSmallScreen && (
        <div className={mobileOnly()}>
          <NavLink
            onClick={onClick}
            className={({ isActive }): string =>
              classNames('va-api-nav-link', className, {
                [activeClassName]: isActive,
                'va-api-active-nav': isActive,
              })
            }
            to={targetUrl}
          >
            {children}
          </NavLink>
        </div>
      )}
    </>
  );
};

export { MainNavItem };
