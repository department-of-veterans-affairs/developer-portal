import * as React from 'react';
import classNames from 'classnames';
import { NavLink, To, useLocation } from 'react-router-dom';
import './SideNav.scss';

export interface SideNavEntryProps {
  name: string | JSX.Element;
  className?: string;
  subNavLevel?: number;
  to: To;
  end?: boolean;
}

const SideNavEntry: React.FC<SideNavEntryProps> = (props): JSX.Element => {
  const { children, className, name, subNavLevel, ...navLinkProps } = props;

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
        className={({ isActive }): string => {
          let hashIsActive = false;
          const locationHashExists = typeof hash === 'string' && hash.length > 0;
          const toIncludesHash = (hashString: string): boolean => {
            if (typeof props.to === 'string') {
              return props.to.includes(hashString);
            }

            return props.to.hash?.includes(hashString) ?? false;
          };

          if (isActive && locationHashExists && toIncludesHash(hash)) {
            hashIsActive = true;
          }

          return classNames(`va-api-nav-level-${subNavLevel ?? 0}`, className, {
            'va-api-active-sidenav-link': toIncludesHash('#') ? hashIsActive : isActive,
            'vads-u-font-weight--bold': toIncludesHash('#') ? hashIsActive : isActive,
          });
        }}
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
  subNavLevel: 0,
};

export { SideNavEntry };
