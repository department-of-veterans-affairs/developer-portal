/* eslint-disable max-lines */
import classNames from 'classnames';
import * as React from 'react';
import { match as Match } from 'react-router';
import { faChevronDown, faChevronUp, faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  CONSUMER_APIS_PATH,
  CONSUMER_DEMO_PATH,
  CONSUMER_PATH,
  CONSUMER_PROD_PATH,
} from '../../types/constants/paths';
import { desktopOnly } from '../../styles/vadsUtils';
import { LargeScreenNavItemProps, MainNavItem, SubNav, SubNavEntry } from '../../components';
import Search from '../search/Search';
import './NavBar.scss';

interface NavBarProps {
  isMobileMenuVisible: boolean;
  onMobileNavClose: () => void;
  isSearchBarVisible?: boolean;
  toggleSearchBar?: () => void;
}

const navItemStyles = (isFirstChild = false): string =>
  classNames(
    'va-api-main-nav-item',
    'vads-u-display--block',
    'vads-u-margin-bottom--0',
    'vads-u-padding-y--1',
    'medium-screen:vads-u-display--inline-block',
    'medium-screen:vads-u-padding-y--0',
    !isFirstChild && [
      'vads-u-border-top--1px',
      'vads-u-border-color--gray-lighter',
      'medium-screen:vads-u-border-top--0',
    ],
  );

const navLinkStyles = classNames(
  'vads-u-color--gray-dark',
  'vads-u-display--block',
  'vads-u-line-height--4',
  'vads-u-padding--1',
  'vads-u-text-decoration--none',
  'medium-screen:vads-u-padding--1p5',
  'va-api-external-link',
);

const NavBar = (props: NavBarProps): JSX.Element => {
  const [useDefaultNavLink, setUseDefaultNavLink] = React.useState(true);

  const navClasses = classNames(
    {
      'va-api-mobile-nav-visible': props.isMobileMenuVisible,
    },
    'va-api-nav',
    desktopOnly(),
    'vads-u-width--auto',
  );

  const toggleDefaultNavLink = (useDefault: boolean): void => {
    setUseDefaultNavLink(useDefault);
  };

  const checkActiveNavLink = (match: Match | null): boolean => {
    if (!match) {
      return false;
    }
    return useDefaultNavLink;
  };

  const sharedNavItemProps: LargeScreenNavItemProps = {
    isActive: checkActiveNavLink,
    onMouseEnter: () => toggleDefaultNavLink(false),
    onMouseLeave: () => toggleDefaultNavLink(true),
  };

  return (
    <nav className={navClasses}>
      <div
        className={classNames(
          'vads-u-padding--2p5',
          'vads-u-border-color--white',
          'medium-screen:vads-u-margin-left--4',
          'medium-screen:vads-u-padding--0',
          'medium-screen:vads-u-display--flex',
        )}
      >
        <div
          className={classNames(
            'vads-u-display--flex',
            'vads-u-flex-direction--column',
            'medium-screen:vads-u-display--none',
          )}
        >
          <button
            className={classNames(
              'va-api-mobile-nav-close',
              'vads-u-display--block',
              'vads-u-margin--0',
              'vads-u-padding--0',
            )}
            onClick={props.onMobileNavClose}
            type="button"
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
          <Search
            inMenu
            className={classNames(
              'vads-u-margin-y--2',
              'vads-u-padding-y--0',
              'vads-u-width--full',
            )}
          />
        </div>

        <ul
          className={classNames(
            'vads-u-margin-y--0',
            'vads-u-padding-left--0',
            'medium-screen:vads-u-display--inline',
          )}
        >
          <li className={navItemStyles()}>
            <MainNavItem
              targetUrl="/explore"
              largeScreenProps={sharedNavItemProps}
              className={navLinkStyles}
            >
              Explore APIs
            </MainNavItem>
          </li>

          <li className={navItemStyles()}>
            <MainNavItem
              targetUrl={CONSUMER_PATH}
              largeScreenProps={sharedNavItemProps}
              excludeSmallScreen
              className={navLinkStyles}
            >
              Onboarding
            </MainNavItem>
            <SubNav name="Onboarding">
              <SubNavEntry
                onClick={props.onMobileNavClose}
                to={CONSUMER_PATH}
                id="onboarding-overview"
              >
                API Consumer onboarding
              </SubNavEntry>
              <SubNavEntry
                onClick={props.onMobileNavClose}
                to={CONSUMER_PROD_PATH}
                id="prod-access"
              >
                Request production access
              </SubNavEntry>
              <SubNavEntry onClick={props.onMobileNavClose} to={CONSUMER_DEMO_PATH} id="demo">
                Prepare for the demo
              </SubNavEntry>
              <SubNavEntry
                onClick={props.onMobileNavClose}
                to={CONSUMER_APIS_PATH}
                id="working-with-apis"
              >
                Working with our APIs
              </SubNavEntry>
            </SubNav>
          </li>

          <li className={navItemStyles()}>
            <MainNavItem
              targetUrl="/about"
              largeScreenProps={sharedNavItemProps}
              excludeSmallScreen
              className={navLinkStyles}
            >
              About
            </MainNavItem>
            <SubNav name="About">
              <SubNavEntry onClick={props.onMobileNavClose} to="/about" id="about">
                Overview
              </SubNavEntry>
              <SubNavEntry onClick={props.onMobileNavClose} to="/about/news" id="news">
                News
              </SubNavEntry>
            </SubNav>
          </li>

          <li className={navItemStyles()}>
            <a className={classNames(navLinkStyles)} href="https://valighthouse.statuspage.io">
              API Status
            </a>
          </li>

          <li className={navItemStyles()}>
            <MainNavItem
              onClick={props.onMobileNavClose}
              targetUrl="/support"
              largeScreenProps={sharedNavItemProps}
              className={navLinkStyles}
            >
              Support
            </MainNavItem>
          </li>

          <li className={classNames(navItemStyles(), desktopOnly(), 'va-api-separator')}>
            <button
              className={classNames(
                'vads-u-background-color--primary-darkest',
                'vads-u-font-weight--normal',
                'vads-u-padding--1p5',
              )}
              onClick={props.toggleSearchBar}
              type="button"
            >
              <FontAwesomeIcon className={classNames('vads-u-margin-right--1')} icon={faSearch} />
              Search
              <FontAwesomeIcon
                className={classNames('vads-u-margin-left--1')}
                icon={props.isSearchBarVisible ? faChevronUp : faChevronDown}
              />
            </button>
          </li>
        </ul>
      </div>
      {!props.isMobileMenuVisible && props.isSearchBarVisible && (
        <div className="va-api-search-bar-container">
          <Search className="va-api-search-bar" />
        </div>
      )}
    </nav>
  );
};

export { NavBar };
