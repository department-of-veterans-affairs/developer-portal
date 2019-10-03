import classNames from 'classnames';
import * as React from 'react';
import MediaQuery from 'react-responsive';
import { Link, NavLink } from 'react-router-dom';

import './Header.scss';
import './NavBar.scss';

import closeButton from '../../node_modules/uswds/src/img/close.png';
import minusIcon from '../../node_modules/uswds/src/img/minus.png';
import plusIcon from '../../node_modules/uswds/src/img/plus.png';

import { getApiCategoryOrder, getApiDefinitions } from '../apiDefs/query';
import { OVER_LARGE_SCREEN_QUERY, UNDER_LARGE_SCREEN_QUERY } from '../types/constants';
import Banner from './Banner';
import MainNavItem, { ILargeScreenNavItemProps } from './MainNavItem';
import Search from './Search';

interface IVisibleSubNavState {
  documentation: boolean;
}

interface INavBarState {
  menuVisible: boolean;
  useDefaultNavLink: boolean;
  visibleSubNavs: IVisibleSubNavState;
}

export default class NavBar extends React.Component<{}, INavBarState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      menuVisible: false,
      useDefaultNavLink: true,
      visibleSubNavs: {
        documentation: false,
      },
    };
  }

  public render() {
    const navClasses = classNames({
      'va-api-mobile-nav-visible': this.state.menuVisible,
      'va-api-nav': true,
    });
    const sharedNavItemProps: ILargeScreenNavItemProps = {
      isActive: this.checkActiveNavLink,
      onMouseEnter: this.toggleDefaultNavLink.bind(this, false),
      onMouseLeave: this.toggleDefaultNavLink.bind(this, true),
    };

    return (
      <header className="usa-header usa-header-extended" role="banner">
        <Banner />
        <div className="header-content">
          <div className="va-api-logo" id="extended-logo">
            <Link to="/" title="Digital VA home page" className="vads-u-text-decoration--none">
              <span className="vads-u-font-weight--bold">VA</span> | Developer Portal
            </Link>
          </div>
          <MediaQuery query={OVER_LARGE_SCREEN_QUERY}>
            <div className="header-right-container">
              <a className="api-status-link" href="https://valighthouse.statuspage.io">API Status</a>
              <div className="header-right-content">
                <Link id="get-started-button" to="/apply" className="usa-button">Get Started</Link>
                <Search />
              </div>
            </div>
          </MediaQuery>
          <MediaQuery query={UNDER_LARGE_SCREEN_QUERY}>
            <button className="va-api-mobile-menu-button" onClick={this.toggleMenuVisible}>
              Menu
            </button>
          </MediaQuery>
        </div>
        <nav className={navClasses}>
          <div className="va-api-nav-inner">
            <MediaQuery query={UNDER_LARGE_SCREEN_QUERY}>
              <button className="va-api-mobile-nav-close" onClick={this.toggleMenuVisible}>
                <img src={closeButton} alt="Close button" />
              </button>
              <div className="va-api-nav-secondary">
                <Link to="/apply" className="usa-button">Get Started</Link>
              </div>
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
                <MainNavItem targetUrl="/release-notes" largeScreenProps={sharedNavItemProps}>
                  Release Notes
                </MainNavItem>
              </li>
              <li className="va-api-main-nav-item">
                <MainNavItem targetUrl="/support" largeScreenProps={sharedNavItemProps}>
                  Support
                </MainNavItem>
              </li>
              <li className="va-api-main-nav-item">
                <MainNavItem targetUrl="/news" largeScreenProps={sharedNavItemProps}>
                  News
                </MainNavItem>
              </li>
            </ul>
          </div>
        </nav>
        <MediaQuery query={UNDER_LARGE_SCREEN_QUERY}>
          <Search />
        </MediaQuery>
      </header>
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

  private toggleMenuVisible = () => {
    this.setState((state: INavBarState) => {
      return { menuVisible: !state.menuVisible };
    });
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
