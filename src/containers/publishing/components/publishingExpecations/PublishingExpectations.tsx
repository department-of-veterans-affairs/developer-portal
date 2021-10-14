import React from 'react';
import { Helmet } from 'react-helmet';
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
    <va-accordion>
      <va-accordion-item header="We follow industry best practices regarding security and privacy to ensure the data is safe and secure.">
        <SecurityMarkdown authenticationUrl="/explore/authorization" />
      </va-accordion-item>
    </va-accordion>

    <h2>Documentation</h2>
    <va-accordion>
      <va-accordion-item header="API documentation on Lighthouse adheres to strict quality standards.">
        <DocumentationMarkdown />
      </va-accordion-item>
    </va-accordion>

    <h2>Versioning</h2>
    <va-accordion>
      <va-accordion-item header="Thoughtful and consistent versioning is key to API functionality and availability.">
        <VersioningMarkdown />
      </va-accordion-item>
    </va-accordion>

    <h2>Monitoring</h2>
    <va-accordion>
      <va-accordion-item header="We monitor APIs closely to ensure they are available when your consumers needs them most.">
        <MonitoringMarkdown />
      </va-accordion-item>
    </va-accordion>

    <h2>Support</h2>
    <va-accordion>
      <va-accordion-item header="Before launching your API, we will work with you to define the details of a robust support plan.">
        <SupportMarkdown />
      </va-accordion-item>
    </va-accordion>

    <h2>Modernization</h2>
    <va-accordion>
      <va-accordion-item header="We provide only RESTful APIs that meet modern API standards for versioning, compatibility, and more.">
        <ModernizationMarkdown />
      </va-accordion-item>
    </va-accordion>

    <h2>Authentication and Authorization</h2>
    <va-accordion>
      <va-accordion-item header="We handle authentication and authorization for streamlined and robust security measures.">
        <AuthenticationMarkdown />
      </va-accordion-item>
    </va-accordion>
  </>
);

export { PublishingExpectations };
