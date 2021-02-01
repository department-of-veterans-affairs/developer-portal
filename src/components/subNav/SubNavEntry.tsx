import React, { FC } from 'react';
import classNames from 'classnames';
import { NavLink } from 'react-router-dom';

const itemStyles = classNames(
  'vads-u-border-top--1px',
  'vads-u-border-color--gray-lighter',
  'vads-u-margin-bottom--0',
  'vads-u-padding-y--1',
);

const linkStyles = classNames(
  'vads-u-color--gray-dark',
  'vads-u-display--block',
  'vads-u-padding-left--2p5',
  'vads-u-text-decoration--none',
  'vads-u-width--full',
);

interface SubNavEntryProps {
  onClick: () => void;
  to: string;
  key: string;
}

const SubNavEntry: FC<SubNavEntryProps> = ({ children, onClick, to, key }) => (
  <li className={itemStyles} key={key}>
    <NavLink
      onClick={onClick}
      exact
      to={to}
      className={linkStyles}
      activeClassName="va-api-active-sub-nav"
    >
      {children}
    </NavLink>
  </li>
);

export { SubNavEntry };
