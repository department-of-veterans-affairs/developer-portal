import classNames from 'classnames';
import * as React from 'react';

import './TrustedPartnerOnlyTag.scss';

export default function TrustedPartnerOnlyTag() {
  return (
    <div className={classNames(
      'trusted-partner-only-tag',
      'vads-u-margin-bottom--1p5',
      'vads-u-font-size--sm',
    )}>
      <span className={classNames(
        'vads-u-padding-y--0p5',
        'vads-u-padding-x--1',
        'vads-u-background-color--gold',
        'vads-u-color--black',
      )}>
        Trusted Partner use only
      </span>
    </div>
  );
}
