import * as React from 'react';

import { PAGE_HEADER_AND_HALO_ID, PAGE_HEADER_ID } from '../../types/constants';
import './PageHeader.scss';

interface PageHeaderProps {
  className?: string;
  halo?: string;
  header: string;
  subText?: string;
}

const PageHeader = (props: PageHeaderProps): JSX.Element => {
  const { className, halo, header, subText } = props;

  return (
    <div id={PAGE_HEADER_AND_HALO_ID} className={className}>
      {halo && <div className="header-halo vads-u-color--gray">{halo}</div>}
      <h1
        data-cy="page-header"
        id={PAGE_HEADER_ID}
        className="page-header vads-u-margin-top--0 vads-u-margin-bottom--0"
        tabIndex={-1}
      >
        {/* Add space between header and subtext for screen readers */}
        {subText ? `${header} ` : header}
        {subText && <span className="header-sub-text vads-u-color--gray">{subText}</span>}
      </h1>
    </div>
  );
};

export { PageHeader };
