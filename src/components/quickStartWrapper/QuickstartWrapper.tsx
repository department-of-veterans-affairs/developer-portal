import * as React from 'react';
import { PAGE_HEADER_ID } from '../../types/constants';
import { PageHeader } from '..';

interface QuickstartWrapperProps {
  halo: string;
  quickstartContent: React.FunctionComponent;
}

const QuickstartWrapper: React.FunctionComponent<QuickstartWrapperProps> = (
  props: QuickstartWrapperProps,
) => {
  const { halo, quickstartContent } = props;

  return (
    <div role="region" aria-labelledby={PAGE_HEADER_ID}>
      <PageHeader halo={halo} header="Quickstart" />
      {quickstartContent({})}
    </div>
  );
};

export { QuickstartWrapper };
