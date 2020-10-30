import classNames from 'classnames';
import * as React from 'react';
import { match as Match } from 'react-router';
import { NavLink } from 'react-router-dom';
import { desktopOnly, mobileOnly } from '../../styles/vadsUtils';

export interface LargeScreenNavItemProps {
  isActive: (match: Match | null) => boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

interface MainNavItemProps {
  children: React.ReactChild | React.ReactChildren;
  activeClassName?: string;
  className?: string;
  excludeLargeScreen: boolean;
  excludeSmallScreen: boolean;
  targetUrl: string;
  largeScreenProps: LargeScreenNavItemProps;
  onClick: () => void;
}

export const MainNavItem = (props: MainNavItemProps): JSX.Element => {
  const {
    activeClassName,
    className,
    onClick,
    targetUrl,
    excludeLargeScreen,
    excludeSmallScreen,
    largeScreenProps,
    children,
  } = props;

  const sharedProps = {
    activeClassName: classNames('va-api-active-nav', activeClassName),
    className: classNames('va-api-nav-link', className),
    to: targetUrl,
  };

  return (
    <>
      {!excludeLargeScreen && (
        <div className={desktopOnly()}>
          <NavLink {...sharedProps} {...largeScreenProps}>
            {children}
          </NavLink>
        </div>
      )}
      {!excludeSmallScreen && (
        <div className={mobileOnly()}>
          <NavLink onClick={onClick} {...sharedProps}>
            {children}
          </NavLink>
        </div>
      )}
    </>
  );
};

MainNavItem.defaultProps = {
  excludeLargeScreen: false,
  excludeSmallScreen: false,
  onClick: undefined,
};
