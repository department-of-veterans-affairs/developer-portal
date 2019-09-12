import classNames from 'classnames';
import * as React from 'react';
import MediaQuery from 'react-responsive';
import { Link, NavLink } from 'react-router-dom';

import './NavBar.scss';

import closeButton from '../../node_modules/uswds/src/img/close.png';
import minusIcon from '../../node_modules/uswds/src/img/minus.png';
import plusIcon from '../../node_modules/uswds/src/img/plus.png';

import { Banner } from './Banner';
import { Search } from './Search';

import { apiCategoryOrder, apiDefs } from '../apiDefs';
import { OVER_LARGE_SCREEN_QUERY, UNDER_LARGE_SCREEN_QUERY } from '../types/constants';

interface INavBarProps {
  hideLinks: boolean;
}

interface IVisibleSubNavState {
  documentation: boolean;
}

interface INavBarState {
  menuVisible: boolean;
  useDefaultNavLink: boolean;
  visibleSubNavs: IVisibleSubNavState;
}

export class NavBar extends React.Component<INavBarProps, INavBarState> {
  constructor(props: INavBarProps) {
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
      'is-hidden': this.props.hideLinks,
      'is-visible': !this.props.hideLinks && this.state.menuVisible,
      'usa-nav': !this.props.hideLinks,
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
          <button className="usa-menu-btn" onClick={this.toggleMenuVisible}>Menu</button>
        </div>
        <nav className={navClasses}>
          <div className="usa-nav-inner">
            <button className="usa-nav-close" onClick={this.toggleMenuVisible}>
              <img src={closeButton} alt="Close button" />
            </button>
            <MediaQuery query={UNDER_LARGE_SCREEN_QUERY}>
              <div className="usa-nav-secondary">
                <ul className="usa-unstyled-list">
                  <li className="secondary-nav-item">
                    <Link to="/apply" className="usa-button">Get Started</Link>
                  </li>
                </ul>
              </div>
            </MediaQuery>
            <ul className="usa-nav-primary usa-accordion">
              <li className="main-nav-item">
                <MediaQuery query={OVER_LARGE_SCREEN_QUERY}>
                  <NavLink to="/explore" className="usa-nav-link" activeClassName="default-nav-link"
                    isActive={this.checkActiveNavLink}
                    onMouseEnter={this.toggleDefaultNavLink.bind(this, false)}
                    onMouseLeave={this.toggleDefaultNavLink.bind(this, true)}>
                    Documentation
                  </NavLink>
                </MediaQuery>
                <MediaQuery query={UNDER_LARGE_SCREEN_QUERY}>
                  <button className="usa-nav-link" onClick={this.toggleDocumentationSubMenu}>
                    <span>Documentation</span>
                    <img src={this.state.visibleSubNavs.documentation ? minusIcon : plusIcon}
                      alt="Expand Documentation" aria-label="Expand Documentation" className="nav-item-button" />
                  </button>
                </MediaQuery>
                {this.state.visibleSubNavs.documentation && this.renderDocumentationSubNav()}
              </li>
              <li className="main-nav-item">
                <NavLink to="/release-notes" className="usa-nav-link" activeClassName="default-nav-link"
                  isActive={this.checkActiveNavLink}
                  onMouseEnter={this.toggleDefaultNavLink.bind(this, false)}
                  onMouseLeave={this.toggleDefaultNavLink.bind(this, true)}>
                  Release Notes
                </NavLink>
              </li>
              <li className="main-nav-item">
                <NavLink to="/support" className="usa-nav-link" activeClassName="default-nav-link"
                  isActive={this.checkActiveNavLink}
                  onMouseEnter={this.toggleDefaultNavLink.bind(this, false)}
                  onMouseLeave={this.toggleDefaultNavLink.bind(this, true)}>
                  Support
                </NavLink>
              </li>
              <li className="main-nav-item">
                <NavLink to="/news" className="usa-nav-link" activeClassName="default-nav-link"
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
    const subNavLinks = apiCategoryOrder.map(apiKey => {
      return (
        <li className="main-nav-secondary-item" key={apiKey}>
          <NavLink to={`/explore/${apiKey}`} className="sub-nav-link">
            {apiDefs[apiKey].name}
          </NavLink>
        </li>
      );
    });

    return (
      <ul className="sub-nav-documentation">
        <li className="main-nav-secondary-item" key="all">
          <NavLink exact={true} to="/explore" className="sub-nav-link">Overview</NavLink>
        </li>
        {subNavLinks}
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
