/* eslint-disable max-lines */
import classNames from 'classnames';
import React, { useRef } from 'react';
import { faChevronDown, faChevronUp, faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import {
  CONSUMER_APIS_PATH,
  CONSUMER_DEMO_PATH,
  CONSUMER_PATH,
  CONSUMER_PROD_PATH,
} from '../../types/constants/paths';
import { desktopOnly } from '../../styles/vadsUtils';
import { MainNavItem, SubNav, SubNavEntry } from '../../components';
import Search from '../search/Search';
import { useOutsideGroupClick } from '../../hooks';
import './NavBar.scss';

interface NavBarProps {
  isMobileMenuVisible: boolean;
  onMobileNavClose: () => void;
  isSearchBarVisible?: boolean;
  toggleSearchBar?: () => void;
}

const navItemStyles: string = classNames(
  'va-api-main-nav-item',
  'vads-u-display--block',
  'vads-u-margin-bottom--0',
  'medium-screen:vads-u-margin-right--0p5',
  'medium-screen:vads-u-display--inline-block',
  'medium-screen:vads-u-padding-y--0',
  'vads-u-border-top--1px',
  'vads-u-border-color--gray-lighter',
  'medium-screen:vads-u-border-top--0',
);

const navLinkStyles = classNames(
  'vads-u-color--gray-dark',
  'vads-u-display--block',
  'vads-u-line-height--4',
  'vads-u-padding-x--1',
  'vads-u-padding-y--2',
  'vads-u-text-decoration--none',
  'small-desktop-screen:vads-u-padding--2',
  'va-api-external-link',
);

const NavBar = (props: NavBarProps): JSX.Element => {
  const searchRef = useRef(null);
  const searchButtonRef = useRef(null);
  const { isMobileMenuVisible, isSearchBarVisible, onMobileNavClose, toggleSearchBar } = props;

  const navClasses = classNames(
    {
      'va-api-mobile-nav-visible': isMobileMenuVisible,
    },
    'va-api-nav',
    desktopOnly(),
    'vads-u-width--auto',
  );

  useOutsideGroupClick([searchRef, searchButtonRef], () => {
    if (isSearchBarVisible && toggleSearchBar) {
      toggleSearchBar();
    }
  });

  return (
    <nav className={navClasses}>
      <div
        className={classNames(
          'va-api-nav-inner',
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
            aria-expanded={isSearchBarVisible}
            aria-label="Close"
            className={classNames(
              'va-api-mobile-nav-close',
              'vads-u-display--block',
              'vads-u-margin--0',
              'vads-u-padding--0',
            )}
            onClick={onMobileNavClose}
            type="button"
          >
            <FontAwesomeIcon icon={faTimes as IconProp} />
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
          <li className={navItemStyles}>
            <MainNavItem onClick={onMobileNavClose} targetUrl="/explore" className={navLinkStyles}>
              Explore APIs
            </MainNavItem>
          </li>

          <li className={navItemStyles}>
            <MainNavItem targetUrl={CONSUMER_PATH} excludeSmallScreen className={navLinkStyles}>
              Onboarding
            </MainNavItem>
            <SubNav name="Onboarding">
              <SubNavEntry onClick={onMobileNavClose} to={CONSUMER_PATH} id="onboarding-overview">
                API Consumer onboarding
              </SubNavEntry>
              <SubNavEntry onClick={onMobileNavClose} to={CONSUMER_PROD_PATH} id="prod-access">
                Request production access
              </SubNavEntry>
              <SubNavEntry onClick={onMobileNavClose} to={CONSUMER_DEMO_PATH} id="demo">
                Prepare for the demo
              </SubNavEntry>
              <SubNavEntry
                onClick={onMobileNavClose}
                to={CONSUMER_APIS_PATH}
                id="working-with-apis"
              >
                Working with our APIs
              </SubNavEntry>
            </SubNav>
          </li>

          <li className={navItemStyles}>
            <MainNavItem targetUrl="/about" excludeSmallScreen className={navLinkStyles}>
              About
            </MainNavItem>
            <SubNav name="About">
              <SubNavEntry onClick={onMobileNavClose} to="/about" id="about">
                Overview
              </SubNavEntry>
              <SubNavEntry onClick={onMobileNavClose} to="/about/news" id="news">
                News
              </SubNavEntry>
            </SubNav>
          </li>

          <li className={navItemStyles}>
            <a
              aria-label="API Status, opens in a new tab"
              className={classNames(navLinkStyles)}
              href="https://valighthouse.statuspage.io"
              target="_blank"
              rel="noopener noreferrer"
            >
              API Status
            </a>
          </li>

          <li className={navItemStyles}>
            <MainNavItem onClick={onMobileNavClose} targetUrl="/support" className={navLinkStyles}>
              Support
            </MainNavItem>
          </li>

          <li className={classNames(navItemStyles, desktopOnly(), 'va-api-separator')}>
            <button
              aria-expanded={isSearchBarVisible}
              className={classNames(
                'va-api-navbar-search-button',
                'vads-u-background-color--primary-darkest',
                'vads-u-font-weight--normal',
                'vads-u-padding-x--1',
                'vads-u-padding-y--2',
                'vads-u-line-height--4',
                'vads-u-margin--0',
                'vads-u-margin-right--0p5',
              )}
              onClick={toggleSearchBar}
              type="button"
              ref={searchButtonRef}
              data-testid="search-button"
            >
              <FontAwesomeIcon
                className={classNames('vads-u-margin-right--1')}
                icon={faSearch as IconProp}
              />
              Search
              <FontAwesomeIcon
                className={classNames('vads-u-margin-left--1')}
                icon={(isSearchBarVisible ? faChevronUp : faChevronDown) as IconProp}
              />
            </button>
          </li>
        </ul>
      </div>
      {!isMobileMenuVisible && isSearchBarVisible && (
        <div className="va-api-search-bar-container" ref={searchRef}>
          <Search className="va-api-search-bar" />
        </div>
      )}
    </nav>
  );
};

export { NavBar };
