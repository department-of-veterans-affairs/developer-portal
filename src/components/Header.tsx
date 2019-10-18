import classNames from 'classnames';
import * as React from 'react';
import { Link } from 'react-router-dom';

import { desktopOnly, mobileOnly } from '../styles/vadsUtils';
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
    const buttonClassnames = classNames('usa-button', 'vads-u-background-color--white', 'vads-u-color--primary-darkest', 'vads-u-margin-right--2');

    return (
      <header className="va-api-site-header" role="banner">
        <Banner />
        <div className="header-content">
          <div className="va-api-logo" id="extended-logo">
            <Link to="/" 
              title="Digital VA home page"
              className={classNames(
                'vads-u-text-decoration--none',
                'vads-u-font-size--lg',
                'medium-screen:vads-u-font-size--2xl',
              )}
            >
              <span className="vads-u-font-weight--bold">VA</span> | Lighthouse
            </Link>
          </div>
          <div className={desktopOnly()}>
            <div className="header-right-container">
              <a className="api-status-link" href="https://valighthouse.statuspage.io">API Status</a>
              <div className="header-right-content">
                <Link to="/apply" className={buttonClassnames}>Request an API Key</Link>
                <Search />
              </div>
            </div>
          </div>
          <div className={mobileOnly()}>
            <button 
              className={classNames('va-api-mobile-menu-button', 'vads-u-padding--0')} 
              onClick={this.toggleMenuVisible}
            >
              Menu
            </button>
          </div>
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
