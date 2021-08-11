import classNames from 'classnames';
import * as React from 'react';

import './ApiTags.scss';

const TrustedPartnerOnlyTag = (): JSX.Element => (
  <div className={classNames('api-tags', 'vads-u-font-size--sm')}>
    <span
      className={classNames(
        'vads-u-padding-y--0p5',
        'vads-u-padding-x--1',
        'vads-u-background-color--gold',
        'vads-u-color--black',
      )}
    >
      Internal VA use only{/* Trusted Partner use only */}
    </span>
  </div>
);

export default TrustedPartnerOnlyTag;
