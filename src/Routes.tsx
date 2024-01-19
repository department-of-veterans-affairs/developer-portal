import * as React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { ErrorBoundary } from 'react-error-boundary';
import ConsumerOnboardingRoot from './containers/consumerOnboarding/ConsumerOnboardingRoot';
import Home from './containers/Home';

import About from './containers/about/About';
import News from './containers/about/News';
import AboutOverview from './containers/about/Overview';

import DemoPrep from './containers/consumerOnboarding/DemoPrep';
import OnboardingOverview from './containers/consumerOnboarding/OnboardingOverview';
import ProductionAccess from './containers/consumerOnboarding/ProductionAccess';
import RequestProductionAccess from './containers/consumerOnboarding/RequestProductionAccess';
import WorkingWithOurAPIs from './containers/consumerOnboarding/WorkingWithOurAPIs';

import ApiPage from './containers/documentation/ApiPage';
import ApiOverviewPage from './containers/documentation/ApiOverviewPage';
import { AuthorizationCodeGrantDocs } from './containers/documentation/AuthorizationCodeGrant/AuthorizationCodeGrantDocs';
import { ClientCredentialsGrantDocs } from './containers/documentation/ClientCredentialsGrant/ClientCredentialsGrantDocs';
import DocumentationRoot from './containers/documentation/DocumentationRoot';
import { ExploreRoot } from './containers/documentation/ExploreRoot';
import { ReleaseNotes } from './containers/documentation/ReleaseNotes';
import RequestSandboxAccess from './containers/documentation/RequestSandboxAccess';

import IntegrationGuide from './containers/providers/IntegrationGuide';

import { Publishing } from './containers/publishing';
import { PublishingIntroduction } from './containers/publishing/components/publishingIntroduction';
import { PublishingOnboarding } from './containers/publishing/components/publishingOnboarding';

import SupportOverview from './containers/support/Overview';
import Support, { sections as supportSections, SupportSection } from './containers/support/Support';

import { CONSUMER_PROD_PATH, CONSUMER_SANDBOX_PATH } from './types/constants/paths';
import ErrorPage404 from './containers/ErrorPage404';
import TermsOfService from './containers/TermsOfService';
import TestUsersPage from './containers/documentation/TestUsersPage';

export const SiteRoutes = (): JSX.Element => (
  <ErrorBoundary FallbackComponent={ErrorPage404}>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/index.html" element={<Home />} />

      {/* Legacy routes that we want to maintain: */}
      <Route
        path="/explore/terms-of-service"
        element={<Navigate to="/terms-of-service" replace />}
      />
      <Route path="/whats-new" element={<Navigate to="/about/news" replace />} />
      <Route path="/news" element={<Navigate to="/about/news" replace />} />

      {/* CURRENT ROUTES: */}
      <Route path="/terms-of-service" element={<TermsOfService />} />

      {/* API Documentation */}
      <Route path="/explore" element={<ExploreRoot />} />
      <Route path="/explore/:categoryUrlSlugs" element={<ExploreRoot />} />
      <Route path="/explore/api/:urlSlug" element={<DocumentationRoot />}>
        <Route index element={<ApiOverviewPage />} />
        <Route path="docs" element={<ApiPage />} />
        <Route path="authorization-code" element={<AuthorizationCodeGrantDocs />} />
        <Route path="test-users/:userId/:hash" element={<TestUsersPage />} />
        <Route path="client-credentials" element={<ClientCredentialsGrantDocs />} />
        <Route path="release-notes" element={<ReleaseNotes />} />
        <Route path="sandbox-access" element={<RequestSandboxAccess />} />
      </Route>
      <Route path="/explore/api" element={<Navigate to="/explore" replace />} />

      {/* About */}
      <Route path="/about" element={<About />}>
        <Route index element={<AboutOverview />} />
        <Route path="news" element={<News />} />
      </Route>

      {/* Support */}
      <Route path="/support" element={<Support />}>
        <Route index element={<SupportOverview sections={supportSections} />} />
        {supportSections.map((section: SupportSection) => (
          <Route path={section.id} key={`${section.id}-support`} element={<section.component />} />
        ))}
      </Route>

      {/* Integration Guide */}
      <Route path="/providers/integration-guide" element={<IntegrationGuide />} />

      {/* API Publishing */}
      <Route path="/api-publishing" element={<Publishing />}>
        <Route index element={<PublishingIntroduction />} />
        <Route path="process" element={<PublishingOnboarding />} />
      </Route>
      {/* Consumer Docs */}

      <Route path="/onboarding" element={<ConsumerOnboardingRoot />}>
        <Route index element={<OnboardingOverview />} />
        <Route path="request-prod-access" element={<RequestProductionAccess />} />
        <Route path="prepare-for-and-complete-a-demo" element={<DemoPrep />} />
        <Route path="working-with-lighthouse-apis" element={<WorkingWithOurAPIs />} />
      </Route>
      <Route path="onboarding/production-access-application" element={<ProductionAccess />} />

      <Route path="/apply" element={<Navigate to="/explore" replace />} />
      <Route path={CONSUMER_SANDBOX_PATH} element={<Navigate to="/explore" replace />} />
      <Route path="/go-live" element={<Navigate to={CONSUMER_PROD_PATH} />} />

      {/* Catch the rest with the 404 */}
      <Route path="*" element={<ErrorPage404 />} />
    </Routes>
  </ErrorBoundary>
);
