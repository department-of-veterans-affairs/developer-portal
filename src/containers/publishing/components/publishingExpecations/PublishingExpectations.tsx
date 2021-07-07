import React from 'react';
import Helmet from 'react-helmet';
import CollapsiblePanel from '@department-of-veterans-affairs/component-library/CollapsiblePanel';
import { PageHeader } from '../../../../components';
import {
  AuthenticationMarkdown,
  DocumentationMarkdown,
  ModernizationMarkdown,
  MonitoringMarkdown,
  SecurityMarkdown,
  SupportMarkdown,
  VersioningMarkdown,
} from '../../../../content/publishing/expectations';

const PublishingExpectations = (): JSX.Element => (
  <>
    <Helmet>
      <title>Expectations for Lighthouse APIs</title>
    </Helmet>
    <PageHeader header="Expectations for Lighthouse APIs" />
    <p>
      Publishing your API on Lighthouse is a smart move. It makes managing your API documentation,
      versioning, and consumers easier than ever. To make sure we offer a smooth and seamless
      process for you, us, and your consumers, we require your API to meet certain expectations. Our
      requirements offer your team many benefits, such as streamlined documentation and support when
      you need it most.
    </p>

    <h2>Security</h2>
    <CollapsiblePanel panelName="We follow industry best practices regarding security and privacy to ensure the data is safe and secure.">
      <SecurityMarkdown authenticationUrl="/explore/authorization" />
    </CollapsiblePanel>

    <h2>Documentation</h2>
    <CollapsiblePanel panelName="API documentation on Lighthouse adheres to strict quality standards.">
      <DocumentationMarkdown />
    </CollapsiblePanel>

    <h2>Versioning</h2>
    <CollapsiblePanel panelName="Thoughtful and consistent versioning is key to API functionality and availability.">
      <VersioningMarkdown />
    </CollapsiblePanel>

    <h2>Monitoring</h2>
    <CollapsiblePanel panelName="We monitor APIs closely to ensure they are available when your consumers needs them most.">
      <MonitoringMarkdown />
    </CollapsiblePanel>

    <h2>Support</h2>
    <CollapsiblePanel panelName="Before launching your API, we will work with you to define the details of a robust support plan.">
      <SupportMarkdown />
    </CollapsiblePanel>

    <h2>Modernization</h2>
    <CollapsiblePanel panelName="We provide only RESTful APIs that meet modern API standards for versioning, compatibility, and more.">
      <ModernizationMarkdown />
    </CollapsiblePanel>

    <h2>Authentication and Authorization</h2>
    <CollapsiblePanel panelName="We handle authentication and authorization for streamlined and robust security measures.">
      <AuthenticationMarkdown />
    </CollapsiblePanel>
  </>
);

export { PublishingExpectations };
