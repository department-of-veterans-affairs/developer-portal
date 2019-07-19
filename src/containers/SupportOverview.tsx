import * as React from 'react';
import { NavLink } from 'react-router-dom';
import PageHeader from '../components/PageHeader';

const headerProps = {
  description: "Welcome to support for the VA API program. You can visit our FAQ page for answers to common questions. If you need to submit a support request or report a bug, you can contact us via Github. For general feedback use our 'Contact Us' form. Our customer support team is happy to help and will respond within one business day.",
  header: "Support",
};

export default class SupportOverview extends React.Component<any, any, any> {

  private cardsSections = this.props.sections.map((section: any) => {
    return (
      <NavLink key={section.id} to={`/support/${section.id}`} className="va-api-card">
        <h3 className="va-api-name">
          {section.name}
        </h3>
        <div className="va-api-description">
          {section.description}
        </div>
      </NavLink>
    );
  });

  public render() {
    return (
      <section role="region" aria-label="Support Overview" className="usa-section">
        <PageHeader {...headerProps} />
        <div className="va-api-container">
          {this.cardsSections}
        </div>
      </section>
    )
  }
}