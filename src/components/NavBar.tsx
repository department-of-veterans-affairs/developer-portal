import classNames from 'classnames';
import * as React from 'react';
import MediaQuery from 'react-responsive';
import { Link, NavLink } from 'react-router-dom';

import closeButton from '../../node_modules/uswds/src/img/close.png';
import minusIcon from '../../node_modules/uswds/src/img/minus.png';
import plusIcon from '../../node_modules/uswds/src/img/plus.png';

import { getApiCategoryOrder, getApiDefinitions } from '../apiDefs/query';
import { UNDER_LARGE_SCREEN_QUERY } from '../types/constants';
import MainNavItem, { ILargeScreenNavItemProps } from './MainNavItem';
import Search from './Search';

import './NavBar.scss';

interface INavBarProps {
  isMobileMenuVisible: boolean;
  onClose: () => void;
}

interface IVisibleSubNavState {
  documentation: boolean;
}

interface INavBarState {
  useDefaultNavLink: boolean;
  visibleSubNavs: IVisibleSubNavState;
}

export default class NavBar extends React.Component<INavBarProps, INavBarState> {
  constructor(props: INavBarProps) {
    super(props);
    this.state = {
      useDefaultNavLink: true,
      visibleSubNavs: {
        documentation: false,
      },
    };
  }

  public render() {
    const navClasses = classNames({
      'va-api-mobile-nav-visible': this.props.isMobileMenuVisible,
      'va-api-nav': true,
    });
    const sharedNavItemProps: ILargeScreenNavItemProps = {
      isActive: this.checkActiveNavLink,
      onMouseEnter: this.toggleDefaultNavLink.bind(this, false),
      onMouseLeave: this.toggleDefaultNavLink.bind(this, true),
    };

    return (
      <nav className={navClasses}>
        <div className={classNames(
          'va-api-nav-inner',
          'medium-screen:vads-u-margin-x--3',
          'medium-screen:vads-u-padding--0',
        )}>
          <MediaQuery query={UNDER_LARGE_SCREEN_QUERY}>
            <button className="va-api-mobile-nav-close" onClick={this.props.onClose}>
              <img src={closeButton} alt="Close button" />
            </button>
            <Search inMenu={true} className={classNames('vads-u-margin-y--2', 'vads-u-padding-y--0', 'vads-u-width--full')} />
          </MediaQuery>
          <ul className="va-api-nav-primary">
            <li className="va-api-main-nav-item">
              <MainNavItem targetUrl="/explore" largeScreenProps={sharedNavItemProps} excludeSmallScreen={true}>
                Documentation
              </MainNavItem>
              <MediaQuery query={UNDER_LARGE_SCREEN_QUERY}>
                <button className="va-api-nav-button" onClick={this.toggleDocumentationSubMenu}>
                  <span>Documentation</span>
                  <img src={this.state.visibleSubNavs.documentation ? minusIcon : plusIcon}
                    alt="Expand Documentation" aria-label="Expand Documentation" className="va-api-expand-nav-icon" />
                </button>
                {this.state.visibleSubNavs.documentation && this.renderDocumentationSubNav()}
              </MediaQuery>
            </li>
            <li className="va-api-main-nav-item">
              <MainNavItem targetUrl="/news" largeScreenProps={sharedNavItemProps}>
                News
              </MainNavItem>
            </li>
            <li className="va-api-main-nav-item">
              <MainNavItem targetUrl="/release-notes" largeScreenProps={sharedNavItemProps}>
                Release Notes
              </MainNavItem>
            </li>
            <li className="va-api-main-nav-item">
              <MainNavItem targetUrl="/support" largeScreenProps={sharedNavItemProps}>
                Support
              </MainNavItem>
            </li>
          </ul>
          <MediaQuery query={UNDER_LARGE_SCREEN_QUERY}>
            <div className="va-api-nav-secondary">
              <Link to="/apply" className={classNames("usa-button", "vads-u-width--full")}>Request an API Key</Link>
            </div>
          </MediaQuery>
        </div>
      </nav>
    );
  }

  private renderDocumentationSubNav() {
    const apiDefs = getApiDefinitions();
    const apiCategoryOrder = getApiCategoryOrder();

    return (
      <ul className="va-api-sub-nav">
        <li className="va-api-sub-nav-item" key="all">
          <NavLink exact={true} 
            to="/explore" 
            className="va-api-sub-nav-link"
            activeClassName="va-api-active-sub-nav"
          >
            Overview
          </NavLink>
        </li>
        {apiCategoryOrder.map(apiKey => {
          return (
            <li className="va-api-sub-nav-item" key={apiKey}>
              <NavLink 
                to={`/explore/${apiKey}`} 
                className="va-api-sub-nav-link" 
                activeClassName="va-api-active-sub-nav"
              >
                {apiDefs[apiKey].name}
              </NavLink>
            </li>
          );
        })}
      </ul>
    );
  }

  private toggleDocumentationSubMenu = () => {
    this.setState((state: INavBarState) => {
      return {
        visibleSubNavs: {
          documentation: !state.visibleSubNavs.documentation,
        },
      };
    });
  }

  private toggleDefaultNavLink = (useDefault: boolean) => {
    this.setState({ useDefaultNavLink: useDefault });
  }

  private checkActiveNavLink = (match: {}) => {
    if (!match) {
      return false;
    }
    return this.state.useDefaultNavLink;
  }
}
