import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import * as React from 'react';
import { match as Match } from 'react-router';
import { Link, NavLink } from 'react-router-dom';

import closeButton from '../../../node_modules/uswds/src/img/close.png';
import minusIcon from '../../../node_modules/uswds/src/img/minus.png';
import plusIcon from '../../../node_modules/uswds/src/img/plus.png';

import { getApiCategoryOrder, getApiDefinitions } from '../../apiDefs/query';
import { Flag } from '../../flags';
import { desktopOnly, mobileOnly } from '../../styles/vadsUtils';
import MainNavItem, { ILargeScreenNavItemProps } from '../MainNavItem';
import Search from '../search/Search';

import './NavBar.scss';

interface INavBarProps {
  isMobileMenuVisible: boolean;
  onMobileNavClose: () => void;
}

interface IVisibleSubNavState {
  documentation: boolean;
}

interface INavBarState {
  useDefaultNavLink: boolean;
  visibleSubNavs: IVisibleSubNavState;
}

interface IDocumentationSubNavProps {
  onMobileNavClose: () => void;
}

function DocumentationSubNav(props: IDocumentationSubNavProps) {
  const apiDefs = getApiDefinitions();
  const apiCategoryOrder = getApiCategoryOrder();

  const itemStyles = classNames(
    'vads-u-border-top--1px',
    'vads-u-border-color--gray-lighter',
    'vads-u-margin-bottom--0',
    'vads-u-padding-y--1',
  );
  const linkStyles = classNames(
    'vads-u-color--gray-dark',
    'vads-u-display--block',
    'vads-u-padding-left--2p5',
    'vads-u-text-decoration--none',
    'vads-u-width--full',
  );

  return (
    <ul className={classNames('va-api-sub-nav', 'vads-u-margin-y--0', 'vads-u-padding-left--0')}>
      <li key="all" className={itemStyles}>
        <NavLink
          onClick={props.onMobileNavClose}
          exact={true}
          to="/explore"
          className={linkStyles}
          activeClassName="va-api-active-sub-nav"
        >
          Overview
        </NavLink>
      </li>
      {apiCategoryOrder.map(apiKey => (
        <Flag name={['categories', apiKey]} key={apiKey}>
          <li className={itemStyles}>
            <NavLink
              to={`/explore/${apiKey}`}
              onClick={props.onMobileNavClose}
              className={linkStyles}
              activeClassName="vads-u-font-weight--bold"
            >
              {apiDefs[apiKey].name}
            </NavLink>
          </li>
        </Flag>
      ))}
    </ul>
  );
}

const navItemStyles = (isFirstChild = false) =>
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

export default class NavBar extends React.Component<INavBarProps, INavBarState> {
  constructor(props: INavBarProps) {
    super(props);
    this.state = {
      useDefaultNavLink: true,
      visibleSubNavs: {
        documentation: false,
      },
    };
  }

  public render() {
    const navClasses = classNames(
      {
        'va-api-mobile-nav-visible': this.props.isMobileMenuVisible,
      },
      'va-api-nav',
      desktopOnly(),
      'medium-screen:vads-u-width--full',
    );

    const sharedNavItemProps: ILargeScreenNavItemProps = {
      isActive: this.checkActiveNavLink,
      onMouseEnter: this.toggleDefaultNavLink.bind(this, false),
      onMouseLeave: this.toggleDefaultNavLink.bind(this, true),
    };

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
              onClick={this.props.onMobileNavClose}
            >
              <img
                src={closeButton}
                alt="Close button"
                className={classNames('vads-u-color--gray-dark', 'vads-u-max-width--none')}
              />
            </button>
            <Search
              inMenu={true}
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
                excludeSmallScreen={true}
                className={navLinkStyles}
              >
                Documentation
              </MainNavItem>
              <div className={mobileOnly()}>
                <button
                  className={classNames(
                    'va-api-nav-button',
                    navLinkStyles,
                    'vads-u-display--flex',
                    'vads-u-flex-wrap--nowrap',
                    'vads-u-justify-content--space-between',
                    'vads-u-align-items--center',
                    'vads-u-font-weight--normal',
                    'vads-u-margin--0',
                    'vads-u-width--full',
                  )}
                  onClick={this.toggleDocumentationSubMenu}
                >
                  <span>Documentation</span>
                  <img
                    src={this.state.visibleSubNavs.documentation ? minusIcon : plusIcon}
                    alt="Expand Documentation"
                    aria-label="Expand Documentation"
                    className="va-api-expand-nav-icon"
                  />
                </button>
                {this.state.visibleSubNavs.documentation && (
                  <DocumentationSubNav onMobileNavClose={this.props.onMobileNavClose} />
                )}
              </div>
            </li>
            <li className={navItemStyles()}>
              <MainNavItem
                onClick={this.props.onMobileNavClose}
                targetUrl="/news"
                largeScreenProps={sharedNavItemProps}
                className={navLinkStyles}
              >
                News
              </MainNavItem>
            </li>
            <li className={navItemStyles()}>
              <MainNavItem
                onClick={this.props.onMobileNavClose}
                targetUrl="/release-notes"
                largeScreenProps={sharedNavItemProps}
                className={navLinkStyles}
              >
                Release Notes
              </MainNavItem>
            </li>
            <li className={navItemStyles()}>
              <MainNavItem
                onClick={this.props.onMobileNavClose}
                targetUrl="/support"
                largeScreenProps={sharedNavItemProps}
                className={navLinkStyles}
              >
                Support
              </MainNavItem>
            </li>
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
                onClick={this.props.onMobileNavClose}
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
  }

  private toggleDocumentationSubMenu = () => {
    this.setState((state: INavBarState) => ({
      visibleSubNavs: {
        documentation: !state.visibleSubNavs.documentation,
      },
    }));
  };

  private toggleDefaultNavLink = (useDefault: boolean) => {
    this.setState({ useDefaultNavLink: useDefault });
  };

  private checkActiveNavLink = (match: Match | null) => {
    if (!match) {
      return false;
    }
    return this.state.useDefaultNavLink;
  };
}
