import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import classNames from 'classnames';
import { mobileOnly } from '../../styles/vadsUtils';
import { Flag } from '../../flags';
import TestingNotice from '../TestingNotice';
import { FLAG_SHOW_TESTING_NOTICE } from '../../types/constants';
import { Banner } from '../banner/Banner';
import VeteransCrisisLine from '../crisisLine/VeteransCrisisLine';
import { NavBar } from '../navBar/NavBar';
import './Header.scss';

interface HeaderAlertsProps {
  pathname: string;
}

const HeaderAlerts = ({ pathname }: HeaderAlertsProps): JSX.Element | null => {
  switch (pathname) {
    case '/explore/appeals/docs/appeals':
      return (
        <va-alert background-only show-icon status="info" visible>
          <p className="vads-u-margin-y--0">
            A new version of Appeals Status API (v1) will launch later this year.
          </p>
        </va-alert>
      );
    case '/explore/facilities/docs/facilities':
      return (
        <va-alert background-only show-icon status="info" visible>
          <p className="vads-u-margin-y--0">
            Version 1 of the VA Facilities API is launching soon. We will add{' '}
            <Link to="/release-notes/facilities">release notes</Link> when it&apos;s live.
          </p>
        </va-alert>
      );
    case '/explore/verification/docs/veteran_confirmation':
      return (
        <va-alert background-only show-icon status="info" visible>
          <p className="vads-u-margin-y--0">
            Version 0 of the Veteran Confirmation API is deprecated and scheduled for deactivation
            on April 4, 2024. Version 1 of the Veteran Confirmation API is now active.
          </p>
        </va-alert>
      );
    default:
      return null;
  }
};

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
    'vads-u-display--flex',
    'vads-u-justify-content--space-between',
    'vads-u-align-items--center',
    'medium-screen:vads-u-padding-left--4',
    'medium-screen:vads-u-margin-y--3',
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
        <VeteransCrisisLine />

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

        <HeaderAlerts pathname={location.pathname} />
      </header>
    </>
  );
};
