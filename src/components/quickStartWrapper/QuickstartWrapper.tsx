import * as React from 'react';
import { Helmet } from 'react-helmet';
import ReactMarkdown from 'react-markdown';
import { PageHeader } from '..';

interface QuickstartWrapperProps {
  categoryName: string;
  quickstartContent: string;
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
      <ReactMarkdown>{quickstartContent}</ReactMarkdown>
    </div>
  );
};

export { QuickstartWrapper };
