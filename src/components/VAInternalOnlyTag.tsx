import classNames from 'classnames';
import * as React from 'react';

import './VAInternalOnlyTag.scss';

export default function VAInternalOnlyTag() {
  return (
    <div className={classNames(
      'va-internal-tag',
      'vads-u-margin-bottom--1p5',
      'vads-u-font-size--sm',
    )}>
      <span className={classNames(
        'vads-u-padding-y--0p5',
        'vads-u-padding-x--1',
        'vads-u-background-color--gold',
        'vads-u-color--black',
      )}>
        Internal VA use only
      </span>
    </div>
  );
}
