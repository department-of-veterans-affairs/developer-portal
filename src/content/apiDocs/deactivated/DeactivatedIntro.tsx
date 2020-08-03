import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import * as React from 'react';

import './DeactivatedIntro.scss';

const DeactivatedIntro = () => {

  return (
    <div className={classNames(
      'vads-u-display--flex',
    )}>
      <div className={classNames(
        'deactivated-intro-flag',
        'vads-u-background-color--primary-alt-dark',
      )} />
      <div className={classNames(
        'vads-u-flex--1',
        'vads-u-display--flex',
        'vads-u-align-items--center',
        'vads-u-padding-x--3',
        'vads-u-background-color--gray-light-alt',
      )}>
        <FontAwesomeIcon icon={faInfoCircle} className={classNames('vads-u-margin-right--2')} />
        <p className={classNames('vads-u-font-weight--bold')}>This is a repository for deactivated APIs and related documentation and release notes.</p>
      </div>
    </div>
  );
};

export default DeactivatedIntro;