import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { desktopOnly, mobileOnly } from '../../styles/vadsUtils';
import { isHashLinkExact } from '../../utils/isNavHashLinkExact';

interface MainNavItemProps {
  children: React.ReactChild | React.ReactChildren;
  activeClassName?: string;
  className?: string;
  exact?: boolean;
  excludeLargeScreen: boolean;
  excludeSmallScreen: boolean;
  targetUrl: string;
  onClick: () => void;
}

const MainNavItem = (props: MainNavItemProps): JSX.Element => {
  const {
    activeClassName,
    className,
    onClick,
    targetUrl,
    exact,
    excludeLargeScreen,
    excludeSmallScreen,
    children,
  } = props;

  const sharedProps = {
    activeClassName: classNames('va-api-active-nav', activeClassName),
    className: classNames('va-api-nav-link', className),
    exact: exact ?? false,
    to: targetUrl,
  };

  return (
    <>
      {!excludeLargeScreen && (
        <div className={desktopOnly()}>
          <NavLink aria-current={isHashLinkExact(targetUrl) ? 'page' : 'false'} {...sharedProps}>
            {children}
          </NavLink>
        </div>
      )}
      {!excludeSmallScreen && (
        <div className={mobileOnly()}>
          <NavLink
            aria-current={isHashLinkExact(targetUrl) ? 'page' : 'false'}
            onClick={onClick}
            {...sharedProps}
          >
            {children}
          </NavLink>
        </div>
      )}
    </>
  );
};

MainNavItem.propTypes = {
  activeClassName: PropTypes.string,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  exact: PropTypes.bool,
  excludeLargeScreen: PropTypes.bool,
  excludeSmallScreen: PropTypes.bool,
  onClick: PropTypes.func,
  targetUrl: PropTypes.string.isRequired,
};

MainNavItem.defaultProps = {
  excludeLargeScreen: false,
  excludeSmallScreen: false,
  onClick: undefined,
};

export { MainNavItem };
