import * as React from 'react';

import classNames from 'classnames';
import { Location, LocationDescriptor } from 'history';
import { match as Match } from 'react-router';
import { HashLink, NavHashLink, NavHashLinkProps } from 'react-router-hash-link';
import * as Stickyfill from 'stickyfilljs';

import '../components/SideNav.scss';
import { onHashAnchorClick } from '../utils/clickHandlers';

export interface ISideNavEntryProps extends NavHashLinkProps {
  name: string | JSX.Element;
  className?: string;
  subNavLevel: number;
  sharedAnchors: string[];
}

// Constructs a NavHashLink in the sidebar that also takes into account the
// hash when determining if it's active
export class SideNavEntry extends React.Component<ISideNavEntryProps> {
  public static defaultProps = {
    sharedAnchors: ['#main', '#page-header'],
    subNavLevel: 0,
  };

  // The isActive prop receives two arguments: a `match` object representing
  // the original determination, and the current location. The match algorithm
  // used by react-router only takes into account the path, and by default will
  // include partial matches according to the https://github.com/pillarjs/path-to-regexp
  // implementation.
  public navHashLinkIsActive = (pathMatch: Match | null, location: Location): boolean => {
    const withoutTrailingSlash = (path: string) => {
      return path.replace(/\/$/, '');
    };

    let pathname: string;
    let hash: string;
    let to: LocationDescriptor =
      typeof this.props.to === 'function' ? this.props.to(location) : this.props.to;

    if (typeof to === 'string') {
      const url = new URL(to, 'http://example.com');
      pathname = url.pathname;
      hash = url.hash;
    } else {
      // object
      pathname = to.pathname || '';
      hash = to.hash || '';
    }

    to = withoutTrailingSlash(pathname) + hash;
    if (to.startsWith('#')) {
      // for an in-page anchor link, check that the link's destination is the same as the current hash
      return to === location.hash;
    } else if (hash) {
      // exact path match + exact hash match = exact match overall. nav links with a hash require 
      // both regardless of props.exact because partial path matches aren't applicable.
      return !!pathMatch?.isExact && hash === location.hash;
    } else if (this.props.exact) {
      // allow "exact" matches for some anchors that are shared across the site if the nav link
      // does not include a hash.
      const hashMatch: boolean = !location.hash || this.props.sharedAnchors.includes(location.hash);
      return !!pathMatch && hashMatch;
    } else {
      // default partial matching. since the nav link doesn't have a hash, partial matching 
      // works whether or not the location has a hash.
      return !!pathMatch;
    }
  };

  public render() {
    // Omit unneeded parent props from NavLink
    const { name, className, subNavLevel, sharedAnchors, ...navLinkProps } = this.props;

    return (
      <li
        className={classNames(
          'va-api-sidenav-entry',
          'vads-u-border-top--2px',
          'vads-u-border-color--gray-lighter',
          'vads-u-margin-y--0',
        )}
      >
        <NavHashLink
          className={classNames(
            'vads-u-padding--1p5',
            'vads-u-color--base',
            {
              'vads-u-padding-left--4': subNavLevel === 1,
              'vads-u-padding-left--7': subNavLevel === 2,
            },
            this.props.className,
          )}
          activeClassName={classNames('va-api-active-sidenav-link', 'vads-u-font-weight--bold', {
            'vads-u-border-color--cool-blue': subNavLevel === 0,
            'vads-u-border-left--5px': subNavLevel === 0,
          })}
          isActive={this.navHashLinkIsActive}
          onClick={onHashAnchorClick}
          {...navLinkProps}
        >
          {this.props.name}
        </NavHashLink>
        {this.props.children && (
          <ul
            className={classNames(
              'va-api-sidenav-sub-list',
              'vads-u-margin-y--0',
              'vads-u-padding-left--0',
            )}
          >
            {this.props.children}
          </ul>
        )}
      </li>
    );
  }
}

interface ISideNavProps {
  className?: string;
  ariaLabel: string;
}

// tslint:disable-next-line: max-classes-per-file
export default class SideNav extends React.Component<ISideNavProps> {
  private navRef = React.createRef<HTMLDivElement>();

  public componentDidMount() {
    if (this.navRef.current) {
      // Stickyfill lets us use `position: sticky` in browsers that may not
      // support it. The library requires a dom reference to work, hence the ref.
      Stickyfill.addOne(this.navRef.current);
    }
  }

  public render() {
    return (
      <div
        className={classNames(
          'vads-l-col--12',
          'vads-u-padding-right--5',
          'medium-screen:vads-l-col--4',
        )}
      >
        <HashLink
          className={classNames(
            'va-api-secondary-skip-nav',
            'vads-u-padding--1p5',
            'vads-u-margin-bottom--5',
            'vads-u-line-height--3',
            'vads-u-text-decoration--none',
            'vads-u-display--block',
            'vads-u-color--white',
          )}
          to="#page-header"
          onClick={onHashAnchorClick}
        >
          Skip Page Navigation
        </HashLink>
        <nav
          className={classNames(
            'va-api-side-nav',
            'vads-u-display--none',
            'medium-screen:vads-u-display--block',
            this.props.className,
          )}
          aria-label={this.props.ariaLabel}
          ref={this.navRef}
        >
          <ul
            className={classNames(
              'usa-sidenav-list',
              'va-api-sidenav-list',
              'vads-u-background-color--white',
              'vads-u-border-bottom--2px',
              'vads-u-border-left--2px',
              'vads-u-border-right--2px',
              'vads-u-border-color--gray-lighter',
            )}
          >
            {this.props.children}
          </ul>
        </nav>
      </div>
    );
  }
}
