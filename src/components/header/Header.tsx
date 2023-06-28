import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import classNames from 'classnames';
import { HashLink } from 'react-router-hash-link';
import TestingNotice from '../TestingNotice';
import { Banner, NavBar } from '../../components';
import { Flag } from '../../flags';
import { mobileOnly } from '../../styles/vadsUtils';
import { FLAG_SHOW_TESTING_NOTICE } from '../../types/constants';
import { deprecationBannerTargets } from '../../utils/deprecationBannerHelper';
import './Header.scss';

export const Header = (): JSX.Element => {
  const [searchBarVisible, setSearchBarVisible] = useState(false);
  const [mobileNavVisible, setMobileNavVisible] = useState(false);
  const location = useLocation();

  const toggleMenuVisible = (): void => {
    setMobileNavVisible((state: boolean) => !state);
  };

  const toggleSearchBar = (): void => setSearchBarVisible((state: boolean) => !state);

  const headerClassNames = classNames('va-api-header', 'vads-u-background-color--primary-darkest');

  const hashLinkClassNames = classNames(
    'va-api-skipnav',
    'vads-u-padding-x--2',
    'vads-u-padding-y--1',
  );

  const menuButtonClassNames = classNames(
    'va-api-mobile-menu-button',
    'vads-u-font-weight--bold',
    'vads-u-font-size--sm',
    'vads-u-margin--0',
    'vads-u-padding--0',
    'vads-u-text-align--center',
    'vads-u-margin-y--1',
    'vads-u-margin-right--1p5',
  );

  const headerContentContainerClassNames = classNames(
    'va-api-header-container',
    'vads-u-display--flex',
    'vads-u-justify-content--space-between',
    'vads-u-align-items--center',
    'medium-screen:vads-u-padding-left--4',
  );

  const headerContentLinkClassNames = classNames(
    'vads-u-flex--auto',
    'va-api-logo',
    'vads-u-margin-left--2',
    'medium-screen:vads-u-margin-left--0',
  );

  const linkClassNames = classNames(
    'vads-u-color--white',
    'vads-u-text-decoration--none',
    'va-api-logo-link',
  );

  return (
    <>
      <Flag name={[FLAG_SHOW_TESTING_NOTICE]}>
        <TestingNotice />
      </Flag>
      <header role="banner" className={headerClassNames}>
        <HashLink to={{ ...location, hash: '#main' }} className={hashLinkClassNames}>
          Skip to main content
        </HashLink>
        <Banner />

        <div className={headerContentContainerClassNames}>
          <div className={headerContentLinkClassNames}>
            <Link to="/" title="VA API Platform home page" className={linkClassNames}>
              <span className="vads-u-font-weight--bold">VA</span> | Developer
            </Link>
          </div>

          <NavBar
            isMobileMenuVisible={mobileNavVisible}
            onMobileNavClose={toggleMenuVisible}
            isSearchBarVisible={searchBarVisible}
            toggleSearchBar={toggleSearchBar}
          />

          <div className={mobileOnly()}>
            <button className={menuButtonClassNames} onClick={toggleMenuVisible} type="button">
              Menu
            </button>
          </div>
        </div>
        {deprecationBannerTargets
          .filter(target => target.path === location.pathname)
          .map(target => (
            <va-alert key={target.path} background-only show-icon status="info" visible>
              <p className="vads-u-margin-y--0">{target.content}</p>
            </va-alert>
          ))}
      </header>
    </>
  );
};
