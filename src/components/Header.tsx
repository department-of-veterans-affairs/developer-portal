import classNames from 'classnames';
import * as React from 'react';
import { Link } from 'react-router-dom';

import { defaultFlexContainer, desktopOnly, mobileOnly } from '../styles/vadsUtils';
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
      <header role="banner" className="vads-u-background-color--primary-darkest">
        <Banner />
        <div className={classNames(
          defaultFlexContainer(true),
          'vads-u-justify-content--space-between',
          'medium-screen:vads-u-padding-x--4',
        )}>
          <div className={classNames('va-api-logo', 'vads-u-margin-left--2', 'medium-screen:vads-u-margin-left--0')}>
            <Link to="/" 
              title="Digital VA home page"
              className={classNames(
                'vads-u-color--white',
                'vads-u-font-size--lg',
                'vads-u-text-decoration--none',
                'medium-screen:vads-u-font-size--2xl',
              )}
            >
              <span className="vads-u-font-weight--bold">VA</span> | Lighthouse
            </Link>
          </div>
          <div className={desktopOnly()}>
            <div className={classNames(
              'vads-u-display--flex',
              'vads-u-flex-direction--column',
              'vads-u-margin-bottom--1',
            )}>
              <a href="https://valighthouse.statuspage.io"
                className={classNames(
                  'va-api-status-link',
                  'vads-u-color--white',
                  'vads-u-font-size--md',
                  'vads-u-margin-top--2p5',
                  'vads-u-margin-bottom--0p5',
                  'vads-u-margin-left--auto',
                )}
              >
                API Status
              </a>
              <div className={defaultFlexContainer(true)}>
                <Link to="/apply" className={buttonClassnames}>Request an API Key</Link>
                <Search />
              </div>
            </div>
          </div>
          <div className={mobileOnly()}>
            <button 
              className={classNames(
                'va-api-mobile-menu-button',
                'vads-u-font-size--sm',
                'vads-u-font-weight--normal',
                'vads-u-margin--0',
                'vads-u-padding--0',
                'vads-u-text-align--center',
              )}
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
