import * as React from 'react';

import classNames from 'classnames';
import './SideNav.scss';

export interface ExternalLinkProps {
  href: string;
  name: string | JSX.Element;
  subNavLevel: number;
}

const SideNavExternalLink = (props: ExternalLinkProps): JSX.Element => {
  // Omit unneeded parent props from NavLink
  /* eslint-disable @typescript-eslint/no-unused-vars -- omit sharedAnchors from navLinkProps */
  const { name, subNavLevel, ...navLinkProps } = props;
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
      <a
        className={classNames('vads-u-padding--1p5', 'vads-u-color--base', {
          'vads-u-padding-left--4': subNavLevel === 1,
          'vads-u-padding-left--7': subNavLevel === 2,
        })}
        {...navLinkProps}
      >
        {name}
      </a>
    </li>
  );
};

SideNavExternalLink.defaultProps = {
  subNavLevel: 0,
};

export { SideNavExternalLink };
