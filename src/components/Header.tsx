import classNames from 'classnames';
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

    return (
      <header className="va-api-site-header" role="banner">
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
                <Link to="/apply" className={classNames('usa-button', 'vads-u-margin-right--2p5')}>
                  Get Started
                </Link>
                <Link id="get-started-button" to="/apply" className="usa-button">Request an API Key</Link>
                <Search />
              </div>
            </div>
          </MediaQuery>
          <MediaQuery query={UNDER_LARGE_SCREEN_QUERY}>
            <button 
              className={classNames('va-api-mobile-menu-button', 'vads-u-padding--0')} 
              onClick={this.toggleMenuVisible}
            >
              Menu
            </button>
          </MediaQuery>
        </div>
        <NavBar isMobileMenuVisible={this.state.menuVisible} onClose={navBarCloseHandler} />
      </header>
    );
  }

  private toggleMenuVisible = () => {
    this.setState((state: INavBarState) => {
      return { menuVisible: !state.menuVisible };
    });
  }
}
