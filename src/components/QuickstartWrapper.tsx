import * as React from 'react';
import PageHeader from './PageHeader';

interface IQuickstartWrapperProps {
  halo: string;
  quickstartContent: React.StatelessComponent;
}

export default function Quickstart(props: IQuickstartWrapperProps) {
  const { halo, quickstartContent } = props;

  return (
    <div role="region" aria-labelledby="api-documentation">
      <PageHeader halo={halo} header="Quickstart" />
      {quickstartContent({})}
    </div>
  );
}
