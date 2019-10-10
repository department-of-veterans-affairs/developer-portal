import classnames from 'classnames';
import * as React from 'react';
import MediaQuery from 'react-responsive';
import { Link } from 'react-router-dom';

import { OVER_LARGE_SCREEN_QUERY, UNDER_LARGE_SCREEN_QUERY } from '../types/constants';
import Banner from './Banner';
import NavBar from './NavBar';
import Search from './Search';

import './Header.scss';

interface INavBarState {
  menuVisible: boolean;
}

export default class Header extends React.Component<{}, INavBarState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      menuVisible: false,
    };
  }

  public render() {
    const navBarCloseHandler = this.toggleMenuVisible.bind(this);
    const buttonClassnames = classnames('vads-u-background-color--white', 'vads-u-color--primary-darkest', 'usa-button');

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
                <Link to="/apply" className={buttonClassnames}>Request an API Key</Link>
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
        <NavBar isMobileMenuVisible={this.state.menuVisible} onClose={navBarCloseHandler} />
        <MediaQuery query={UNDER_LARGE_SCREEN_QUERY}>
          <Search />
        </MediaQuery>
      </header>
    );
  }

  private toggleMenuVisible = () => {
    this.setState((state: INavBarState) => {
      return { menuVisible: !state.menuVisible };
    });
  }
}
