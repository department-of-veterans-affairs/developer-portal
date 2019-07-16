import * as React from 'react';
import PageHeader from './PageHeader';

interface IQuickstartWrapperProps {
  halo: string;
  quickstartContent: React.StatelessComponent;
}

export default class Quickstart extends React.Component<IQuickstartWrapperProps> {
  public render() {
    const { halo, quickstartContent } = this.props;

    return (
      <div role="region" aria-labelledby="api-documentation">
        <PageHeader halo={halo} header="Quickstart" />
        {quickstartContent({})}
      </div>
    );
  }
}
