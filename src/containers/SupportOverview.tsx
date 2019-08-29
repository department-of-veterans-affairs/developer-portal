import * as React from 'react';
import CardLink from '../components/CardLink';
import PageHeader from '../components/PageHeader';
import { ISection } from './Support';

const headerProps = {
  description: "Welcome to support for the VA API program. You can visit our FAQ page for answers to common questions. If you need to submit a support request or report a bug, you can contact us via Github. For general feedback use our 'Contact Us' form. Our customer support team is happy to help and will respond within one business day.",
  header: "Support",
};

interface ISupportOverviewProps {
  readonly sections: ISection[];
}

export default class SupportOverview extends React.Component<ISupportOverviewProps> {
  public render() {
    const cardsSections = this.props.sections.map((section: ISection) => {
      return (
        <CardLink
          name={section.name}
          description={section.description}
          url={`/support/${section.id}`}
          key={section.id}
        />
      );
    });
    return (
      <section role="region" aria-label="Support Overview" className="usa-section">
        <PageHeader {...headerProps} />
        <div className="va-api-container">
          {cardsSections}
        </div>
      </section>
    )
  }
}
