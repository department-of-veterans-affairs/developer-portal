import * as React from 'react';
import Helmet from 'react-helmet';
import { CardLink, PageHeader } from '../../components';
import { defaultFlexContainer } from '../../styles/vadsUtils';
import { SupportSection } from './Support';
import { ContactUsAlertBox } from './ContactUsAlertBox';

const headerProps = {
  description:
    'Welcome to support for VA Lighthouse APIs. You can visit our FAQ page for answers to common questions, or use the Contact Us form to report a problem or ask a question. Our customer support team is happy to help and will respond within one business day.',
  header: 'Support',
};

interface SupportOverviewProps {
  readonly sections: SupportSection[];
}

const SupportOverview: React.FunctionComponent<SupportOverviewProps> = (
  props: SupportOverviewProps,
): JSX.Element => (
  <>
    <Helmet>
      <title>Support</title>
    </Helmet>
    <PageHeader {...headerProps} />
    <ContactUsAlertBox />
    <div className={defaultFlexContainer()}>
      {props.sections.map((section: SupportSection) => (
        <CardLink
          name={section.name}
          url={`/support/${section.id}`}
          key={section.id}
          callToAction={section.callToAction}
          headingLevel={2}
        >
          {section.description}
        </CardLink>
      ))}
    </div>
  </>
);

export default SupportOverview;
