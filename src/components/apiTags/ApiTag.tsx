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
}

/**
 * Tag Configuration
 */
const apiTagConfig: APITagConfiguration[] = [];

apiTagConfig[tagTypes.OpenData] = {
  background: 'vads-u-background-color--primary-alt-light',
  label: 'Open Data',
};

apiTagConfig[tagTypes.VAInternalOnly] = {
  background: 'vads-u-background-color--gold',
  label: 'Internal VA use only',
};

/**
 *  APITag Component
 */
const ApiTag = ({ type }: ApiTagProps): JSX.Element => (
  <div className={classNames('api-tags', 'vads-u-font-size--sm')}>
    {/*  added a span with a dash to slow down the screen reader so the checkbox text does not run into the label.
    The issue that this sort of hacky solution is addressing only occurs in voice over/chrome, as far as we have seen.
    When researching the screen reader, I found that the best way to get a pause is to insert a dash or period.
    With the absolute position and negative px, the additional dsh should not be seen anywhere else and in fact I checked
    the places it is used.
    */}
    <span
      className={classNames('screen-reader-punctuation')}
    >
      {' - '}
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
