import classNames from 'classnames';
import { Flag } from 'flag';
import * as React from 'react';
import { Link } from 'react-router-dom';

import { defaultFlexContainer, desktopOnly, mobileOnly } from '../styles/vadsUtils';
import Banner from './Banner';
import VeteransCrisisLine from './crisisLine/VeteransCrisisLine';
import NavBar from './NavBar';
import Search from './Search';

import './Header.scss';
import TestingNotice from './TestingNotice';

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
      <React.Fragment>
        <header role="banner" className="vads-u-background-color--primary-darkest">
          <Flag name="show_testing_notice">
            <TestingNotice />
          </Flag>
          <Banner />
          <VeteransCrisisLine />
          <div className={classNames(
            defaultFlexContainer(true),
            'vads-u-justify-content--space-between',
            'medium-screen:vads-u-padding-x--4',
            'medium-screen:vads-u-margin-y--3',
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
              )}>
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
      </React.Fragment>
    );
  }

  private toggleMenuVisible = () => {
    this.setState((state: INavBarState) => {
      return { menuVisible: !state.menuVisible };
    });
  }
}
