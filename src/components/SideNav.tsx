import * as React from 'react';

import classNames from 'classnames';
import { Location } from 'history';
import { match } from 'react-router';
import { NavHashLink, NavHashLinkProps } from 'react-router-hash-link';
import * as Stickyfill from 'stickyfilljs';

import '../components/SideNav.scss';

export interface ISideNavEntryProps extends NavHashLinkProps {
  name: string | JSX.Element;
}

// Constructs a NavHashLink in the sidebar that also takes into account the
// hash when determining if it's active
export class SideNavEntry extends React.Component<ISideNavEntryProps> {
  // The isActive prop receives two arguments: a `match` object representing
  // the original determination, and the current location. The match algorithm
  // used by react-router only takes into account the path, and by default will
  // include partial matches according to the https://github.com/pillarjs/path-to-regexp
  // implementation.
  // `navHashLinkIsActive` is both more and less strict than the default implementation:
  // there are cases where the original would return false and this function returns true,
  // and vice versa.
  public navHashLinkIsActive = (pathMatch: match, location: Location): boolean => {
    const withoutTrailingSlash = (path: string) => {
      return path.replace(/\/$/, '');
    };

    let pathname: string;
    let hash: string;
    if (typeof this.props.to === 'string') {
      const url = new URL(this.props.to, 'http://example.com');
      pathname = url.pathname;
      hash = url.hash;
    } else {
      pathname = this.props.to.pathname || '';
      hash = this.props.to.hash || '';
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
    if (!this.props.exact) {
      return !!pathMatch;
    }
    return false;
  }; // tslint:disable-line: semicolon

  public render() {
    // Omit unneeded parent props from NavLink
    const { name, ...navLinkProps } = this.props;

    return (
      <li>
        <NavHashLink
          activeClassName="va-api-active-sidenav-link"
          isActive={this.navHashLinkIsActive}
          {...navLinkProps}
        >
          {this.props.name}
        </NavHashLink>
        {this.props.children && <ul className="usa-sidenav-sub_list">{this.props.children}</ul>}
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
      <nav
        className={classNames(
          'vadp-side-nav',
          'vads-l-col--12',
          'medium-screen:vads-l-col--4',
          'vads-u-padding-right--5',
          'sticky',
          this.props.className,
        )}
        aria-label={this.props.ariaLabel}
        ref={this.navRef}
      >
        <ul className="usa-sidenav-list">{this.props.children}</ul>
      </nav>
    );
  }
}
