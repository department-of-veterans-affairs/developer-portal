import classNames from 'classnames';
import * as React from 'react';
import MediaQuery from 'react-responsive';
import { NavLink } from 'react-router-dom';
import { OVER_LARGE_SCREEN_QUERY, UNDER_LARGE_SCREEN_QUERY } from '../types/constants';

export interface ILargeScreenNavItemProps {
  isActive: (match: {}) => boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

interface IMainNavItemProps {
  children: React.ReactChild | React.ReactChildren;
  activeClassName?: string;
  className?: string;
  excludeLargeScreen: boolean;
  excludeSmallScreen: boolean;
  targetUrl: string;
  largeScreenProps: ILargeScreenNavItemProps;
}

export default class MainNavItem extends React.PureComponent<IMainNavItemProps> {
  public static defaultProps = {
    excludeLargeScreen: false,
    excludeSmallScreen: false,
  };

  public render() {
    const sharedProps = {
      activeClassName: classNames('va-api-active-nav', this.props.activeClassName),
      className: classNames('va-api-nav-link', this.props.className),
      to: this.props.targetUrl,
    };
  
    return (
      <React.Fragment>
        {!this.props.excludeLargeScreen &&
          <MediaQuery query={OVER_LARGE_SCREEN_QUERY}>
            <NavLink {... sharedProps} {... this.props.largeScreenProps}>
              {this.props.children}
            </NavLink>
          </MediaQuery>
        }
        {!this.props.excludeSmallScreen &&
          <MediaQuery query={UNDER_LARGE_SCREEN_QUERY}>
            <NavLink {... sharedProps}>
              {this.props.children}
            </NavLink>
          </MediaQuery>
        }
      </React.Fragment>
    );
  }
}