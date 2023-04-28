import * as React from 'react';
import { Helmet } from 'react-helmet';
import { CardLink, PageHeader } from '../../components';
import { defaultFlexContainer } from '../../styles/vadsUtils';
import { SupportSection } from './Support';

const headerProps = {
  header: 'Developer portal support',
};

interface SupportOverviewProps {
  readonly sections: SupportSection[];
}

const SupportOverview: React.FunctionComponent<SupportOverviewProps> = (
  props: SupportOverviewProps,
): JSX.Element => (
  <>
    <Helmet>
      <title>{headerProps.header}</title>
    </Helmet>
    <PageHeader {...headerProps} />
    <p className="vads-u-font-size--lg vads-u-font-weight--bold vads-u-margin-y--2">
      We&apos;re here to help with your software development and API publishing needs.
    </p>
    <div className={defaultFlexContainer()}>
      {props.sections.map((section: SupportSection) => (
        <CardLink
          name={section.name}
          url={`/support/${section.id}`}
          key={section.id}
          callToAction={section.callToAction}
        >
          {section.description}
        </CardLink>
      ))}
    </div>
  </>
);

export default SupportOverview;
