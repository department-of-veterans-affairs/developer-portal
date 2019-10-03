import classNames from 'classnames';
import * as React from 'react';
import MediaQuery from 'react-responsive';
import { Link, NavLink } from 'react-router-dom';

import './Header.scss';
import './NavBar.scss';

import closeButton from '../../node_modules/uswds/src/img/close.png';
import minusIcon from '../../node_modules/uswds/src/img/minus.png';
import plusIcon from '../../node_modules/uswds/src/img/plus.png';

import Banner from './Banner';
import Search from './Search';

import { getApiCategoryOrder, getApiDefinitions } from '../apiDefs/query';
import { OVER_LARGE_SCREEN_QUERY, UNDER_LARGE_SCREEN_QUERY } from '../types/constants';

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

    return (
      <header className="usa-header usa-header-extended" role="banner">
        <Banner />
        <div className="header-content">
          <div className="usa-logo" id="extended-logo">
            <em className="usa-logo-text">
              <Link to="/" title="Digital VA home page">
                <strong>VA</strong> | Developer Portal
              </Link>
            </em>
          </div>
          <div className="header-right-container">
            <MediaQuery query={OVER_LARGE_SCREEN_QUERY}>
              <a className="api-status-link" href="https://valighthouse.statuspage.io">API Status</a>
              <div className="header-right-content">
                <Link id="get-started-button" to="/apply" className="usa-button">Get Started</Link>
                <Search />
              </div>
            </MediaQuery>
          </div>
          <button onClick={this.toggleMenuVisible}>Menu</button>
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
                <MediaQuery query={OVER_LARGE_SCREEN_QUERY}>
                  <NavLink to="/explore" className="va-api-nav-link" activeClassName="default-nav-link"
                    isActive={this.checkActiveNavLink}
                    onMouseEnter={this.toggleDefaultNavLink.bind(this, false)}
                    onMouseLeave={this.toggleDefaultNavLink.bind(this, true)}>
                    Documentation
                  </NavLink>
                </MediaQuery>
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
                <NavLink to="/release-notes" className="va-api-nav-link" activeClassName="default-nav-link"
                  isActive={this.checkActiveNavLink}
                  onMouseEnter={this.toggleDefaultNavLink.bind(this, false)}
                  onMouseLeave={this.toggleDefaultNavLink.bind(this, true)}>
                  Release Notes
                </NavLink>
              </li>
              <li className="va-api-main-nav-item">
                <NavLink to="/support" className="va-api-nav-link" activeClassName="default-nav-link"
                  isActive={this.checkActiveNavLink}
                  onMouseEnter={this.toggleDefaultNavLink.bind(this, false)}
                  onMouseLeave={this.toggleDefaultNavLink.bind(this, true)}>
                  Support
                </NavLink>
              </li>
              <li className="va-api-main-nav-item">
                <NavLink to="/news" className="va-api-nav-link" activeClassName="default-nav-link"
                  isActive={this.checkActiveNavLink}
                  onMouseEnter={this.toggleDefaultNavLink.bind(this, false)}
                  onMouseLeave={this.toggleDefaultNavLink.bind(this, true)}>
                  News
                </NavLink>
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
          <NavLink exact={true} to="/explore" className="va-api-sub-nav-link">Overview</NavLink>
        </li>
        {apiCategoryOrder.map(apiKey => {
          return (
            <li className="va-api-sub-nav-item" key={apiKey}>
              <NavLink to={`/explore/${apiKey}`} className="va-api-sub-nav-link">
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

  private checkActiveNavLink = (match: {}, location: {}) => {
    if (!match) {
      return false;
    }
    return this.state.useDefaultNavLink;
  }
}
