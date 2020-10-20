import classNames from 'classnames';
import * as React from 'react';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import { Banner, NavBar } from '../../components';
import { Flag } from '../../flags';
import { defaultFlexContainer, desktopOnly, mobileOnly } from '../../styles/vadsUtils';
import { onHashAnchorClick } from '../../utils/clickHandlers';
import VeteransCrisisLine from '../crisisLine/VeteransCrisisLine';
import Search from '../search/Search';
import TestingNotice from '../TestingNotice';
import './Header.scss';

const buttonClassnames = classNames(
  'usa-button',
  'vads-u-background-color--white',
  'vads-u-color--primary-darkest',
  'vads-u-margin-right--2',
);

const Header = (): JSX.Element => {
  /**
   * TOGGLE MENU VISIBLE
   */
  const [mobileNavVisible, setMobileNavVisible] = React.useState(false);

  const toggleMenuVisible = () => {
    setMobileNavVisible((state: boolean) => !state);
  };

  /**
   * RENDER
   */
  return (
    <>
      <Flag name={['show_testing_notice']}>
        <TestingNotice />
      </Flag>
      <header
        role="banner"
        className={classNames('va-api-header', 'vads-u-background-color--primary-darkest')}
      >
        <HashLink
          to="#main"
          className={classNames('va-api-skipnav', 'vads-u-padding-x--2', 'vads-u-padding-y--1')}
          onClick={onHashAnchorClick}
        >
          Skip to main content
        </HashLink>
        <Banner />
        <VeteransCrisisLine />
        <div
          className={classNames(
            defaultFlexContainer(true),
            'vads-u-justify-content--space-between',
            'medium-screen:vads-u-padding-x--4',
            'medium-screen:vads-u-margin-y--3',
          )}
        >
          <div
            className={classNames(
              'va-api-logo',
              'vads-u-margin-left--2',
              'medium-screen:vads-u-margin-left--0',
            )}
          >
            <Link
              to="/"
              title="VA API Platform home page"
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
            <div className={classNames('vads-u-display--flex', 'vads-u-flex-direction--column')}>
              <div className={defaultFlexContainer(true)}>
                <Link to="/apply" className={buttonClassnames}>
                  Request an API Key
                </Link>
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
              onClick={toggleMenuVisible}
            >
              Menu
            </button>
          </div>
        </div>
        <NavBar isMobileMenuVisible={mobileNavVisible} onMobileNavClose={toggleMenuVisible} />
      </header>
    </>
  );
};

Header.propTypes = {};

export { Header };
