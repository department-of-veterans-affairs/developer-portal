import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import * as React from 'react';
import { match as Match } from 'react-router';
import { Link } from 'react-router-dom';

import { FLAG_API_PUBLISHING } from '../../types/constants';
import {
  PUBLISHING_EXPECTATIONS_PATH,
  PUBLISHING_ONBOARDING_PATH,
  PUBLISHING_PATH,
  SUPPORT_CONTACT_PATH,
} from '../../types/constants/paths';
import closeButton from '../../../node_modules/uswds/src/img/close.png';

import { Flag } from '../../flags';
import { desktopOnly, mobileOnly } from '../../styles/vadsUtils';
import { LargeScreenNavItemProps, MainNavItem, SubNav, SubNavEntry } from '../../components';
import Search from '../search/Search';

import './NavBar.scss';

import { getApiCategoryOrder, getApiDefinitions } from '../../apiDefs/query';

interface NavBarProps {
  isMobileMenuVisible: boolean;
  onMobileNavClose: () => void;
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
);

const NavBar = (props: NavBarProps): JSX.Element => {
  const [useDefaultNavLink, setUseDefaultNavLink] = React.useState(true);

  const navClasses = classNames(
    {
      'va-api-mobile-nav-visible': props.isMobileMenuVisible,
    },
    'va-api-nav',
    desktopOnly(),
    'medium-screen:vads-u-width--full',
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

  const apiDefs = getApiDefinitions();
  const apiCategoryOrder: string[] = getApiCategoryOrder();

  return (
    <nav className={navClasses}>
      <div
        className={classNames(
          'vads-u-padding--2p5',
          'vads-u-border-color--white',
          'medium-screen:vads-u-border-top--1px',
          'medium-screen:vads-u-margin-x--4',
          'medium-screen:vads-u-padding--0',
          'medium-screen:vads-u-display--flex',
        )}
      >
        <div className={mobileOnly()}>
          <button
            className={classNames(
              'va-api-mobile-nav-close',
              'vads-u-display--block',
              'vads-u-margin-top--0',
              'vads-u-margin-right--neg1',
              'vads-u-margin-bottom--2',
              'vads-u-padding--0',
            )}
            onClick={props.onMobileNavClose}
            type="button"
          >
            <img
              src={closeButton}
              alt="Close button"
              className={classNames('vads-u-color--gray-dark', 'vads-u-max-width--none')}
            />
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
          <li className={navItemStyles(true)}>
            <MainNavItem
              targetUrl="/explore"
              largeScreenProps={sharedNavItemProps}
              excludeSmallScreen
              className={navLinkStyles}
            >
              Documentation
            </MainNavItem>
            <SubNav name="Documentation">
              <SubNavEntry onClick={props.onMobileNavClose} to="/explore" id="all">
                Overview
              </SubNavEntry>
              {apiCategoryOrder.map(apiKey => (
                <Flag name={['categories', apiKey]} key={apiKey}>
                  <SubNavEntry
                    onClick={props.onMobileNavClose}
                    to={`/explore/${apiKey}`}
                    id={apiKey}
                  >
                    {apiDefs[apiKey].name}
                  </SubNavEntry>
                </Flag>
              ))}
            </SubNav>
          </li>
          <li className={navItemStyles()}>
            <MainNavItem
              onClick={props.onMobileNavClose}
              targetUrl="/news"
              largeScreenProps={sharedNavItemProps}
              className={navLinkStyles}
            >
              News
            </MainNavItem>
          </li>
          <li className={navItemStyles()}>
            <MainNavItem
              onClick={props.onMobileNavClose}
              targetUrl="/release-notes"
              largeScreenProps={sharedNavItemProps}
              className={navLinkStyles}
            >
              Release Notes
            </MainNavItem>
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
          <Flag name={[FLAG_API_PUBLISHING]}>
            <li className={navItemStyles()}>
              <MainNavItem
                targetUrl={PUBLISHING_PATH}
                largeScreenProps={sharedNavItemProps}
                excludeSmallScreen
                className={navLinkStyles}
              >
                API Publishing
              </MainNavItem>
              <SubNav name="API Publishing">
                <SubNavEntry onClick={props.onMobileNavClose} to={PUBLISHING_PATH} id="overview">
                  Overview
                </SubNavEntry>
                <SubNavEntry
                  onClick={props.onMobileNavClose}
                  to={PUBLISHING_ONBOARDING_PATH}
                  id="process"
                >
                  How publishing works
                </SubNavEntry>
                <SubNavEntry
                  onClick={props.onMobileNavClose}
                  to={PUBLISHING_EXPECTATIONS_PATH}
                  id="expectations"
                >
                  Expectations for APIs
                </SubNavEntry>
                <SubNavEntry
                  onClick={props.onMobileNavClose}
                  to={SUPPORT_CONTACT_PATH}
                  id="contact"
                >
                  Contact Us
                </SubNavEntry>
              </SubNav>
            </li>
          </Flag>
          <li className={classNames(navItemStyles(), mobileOnly())}>
            <a className={classNames(navLinkStyles)} href="https://valighthouse.statuspage.io">
              API Status <FontAwesomeIcon icon={faExternalLinkAlt} />
            </a>
          </li>
        </ul>
        <a
          className={classNames(
            desktopOnly(),
            'va-api-u-margin-y--auto',
            'vads-u-margin-left--auto',
            'vads-u-color--white',
            'vads-u-text-decoration--none',
            'vads-u-font-size--base',
          )}
          href="https://valighthouse.statuspage.io"
        >
          API Status <FontAwesomeIcon icon={faExternalLinkAlt} />
        </a>
        <div className={mobileOnly()}>
          <div className={classNames('va-api-nav-secondary', 'vads-u-margin-y--2')}>
            <Link
              onClick={props.onMobileNavClose}
              to="/apply"
              className={classNames('usa-button', 'vads-u-width--full')}
            >
              Request an API Key
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export { NavBar };
