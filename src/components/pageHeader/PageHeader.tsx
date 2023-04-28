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
        id={PAGE_HEADER_ID}
        className="vads-u-margin-top--0 vads-u-margin-bottom--0"
        tabIndex={-1}
      >
        {header}
      </h1>
      {subText && <p className="header-sub-text vads-u-color--gray">{subText}</p>}
    </div>
  );
};

export { PageHeader };
