import React, { FC } from 'react';
import classNames from 'classnames';
import toHtmlId from '../../toHtmlId';
import { mobileOnly } from '../../styles/vadsUtils';
import minusIcon from '../../../node_modules/uswds/src/img/minus.png';
import plusIcon from '../../../node_modules/uswds/src/img/plus.png';

interface SubNavProps {
  name: string;
}

const expandNavButtonStyles = classNames(
  'va-api-nav-button',
  'vads-u-display--flex',
  'vads-u-flex-wrap--nowrap',
  'vads-u-align-items--center',
  'vads-u-justify-content--space-between',
  'vads-u-width--full',
  'vads-u-margin--0',
  'vads-u-padding--1',
  'medium-screen:vads-u-padding--1p5',
  'vads-u-color--gray-dark',
  'vads-u-font-weight--normal',
  'vads-u-line-height--4',
  'vads-u-text-decoration--none',
);

const listStyles = classNames('va-api-sub-nav', 'vads-u-margin-y--0', 'vads-u-padding-left--0');

const SubNav: FC<SubNavProps> = ({ children, name }) => {
  const [subNavVisible, setSubNavVisible] = React.useState(false);

  const toggleSubNav = (): void => {
    setSubNavVisible(!subNavVisible);
  };

  return (
    <div className={mobileOnly()}>
      <button
        className={expandNavButtonStyles}
        onClick={(): void => toggleSubNav()}
        type="button"
        aria-expanded={subNavVisible}
        aria-controls={toHtmlId(`${name}-sub-nav`)}
      >
        <span>{name}</span>
        <img src={subNavVisible ? minusIcon : plusIcon} alt="" className="va-api-expand-nav-icon" />
      </button>
      {subNavVisible && (
        <ul className={listStyles} id={toHtmlId(`${name}-sub-nav`)}>
          {children}
        </ul>
      )}
    </div>
  );
};

export { SubNav };
