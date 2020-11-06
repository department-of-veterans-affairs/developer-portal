import * as React from 'react';

import classNames from 'classnames';
import { HashLink } from 'react-router-hash-link';
import * as Stickyfill from 'stickyfilljs';

import { onHashAnchorClick } from '../../utils/clickHandlers';
import './SideNav.scss';

interface SideNavProps {
  className?: string;
  ariaLabel: string;
  children: React.ReactNode;
}

const SideNav = (props: SideNavProps): JSX.Element => {
  const navRef = React.createRef<HTMLDivElement>();

  React.useEffect(() => {
    if (navRef.current) {
      /**
       * Stickyfill lets us use `position: sticky` in browsers that may not
       * support it. The library requires a dom reference to work, hence the ref.
       */
      Stickyfill.addOne(navRef.current);
    }
  }, [navRef]);

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
          props.className,
        )}
        aria-label={props.ariaLabel}
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
      </nav>
    </div>
  );
};

export { SideNav };
