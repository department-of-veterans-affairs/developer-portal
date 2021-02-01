import React, { FC } from 'react';
import classNames from 'classnames';
import { mobileOnly } from '../../styles/vadsUtils';
import minusIcon from '../../../node_modules/uswds/src/img/minus.png';
import plusIcon from '../../../node_modules/uswds/src/img/plus.png';

interface SubNavProps {
  name: string;
  alt: string;
}

const expandNavButtonStyles = classNames(
  'va-api-nav-button',
  'vads-u-color--gray-dark',
  'vads-u-display--block',
  'vads-u-line-height--4',
  'vads-u-padding--1',
  'vads-u-text-decoration--none',
  'medium-screen:vads-u-padding--1p5',
  'vads-u-display--flex',
  'vads-u-flex-wrap--nowrap',
  'vads-u-justify-content--space-between',
  'vads-u-align-items--center',
  'vads-u-font-weight--normal',
  'vads-u-margin--0',
  'vads-u-width--full',
);

const listStyles = classNames('va-api-sub-nav', 'vads-u-margin-y--0', 'vads-u-padding-left--0');

const SubNav: FC<SubNavProps> = ({ children, name, alt }) => {
  const [subNavVisible, setSubNavVisible] = React.useState(false);

  const toggleSubNav = (): void => {
    setSubNavVisible(!subNavVisible);
  };

  return (
    <div className={mobileOnly()}>
      <button className={expandNavButtonStyles} onClick={(): void => toggleSubNav()} type="button">
        <span>{name}</span>
        <img
          src={subNavVisible ? minusIcon : plusIcon}
          alt={alt}
          aria-label={alt}
          className="va-api-expand-nav-icon"
        />
      </button>
      {subNavVisible && <ul className={listStyles}>{children}</ul>}
    </div>
  );
};

export { SubNav };
