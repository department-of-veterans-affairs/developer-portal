import * as React from 'react';
import CardLink from '../../components/CardLink';
import PageHeader from '../../components/PageHeader';
import { defaultFlexContainer } from '../../styles/vadsUtils';
import { ISection } from './Support';

const headerProps = {
  description:
    "Welcome to support for the VA Lighthouse API program. You can visit our FAQ page for answers to common questions. If you need to submit a support request or report a bug, you can contact us via GitHub. For general feedback use our 'Contact Us' form. Our customer support team is happy to help and will respond within one business day.",
  header: 'Support',
};

interface ISupportOverviewProps {
  readonly sections: ISection[];
}

export default function SupportOverview(props: ISupportOverviewProps) {
  return (
    <section role="region" aria-label="Support Overview">
      <PageHeader {...headerProps} />
      <div className={defaultFlexContainer()}>
        {props.sections.map((section: ISection) => {
          return (
            <CardLink name={section.name} url={`/support/${section.id}`} key={section.id}>
              {section.description}
            </CardLink>
          );
        })}
      </div>
    </section>
  );
}
