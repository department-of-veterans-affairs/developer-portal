import classNames from 'classnames';
import React, { FC, useState } from 'react';
import { Helmet } from 'react-helmet';
import { PAGE_HEADER_ID } from '../../types/constants';
import { ApplySuccessResult } from '../../types';
import { PageHeader } from '../../components';
import { ApplyForm } from './ApplyForm';
import { ApplySuccess } from './ApplySuccess';

const headerText = 'Apply for VA Lighthouse Developer Access';
export const Apply: FC = () => {
  const [successResults, setSuccessResults] = useState<ApplySuccessResult>();

  return (
    <div role="region" aria-labelledby={PAGE_HEADER_ID} className={classNames('vads-l-grid-container', 'vads-u-padding--4')}>
      <div>
        <Helmet>
          <title>{headerText}</title>
        </Helmet>
        <PageHeader header={headerText} />
      </div>
      {
        successResults ?
          <ApplySuccess result={successResults} /> :
          <ApplyForm onSuccess={setSuccessResults} />
      }
    </div>
  );
};
