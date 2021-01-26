import React from 'react';

import classNames from 'classnames';
import { HashLink } from 'react-router-hash-link';
import * as Stickyfill from 'stickyfilljs';

import './SideNav.scss';

interface SideNavProps {
  className?: string;
  children: React.ReactNode;
}

/**
 * Stickyfill lets us use `position: sticky` in browsers that may not
 * support it. The library requires a dom reference to work, hence the ref.
 */
export const applyStickiness = (objRef: Stickyfill.SingleOrMany<HTMLElement> | null): void => {
  if (objRef) {
    Stickyfill.addOne(objRef);
  }
};

const SideNav = (props: SideNavProps): JSX.Element => {
  const navRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    applyStickiness(navRef.current);
  }, [navRef]);

  return (
    <>
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
        to={{ ...location, hash: '#page-header' }}
      >
        Skip Page Navigation
      </HashLink>
      <div
        className={classNames(
          'va-api-side-nav',
          'vads-u-display--none',
          'medium-screen:vads-u-display--block',
          props.className,
        )}
        ref={navRef}
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
          {props.children}
        </ul>
      </div>
    </>
  );
};

export { SideNav };
