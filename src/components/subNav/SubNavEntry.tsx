import React, { FC } from 'react';
import classNames from 'classnames';
import { NavLink, To } from 'react-router-dom';

const itemStyles = classNames(
  'vads-u-border-top--1px',
  'vads-u-border-color--gray-lighter',
  'vads-u-margin-bottom--0',
);

const linkStyles = classNames(
  'vads-u-color--gray-dark',
  'vads-u-display--block',
  'vads-u-padding-left--4',
  'vads-u-padding-right--1',
  'vads-u-padding-y--2',
  'vads-u-text-decoration--none',
  'vads-u-width--full',
);

interface SubNavEntryProps {
  // the onClick prop is used to close the mobile nav, not for anything related to the native link behavior
  onClick: () => void;
  to: To;
  id: string;
}

const SubNavEntry: FC<SubNavEntryProps> = ({ children, onClick, to, id }) => (
  <li className={itemStyles} key={id}>
    <NavLink
      onClick={onClick}
      to={to}
      className={({ isActive }): string =>
        classNames(linkStyles, { 'va-api-active-sub-nav': isActive })
      }
    >
      {children}
    </NavLink>
  </li>
);

export { SubNavEntry };
