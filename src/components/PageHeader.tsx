import classNames from 'classnames';
import * as React from 'react';

import { PAGE_HEADER_ID } from '../types/constants';
import './PageHeader.scss';

interface PageHeaderProps {
  className?: string;
  description?: string;
  halo?: string;
  header: string;
  containerId?: string;
}

const PageHeader = (props: PageHeaderProps): JSX.Element => (
  <div id={props.containerId} className={props.className}>
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
      <h2 className={classNames('vads-u-font-size--lg')}>{props.description}</h2>
    )}
  </div>
);

export default PageHeader;
