import React, { FC } from 'react';
// import { Helmet } from 'react-helmet';
// import SegmentedProgressBar from '@department-of-veterans-affairs/component-library/SegmentedProgressBar';
import { PageHeader } from '../../components';

const headerText = 'Production access form';

const ProductionAccess: FC = () => (
  <div>
    <PageHeader header={headerText} />
    {/* <SegmentedProgressBar current={4} total={6} /> */}
  </div>
);

export { ProductionAccess };
