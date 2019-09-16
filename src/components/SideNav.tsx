import * as React from 'react';

import classNames from 'classnames';
import { Location } from 'history';
import { match } from 'react-router';
import { NavHashLink, NavHashLinkProps } from 'react-router-hash-link';
import * as Stickyfill from 'stickyfilljs';

import '../components/SideNav.scss';

export interface ISideNavEntryProps extends NavHashLinkProps {
  name: string | JSX.Element;
  to: string; // Only allow the string form of the `to` prop
}

// Constructs a NavHashLink in the sidebar that also takes into account the
// hash when determining if it's active
export class SideNavEntry extends React.Component<ISideNavEntryProps> {
  // Override the default activeCheck to also match on hash
  public hashIsActive = (pathMatch: match, location: Location): boolean => {
    // Because we're not using the builtin check, we need our own logic
    // to handle trailing slashes
    const withoutTrailingSlash = (path: string) => {
      if (path.length === 1) {
        return path;
      }
      return path.replace(/\/$/, '');
    };

    const currentPath = withoutTrailingSlash(location.pathname);
    const to = withoutTrailingSlash(this.props.to);

    // Match on just the hash for anchor links with no path
    const onlyHashMatches = location.hash && to.endsWith(location.hash);
    if (this.props.exact) {
      return onlyHashMatches || to === `${currentPath}${location.hash}`;
    } else {
      return onlyHashMatches || currentPath.startsWith(to);
    }
  }; // tslint:disable-line: semicolon

  public render() {
    // Omit unneeded parent props from NavLink
    const { name, ...navLinkProps } = this.props;

    return (
      <li>
        <NavHashLink activeClassName="usa-current" isActive={this.hashIsActive} {...navLinkProps}>
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
export class SideNav extends React.Component<ISideNavProps> {
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
          'usa-width-one-third',
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
