import classNames from 'classnames';
import * as React from 'react';

import './ApiTags.scss';

export enum tagTypes {
    OpenData = 0,
    TrustedPartner = 1,
    VAInternalOnly = 2,
}

interface ApiTagProps  {
    type: number;
}

const ApiTag = ({ type }: ApiTagProps): JSX.Element => {
    let label = '';
    let background = '';

    switch (type) {
        case tagTypes.OpenData:
            label = 'Open Data';
            background = 'vads-u-background-color--primary-alt-light';
            break;

        case tagTypes.TrustedPartner:
            label = 'Internal VA use only';
            background = 'vads-u-background-color--gold';
            break;

        case tagTypes.VAInternalOnly:
            label = 'Internal VA use only';
            background = 'vads-u-background-color--gold';
            break;
        default:
            label = 'Internal VA use only';
            background = 'vads-u-background-color--gold';
            break;
    }

    return (
      <div className={classNames('api-tags', 'vads-u-font-size--sm')}>
        <span
          className={classNames(
        'vads-u-padding-y--0p5',
        'vads-u-padding-x--1',
        background,
        'vads-u-color--black',
      )}
        >
          {label}
        </span>
      </div>
);
 };

export default ApiTag;
