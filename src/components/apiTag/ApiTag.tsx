import React from 'react';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import './ApiTag.scss';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

export interface ApiTagProps {
  showLock?: boolean;
  tagName: string;
}

export const ApiTag = ({ showLock, tagName }: ApiTagProps): JSX.Element => (
  <span
    className={classNames(
      'api-tag',
      'vads-u-background-color--gray-lightest',
      'vads-u-color--base',
    )}
  >
    {showLock && (
      <FontAwesomeIcon
        className={classNames('api-tag-fa-lock', 'vads-u-color--gray-medium')}
        icon={faLock as IconProp}
      />
    )}
    <span>{tagName.replace(/-/g, ' ')}</span>
  </span>
);
