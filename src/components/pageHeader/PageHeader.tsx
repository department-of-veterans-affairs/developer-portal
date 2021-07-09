import classNames from 'classnames';
import * as React from 'react';

import { PAGE_HEADER_AND_HALO_ID, PAGE_HEADER_ID } from '../../types/constants';
import './PageHeader.scss';

interface PageHeaderProps {
  className?: string;
  description?: string;
  halo?: string;
  header: string;
}

const PageHeader = (props: PageHeaderProps): JSX.Element => (
  <div id={PAGE_HEADER_AND_HALO_ID} className={props.className}>
    {props.halo && (
      <div className={classNames('header-halo', 'vads-u-color--gray')}>{props.halo}</div>
    )}
    <h1
      id={PAGE_HEADER_ID}
      className={classNames('vads-u-margin-top--0', 'vads-u-margin-bottom--2')}
      tabIndex={-1}
    >
      {props.header}
    </h1>
    {props.description && (
      <p
        className={classNames(
          'vads-u-font-size--lg',
          'vads-u-font-weight--bold',
          'vads-u-margin-y--2',
        )}
      >
        {props.description}
      </p>
    )}
  </div>
);

export { PageHeader };
