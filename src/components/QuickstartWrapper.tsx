import * as React from 'react';
import { PAGE_HEADER_ID } from '../types/constants';
import PageHeader from './PageHeader';

interface IQuickstartWrapperProps {
  halo: string;
  quickstartContent: React.StatelessComponent;
}

export default function Quickstart(props: IQuickstartWrapperProps) {
  const { halo, quickstartContent } = props;

  return (
    <div role="region" aria-labelledby={PAGE_HEADER_ID}>
      <PageHeader halo={halo} header="Quickstart" />
      {quickstartContent({})}
    </div>
  );
}
