import classNames from 'classnames';
import * as React from 'react';

import AlertBox from '@department-of-veterans-affairs/component-library/AlertBox';
import { PAGE_HEADER_AND_HALO_ID, PAGE_HEADER_ID } from '../../types/constants';
import './PageHeader.scss';

interface PageHeaderProps {
  className?: string;
  description?: string;
  halo?: string;
  header: string;
  veteranRedirect?: {
    message: string;
    linkUrl: string;
    linkText: string;
  };
  apiCategoryKey?: string;
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
    {props.veteranRedirect && (
      <AlertBox status="info" key={props.apiCategoryKey} className={classNames('vads-u-margin-bottom--2', 'vads-u-padding-y--1')}>
        {props.veteranRedirect.message}&nbsp;
        <a href={props.veteranRedirect.linkUrl}>{props.veteranRedirect.linkText}</a>.
      </AlertBox>
    )}
    {props.description && (
      <h2 className={classNames('vads-u-font-size--lg')}>{props.description}</h2>
    )}
  </div>
);

export { PageHeader };
