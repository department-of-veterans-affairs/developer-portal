import * as React from 'react';
import { CardLink } from '../../components';
import PageHeader from '../../components/PageHeader';
import { defaultFlexContainer } from '../../styles/vadsUtils';
import { PAGE_HEADER_ID } from '../../types/constants';
import { SupportSection } from './Support';

const headerProps = {
  description:
    "Welcome to support for the VA Lighthouse API program. You can visit our FAQ page for answers to common questions. If you need to submit a support request or report a bug, you can contact us via GitHub. For general feedback use our 'Contact Us' form. Our customer support team is happy to help and will respond within one business day.",
  header: 'Support',
};

interface SupportOverviewProps {
  readonly sections: SupportSection[];
}

const SupportOverview: React.FunctionComponent<SupportOverviewProps> = (
  props: SupportOverviewProps,
): JSX.Element => (
  <section role="region" aria-labelledby={PAGE_HEADER_ID}>
    <PageHeader {...headerProps} />
    <div className={defaultFlexContainer()}>
      {props.sections.map((section: SupportSection) => (
        <CardLink name={section.name} url={`/support/${section.id}`} key={section.id}>
          {section.description}
        </CardLink>
      ))}
    </div>
  </section>
);

export default SupportOverview;
