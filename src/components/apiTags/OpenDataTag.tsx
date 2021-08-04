import classNames from 'classnames';
import * as React from 'react';

import './ApiTags.scss';

const OpenDataTag = (): JSX.Element => (
  <div className={classNames('api-tags', 'vads-u-margin-bottom--1p5', 'vads-u-font-size--sm')}>
    <span
      className={classNames(
        'vads-u-padding-y--0p5',
        'vads-u-padding-x--1',
        'vads-u-background-color--primary-alt-light',
        'vads-u-color--black',
      )}
    >
      Open Data
    </span>
  </div>
);

export default OpenDataTag;
