import { VaAlert } from '@department-of-veterans-affairs/component-library/dist/react-bindings';
import classNames from 'classnames';
import * as React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HashLink, NavHashLink } from 'react-router-hash-link';
import { Banner, NavBar } from '../../components';
import { Flag } from '../../flags';
import { defaultFlexContainer, desktopOnly, mobileOnly } from '../../styles/vadsUtils';
import { FLAG_SHOW_TESTING_NOTICE } from '../../types/constants';
import { CONSUMER_SANDBOX_PATH } from '../../types/constants/paths';
import VeteransCrisisLine from '../crisisLine/VeteransCrisisLine';
import Search from '../search/Search';
import TestingNotice from '../TestingNotice';
import './Header.scss';

const buttonClassnames = classNames(
  'va-api-apply-button',
  'usa-button',
  'va-api-button-default',
  'vads-u-margin-right--2',
);

const Header = (): JSX.Element => {
  /**
   * TOGGLE MENU VISIBLE
   */
  const [mobileNavVisible, setMobileNavVisible] = React.useState(false);

  const location = useLocation();
  const toggleMenuVisible = (): void => {
    setMobileNavVisible((state: boolean) => !state);
  };

  /**
   * RENDER
   */
  return (
    <>
      <Flag name={[FLAG_SHOW_TESTING_NOTICE]}>
        <TestingNotice />
      </Flag>
      <header
        role="banner"
        className={classNames('va-api-header', 'vads-u-background-color--primary-darkest')}
      >
        <HashLink
          to="#main"
          className={classNames('va-api-skipnav', 'vads-u-padding-x--2', 'vads-u-padding-y--1')}
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
                'medium-screen:vads-u-font-size--xl',
                'small-desktop-screen:vads-u-font-size--2xl',
              )}
            >
              <span className="vads-u-font-weight--bold">VA</span> | Lighthouse APIs
            </Link>
          </div>
          <div className={desktopOnly()}>
            <div className={classNames('vads-u-display--flex', 'vads-u-flex-direction--column')}>
              <div className={defaultFlexContainer(true)}>
                <NavHashLink to={CONSUMER_SANDBOX_PATH} className={buttonClassnames}>
                  Request an API Key
                </NavHashLink>
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
              type="button"
            >
              Menu
            </button>
          </div>
        </div>
        <NavBar isMobileMenuVisible={mobileNavVisible} onMobileNavClose={toggleMenuVisible} />
        {location.pathname === '/explore/appeals/docs/appeals' && (
          <VaAlert status="info" visible>
            <h3 slot="headline">
              A new version of Appeals Status API (v1) will launch later this year.
            </h3>
          </VaAlert>
        )}
        {location.pathname === '/explore/facilities/docs/facilities' && (
          <VaAlert status="info" visible>
            <h3 slot="headline">
              Version 1 of the VA Facilities API is launching soon. We will add{' '}
              <Link to="/release-notes/facilities">release notes</Link> when it&apos;s live.
            </h3>
          </VaAlert>
        )}
        {location.pathname === '/explore/verification/docs/veteran_confirmation' && (
          <VaAlert status="info" visible>
            <h3 slot="headline">
              Version 0 of the Veteran Confirmation API is deprecated and scheduled for deactivation
              on April 4, 2024. Version 1 of the Veteran Confirmation API is now active.
            </h3>
          </VaAlert>
        )}
      </header>
    </>
  );
};

Header.propTypes = {};

export { Header };
