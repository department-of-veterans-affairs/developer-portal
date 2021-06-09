import classNames from 'classnames';
import * as React from 'react';
import PropTypes from 'prop-types';
import { match as Match } from 'react-router';
import { NavLink } from 'react-router-dom';
import { desktopOnly, mobileOnly } from '../../styles/vadsUtils';
import { isHashLinkExact } from '../../utils/isNavHashLinkExact';

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

const MainNavItem = (props: MainNavItemProps): JSX.Element => {
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
          <NavLink
            aria-current={isHashLinkExact(props.targetUrl) ? 'page' : 'false'}
            {...sharedProps}
            {...largeScreenProps}
          >
            {children}
          </NavLink>
        </div>
      )}
      {!excludeSmallScreen && (
        <div className={mobileOnly()}>
          <NavLink
            aria-current={isHashLinkExact(props.targetUrl) ? 'page' : 'false'}
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
  excludeLargeScreen: PropTypes.bool,
  excludeSmallScreen: PropTypes.bool,
  largeScreenProps: PropTypes.shape({
    isActive: PropTypes.func.isRequired,
    onMouseEnter: PropTypes.func.isRequired,
    onMouseLeave: PropTypes.func.isRequired,
  }),
  onClick: PropTypes.func,
  targetUrl: PropTypes.string.isRequired,
};

MainNavItem.defaultProps = {
  excludeLargeScreen: false,
  excludeSmallScreen: false,
  onClick: undefined,
};

export { MainNavItem };
