import React from 'react';
import classNames from 'classnames';
import { Link, useLocation } from 'react-router-dom';
import * as Stickyfill from 'stickyfilljs';
import './SideNav.scss';

interface SideNavProps {
  className?: string;
  ariaLabel: string;
  children: React.ReactNode;
  containerClassName?: string;
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
  const [showSectionNav, setShowSectionNav] = React.useState(false);
  const navRef = React.useRef<HTMLDivElement>(null);
  const location = useLocation();

  React.useEffect(() => {
    applyStickiness(navRef.current);
  }, [navRef]);

  React.useEffect(() => {
    // Close the section nav on page change
    setShowSectionNav(false);
  }, [location]);

  const toggleSectionNav = (e: React.MouseEvent<HTMLButtonElement>): void => {
    setShowSectionNav(!showSectionNav);
    e.currentTarget.blur();
  };

  return (
    <div
      className={classNames(
        'vads-l-col--12',
        // 'vads-u-padding-right--5',
        'medium-screen:vads-l-col--3',
        props.containerClassName,
      )}
    >
      <Link
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
      >
        Skip Page Navigation
      </Link>
      <nav
        className={classNames('va-api-side-nav', props.className)}
        aria-label={props.ariaLabel}
        ref={navRef}
      >
        <button
          className={classNames('nav-in-this-section', 'medium-screen:vads-u-display--none', {
            open: showSectionNav,
          })}
          type="button"
          onClick={(e): void => toggleSectionNav(e)}
          key={`section-nav-${showSectionNav ? 'open' : 'closed'}`}
        >
          In this section
          {showSectionNav ? <i className="fas fa-times" /> : <i className="fas fa-bars" />}
        </button>
        <ul
          className={classNames(
            'usa-sidenav-list',
            {
              'vads-u-display--none': !showSectionNav,
            },
            'medium-screen:vads-u-display--block',
            'va-api-sidenav-list',
            'vads-u-background-color--white',
            'vads-u-border-bottom--2px',
            'vads-u-border-top--0',
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
