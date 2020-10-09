import * as React from 'react';

import classNames from 'classnames';
import { Location } from 'history';
import { match } from 'react-router';
import { NavHashLink, NavHashLinkProps } from 'react-router-hash-link';
import { onHashAnchorClick } from '../../utils/clickHandlers';
import './SideNav.scss';

export interface SideNavEntryProps extends NavHashLinkProps {
  name: string | JSX.Element;
  className?: string;
  subNavLevel: number;
}

// Constructs a NavHashLink in the sidebar that also takes into account the
// hash when determining if it's active
const SideNavEntry = (props: SideNavEntryProps): JSX.Element => {
  // The isActive prop receives two arguments: a `match` object representing
  // the original determination, and the current location. The match algorithm
  // used by react-router only takes into account the path, and by default will
  // include partial matches according to the https://github.com/pillarjs/path-to-regexp
  // implementation.
  // `navHashLinkIsActive` is both more and less strict than the default implementation:
  // there are cases where the original would return false and this function returns true,
  // and vice versa.
  const navHashLinkIsActive = (pathMatch: match, location: Location): boolean => {
    const withoutTrailingSlash = (path: string) => path.replace(/\/$/, '');

    let pathname: string;
    let hash: string;
    if (typeof props.to === 'string') {
      const url = new URL(props.to, 'http://example.com');
      pathname = url.pathname;
      hash = url.hash;
    } else {
      pathname = props.to.pathname || '';
      hash = props.to.hash || '';
    }
    const to = withoutTrailingSlash(pathname) + hash;
    const currentPath = withoutTrailingSlash(location.pathname);

    // If the location with hash exactly matches our navlink's `to` then
    // we can return true, regardless of the `exact` prop
    if (to === `${currentPath}${location.hash}`) {
      return true;
    }

    // Handle two cases: a path match where the hashes match, or when the hashes
    // match and `to` doesn't have a path
    if ((pathMatch || to.startsWith('#')) && location.hash && hash === location.hash) {
      return true;
    }
    // Fall back to the native implementation which does partial matching
    if (!props.exact) {
      return !!pathMatch;
    }
    return false;
  }; // tslint:disable-line: semicolon

  // Omit unneeded parent props from NavLink
  const { name, className, subNavLevel, ...navLinkProps } = props;

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
  subNavLevel: 0,
};

export { SideNavEntry };
