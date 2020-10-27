import * as React from 'react';

import classNames from 'classnames';
import { Location, LocationDescriptor } from 'history';
import { match as Match } from 'react-router';
import { NavHashLink, NavHashLinkProps } from 'react-router-hash-link';
import { onHashAnchorClick } from '../../utils/clickHandlers';
import './SideNav.scss';

export interface SideNavEntryProps extends NavHashLinkProps {
  name: string | JSX.Element;
  className?: string;
  subNavLevel: number;
  sharedAnchors: string[];
}

/**
 * Constructs a NavHashLink in the sidebar that also takes into account the
 * hash when determining if it's active
 */
const SideNavEntry = (props: SideNavEntryProps): JSX.Element => {
  /**
   * The isActive prop receives two arguments: a `match` object representing
   * the original determination, and the current location. The match algorithm
   * used by react-router only takes into account the path, and by default will
   * include partial matches according to the https://github.com/pillarjs/path-to-regexp
   * implementation.
   */
  const navHashLinkIsActive = (pathMatch: Match | null, location: Location): boolean => {
    const withoutTrailingSlash = (path: string) => path.replace(/\/$/, '');

    let pathname: string;
    let hash: string;
    let to: LocationDescriptor =
      typeof props.to === 'function' ? props.to(location) : props.to;

    if (typeof to === 'string') {
      const url = new URL(to, 'http://example.com');
      ({
        hash,
        pathname,
      } = url);
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
      /**
       * exact path match + exact hash match = exact match overall. nav links with a hash require
       * both regardless of props.exact because partial path matches aren't applicable.
       */
      return !!pathMatch?.isExact && hash === location.hash;
    } else if (props.exact) {
      /**
       * allow "exact" matches for some anchors that are shared across the site if the nav link
       * does not include a hash.
       */
      const hashMatch: boolean = !location.hash || props.sharedAnchors.includes(location.hash);
      return !!pathMatch && hashMatch;
    } else {
      /**
       * default partial matching. since the nav link doesn't have a hash, partial matching
       * works whether or not the location has a hash.
       */
      return !!pathMatch;
    }
  };

  // Omit unneeded parent props from NavLink
  /* eslint-disable @typescript-eslint/no-unused-vars -- omit sharedAnchors from navLinkProps */
  const { name, className, subNavLevel, sharedAnchors, ...navLinkProps } = props;
  /* eslint-enable @typescript-eslint/no-unused-vars */

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
          className,
        )}
        activeClassName={classNames('va-api-active-sidenav-link', 'vads-u-font-weight--bold', {
          'vads-u-border-color--cool-blue': subNavLevel === 0,
          'vads-u-border-left--5px': subNavLevel === 0,
        })}
        isActive={navHashLinkIsActive}
        onClick={onHashAnchorClick}
        {...navLinkProps}
      >
        {name}
      </NavHashLink>
      {props.children && (
        <ul
          className={classNames(
            'va-api-sidenav-sub-list',
            'vads-u-margin-y--0',
            'vads-u-padding-left--0',
          )}
        >
          {props.children}
        </ul>
      )}
    </li>
  );
};

SideNavEntry.defaultProps = {
  sharedAnchors: ['#main', '#page-header'],
  subNavLevel: 0,
};

export { SideNavEntry };
