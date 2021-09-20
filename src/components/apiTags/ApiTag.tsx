import classNames from 'classnames';
import * as React from 'react';

import './ApiTags.scss';

/**
 * Tag Types
 */
export enum tagTypes {
  OpenData = 0,
  VAInternalOnly = 1,
}

interface ApiTagProps {
  type: number;
}

interface APITagConfiguration {
  label: string;
  background: string;
  screenReaderLabel: string;
}

/**
 * Tag Configuration
 */
const apiTagConfig: APITagConfiguration[] = [];

apiTagConfig[tagTypes.OpenData] = {
  background: 'vads-u-background-color--primary-alt-light',
  label: 'Open Data',
  screenReaderLabel: ' - ',
};

apiTagConfig[tagTypes.VAInternalOnly] = {
  background: 'vads-u-background-color--gold',
  label: 'Internal VA use only',
  screenReaderLabel: ' - ',
};

/**
 *  APITag Component
 */
const ApiTag = ({ type }: ApiTagProps): JSX.Element => (
  <div className={classNames('api-tags', 'vads-u-font-size--sm')}>
    <span
      className={classNames(
        'vads-u-background-color--gray-lightest'
      )}
    >  
    {apiTagConfig[type].screenReaderLabel} 
      </span>
    <span
      className={classNames(
        'vads-u-padding-y--0p5',
        'vads-u-padding-x--1',
        apiTagConfig[type].background,
        'vads-u-color--black',
      )}
    >
      {apiTagConfig[type].label}
    </span>
  </div>
);

export default ApiTag;
