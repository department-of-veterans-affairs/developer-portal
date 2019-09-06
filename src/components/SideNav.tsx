import * as React from 'react';

import classNames from 'classnames';
import { Location } from 'history';
import { match } from 'react-router';
import { NavHashLink, NavHashLinkProps } from 'react-router-hash-link';
import * as Stickyfill from 'stickyfilljs';

import '../components/SideNav.scss'

interface ISideNavEntryProps extends NavHashLinkProps {
  name: string | JSX.Element;
  // flagName?: string
  to: string; // Only allow the string form of the `to` prop
}

function withoutTrailingSlash(path: string) {
  if (path.length === 1) {
    return path;
  }
  return path.replace(/\/$/, '');
}

// Constructs a NavHashLink in the sidebar that also takes into account the
// hash when determining if it's active
export class SideNavEntry extends React.Component<ISideNavEntryProps> {
  public render() {
    // Override the default activeCheck to also match on hash
    const hashMatch = (_: match, location: Location): boolean => {
      // Because we're not using the builtin check, we need our own logic
      // to handle trailing slashes
      const currentPath = withoutTrailingSlash(location.pathname);
      const to = withoutTrailingSlash(this.props.to);

      // Match on just the hash for anchor links with no path
      const onlyHashMatches = to === location.hash
      if (this.props.exact) {
        return onlyHashMatches || to === `${currentPath}${location.hash}`
      } else {
        return onlyHashMatches || currentPath.startsWith(to)
      }
    };

    // Omit unneeded parent props from NavLink
    const {name, ...NavLinkProps} = this.props;

    return (
      <li>
        <NavHashLink activeClassName="usa-current" isActive={hashMatch} {...NavLinkProps}>
          {this.props.name}
        </NavHashLink>
        {this.props.children && (
          <ul className="usa-sidenav-sub_list">{this.props.children}</ul>
        )}
      </li>
    );
  }
};

// tslint:disable-next-line: no-empty-interface
interface ISideNavProps {
  className?: string;
  ariaLabel: string;
}

// tslint:disable-next-line: max-classes-per-file
export class SideNav extends React.Component<ISideNavProps> {
  private navRef = React.createRef<HTMLDivElement>();

  public componentDidMount() {
    if (this.navRef.current) {
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
