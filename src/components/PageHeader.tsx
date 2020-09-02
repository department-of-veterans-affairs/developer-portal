import classNames from 'classnames';
import * as React from 'react';

import './PageHeader.scss';

interface PageHeaderProps {
  className?: string;
  description?: string;
  halo?: string;
  header: string;
  id?: string;
  containerId?: string;
}

export default function PageHeader(props: PageHeaderProps) {
  return (
    <div id={props.containerId} className={props.className}>
      {props.halo && (
        <div className={classNames('header-halo', 'vads-u-color--gray')}>{props.halo}</div>
      )}
      <h1 id={props.id} className={classNames('vads-u-margin-top--0', 'vads-u-margin-bottom--2')}>
        {props.header}
      </h1>
      {props.description && (
        <h2 className={classNames('vads-u-font-size--lg')}>{props.description}</h2>
      )}
    </div>
  );
}
