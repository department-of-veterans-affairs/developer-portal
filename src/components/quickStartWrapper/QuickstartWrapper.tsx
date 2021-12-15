import * as React from 'react';
import { Helmet } from 'react-helmet';
import { PageHeader } from '..';

interface QuickstartWrapperProps {
  categoryName: string;
  quickstartContent: React.FunctionComponent;
}

const QuickstartWrapper: React.FunctionComponent<QuickstartWrapperProps> = (
  props: QuickstartWrapperProps,
) => {
  const { categoryName, quickstartContent } = props;

  return (
    <div className="quickstart-wrapper">
      <Helmet>
        <title>{categoryName} Quickstart</title>
      </Helmet>
      <PageHeader halo={categoryName} header="Quickstart" />
      {quickstartContent({})}
    </div>
  );
};

export { QuickstartWrapper };
