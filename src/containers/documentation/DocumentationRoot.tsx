/* eslint-disable no-console */
import * as React from 'react';
import { Link, Route, Switch, useLocation, useParams } from 'react-router-dom';

import { lookupApiByFragment, getApisLoadedState } from '../../apiDefs/query';
import { APIDescription } from '../../apiDefs/schema';
import { ContentWithNav, SideNavEntry } from '../../components';
import { APIUrlFragment } from '../../types';
import { apiLoadingState } from '../../types/constants';
import ApisLoader from '../../components/apisLoader/ApisLoader';
import { CategoryReleaseNotes } from '../releaseNotes/CategoryReleaseNotes';
import RequestSandboxAccess from '../consumerOnboarding/RequestSandboxAccess';
import ApiPage from './ApiPage';
import { AuthorizationCodeGrantDocs } from './AuthorizationCodeGrant/AuthorizationCodeGrantDocs';
import { ClientCredentialsGrantDocs } from './ClientCredentialsGrant/ClientCredentialsGrantDocs';
import ApiOverviewPage from './ApiOverviewPage';

import './Documentation.scss';

interface ExploreSideNavProps {
  api: APIDescription;
}

export interface ApiRequiredProps {
  api: APIDescription;
}

const getApi = (apiName?: string): APIDescription | null => {
  if (!apiName) {
    return null;
  }

  return lookupApiByFragment(apiName);
};
export { getApi };

const ExploreSideNav = (props: ExploreSideNavProps): JSX.Element => {
  const { api } = props;
  return (
    <>
      <SideNavEntry key="all" exact to={`/explore/api/${api.urlFragment}`} name="Overview" />
      <SideNavEntry exact to={`/explore/api/${api.urlFragment}/docs`} name="Docs" subNavLevel={1} />
      <SideNavEntry
        exact
        if={api.oAuthTypes?.includes('AuthorizationCodeGrant')}
        to={`/explore/api/${api.urlFragment}/authorization-code`}
        name="Authorization Code Flow"
        subNavLevel={1}
      />
      <SideNavEntry
        exact
        if={api.oAuthTypes?.includes('ClientCredentialsGrant')}
        to={`/explore/api/${api.urlFragment}/client-credentials`}
        name="Client Credentials Grant"
        subNavLevel={1}
      />
      <SideNavEntry
        exact
        to={`/explore/api/${api.urlFragment}/release-notes`}
        name="Release Notes"
        subNavLevel={1}
      />
      <SideNavEntry
        exact
        to={`/explore/api/${api.urlFragment}/sandbox-access`}
        name="Request Sandbox Access"
        subNavLevel={1}
      />
    </>
  );
};

interface NextPage {
  path: string;
  label: string;
}

const getNextDocumentationPage = (path: string, api: APIDescription): NextPage | false => {
  console.log(path);
  console.log(api);
  const pages = [];
  pages.push(
    { label: 'Overview', path: `/explore/api/${api.urlFragment}` },
    { label: 'Read the docs', path: `/explore/api/${api.urlFragment}/docs` },
  );
  if (api.oAuthTypes?.includes('AuthorizationCodeGrant')) {
    pages.push({
      label: 'Read about the Authorization Code Flow',
      path: `/explore/api/${api.urlFragment}/authorization-code`,
    });
  }
  if (api.oAuthTypes?.includes('ClientCredentialsGrant')) {
    pages.push({
      label: 'Read about the Client Credentials Grant',
      path: `/explore/api/${api.urlFragment}/client-credentials`,
    });
  }
  pages.push({
    label: 'Read the release notes',
    path: `/explore/api/${api.urlFragment}/release-notes`,
  });
  pages.push({
    label: 'Get sandbox access',
    path: `/explore/api/${api.urlFragment}/sandbox-access`,
  });

  const index = pages.findIndex(item => path === item.path);
  if (index >= 0 && pages[index + 1]) {
    return pages[index + 1];
  }

  return false;
};

const DocumentationRoot = (): JSX.Element => {
  const params = useParams<APIUrlFragment>();
  const location = useLocation();
  console.log(location);
  if (!params.urlFragment) {
    return (
      <>
        <h1>Very placeholder root explore page.</h1>
        <Link to="/explore/api/fhir">Here&apos;s an example set of documentation</Link>
      </>
    );
  }
  const api = lookupApiByFragment(params.urlFragment);

  if (
    getApisLoadedState() === apiLoadingState.IN_PROGRESS ||
    getApisLoadedState() === apiLoadingState.ERROR
  ) {
    return <ApisLoader />;
  }
  if (!api) {
    return <h1>temporary 404</h1>;
  }
  const nextPage = getNextDocumentationPage(location.pathname, api);
  return (
    <ContentWithNav
      fullWidth
      nav={<ExploreSideNav api={api} />}
      content={
        <>
          <Switch>
            <Route exact path="/explore/api/:urlFragment" component={ApiOverviewPage} />
            <Route exact path="/explore/api/:urlFragment/docs" component={ApiPage} />
            <Route
              exact
              path="/explore/api/:urlFragment/authorization-code"
              component={AuthorizationCodeGrantDocs}
            />
            <Route
              exact
              path="/explore/api/:urlFragment/client-credentials"
              component={ClientCredentialsGrantDocs}
            />
            <Route
              exact
              path="/explore/api/:urlFragment/release-notes"
              component={CategoryReleaseNotes}
            />
            <Route
              exact
              path="/explore/api/:urlFragment/sandbox-access"
              component={RequestSandboxAccess}
            />
          </Switch>
          {nextPage && (
            <Link
              to={nextPage.path}
              className="medium-screen:vads-u-display--none vads-c-action-link--green"
            >
              {nextPage.label}
            </Link>
          )}
        </>
      }
      navAriaLabel="API Docs Side Nav"
      className="documentation"
    />
  );
};

export default DocumentationRoot;
