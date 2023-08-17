import * as React from 'react';
import classNames from 'classnames';
import { NavLink, To, useLocation } from 'react-router-dom';
import './SideNav.scss';

export interface SideNavEntryProps {
  name: string | JSX.Element;
  className?: string;
  subNavLevel?: number;
  sharedAnchors?: string[];
  forceAriaCurrent?: boolean;
  if?: boolean;
  to: To;
  end?: boolean;
}

const SideNavEntry: React.FC<SideNavEntryProps> = (props): JSX.Element => {
  // Omit unneeded parent props from NavLink
  /* eslint-disable @typescript-eslint/no-unused-vars -- omit sharedAnchors from navLinkProps */
  const {
    children,
    className,
    forceAriaCurrent,
    name,
    subNavLevel,
    sharedAnchors,
    ...navLinkProps
  } = props;

  const location = useLocation();
  const { hash } = location;

  return (
    <li
      className={classNames(
        'va-api-sidenav-entry',
        'vads-u-border-top--2px',
        'vads-u-border-color--gray-lighter',
        'vads-u-margin-y--0',
      )}
    >
      <NavLink
        className={
          ({ isActive }): string => {
            let hashIsActive = false;
            const hashExists = typeof hash === 'string' && hash.length > 0;
            const toIncludesHash = (hashString: string): boolean => {
              if (typeof props.to === 'string') {
                return props.to.includes(hashString);
              }

              return props.to.hash === hashString;
            };

            if (hashExists && toIncludesHash(hash)) {
              hashIsActive = true;
            }

            return classNames(`va-api-nav-level-${subNavLevel ?? 0}`, className, {
              'va-api-active-sidenav-link': toIncludesHash('#') ? hashIsActive : isActive,
              'vads-u-font-weight--bold': toIncludesHash('#') ? hashIsActive : isActive,
            });
          }
          // eslint-disable-next-line react/jsx-curly-newline
        }
        {...navLinkProps}
      >
        <>
          {name}
          <i className="fas fa-star" />
        </>
      </NavLink>
      {children && (
        <ul
          className={classNames(
            'va-api-sidenav-sub-list',
            'vads-u-margin-y--0',
            'vads-u-padding-left--0',
          )}
        >
          {children}
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
