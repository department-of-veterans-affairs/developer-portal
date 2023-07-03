import * as React from 'react';
import { Route, Switch, useLocation, useParams } from 'react-router-dom';
import { getApisLoadedState, lookupApiBySlug } from '../../apiDefs/query';
import { APIDescription } from '../../apiDefs/schema';
import { ApiAlerts, ApiBreadcrumbs, ContentWithNav, SideNavEntry } from '../../components';
import { APIUrlSlug } from '../../types';
import { apiLoadingState } from '../../types/constants';
import ApisLoader from '../../components/apisLoader/ApisLoader';
import ErrorPage404 from '../ErrorPage404';
import { ReleaseNotes } from './ReleaseNotes';
import RequestSandboxAccess from './RequestSandboxAccess';
import ApiPage from './ApiPage';
import { AuthorizationCodeGrantDocs } from './AuthorizationCodeGrant/AuthorizationCodeGrantDocs';
import { ClientCredentialsGrantDocs } from './ClientCredentialsGrant/ClientCredentialsGrantDocs';
import ApiOverviewPage from './ApiOverviewPage';
import { ExploreRoot } from './ExploreRoot';

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

  return lookupApiBySlug(apiName);
};
export { getApi };

const ExploreSideNav = (props: ExploreSideNavProps): JSX.Element => {
  const { api } = props;
  return (
    <>
      <SideNavEntry key="all" exact to={`/explore/api/${api.urlSlug}`} name={api.name} />
      <SideNavEntry exact to={`/explore/api/${api.urlSlug}/docs`} name="Docs" subNavLevel={1} />
      <SideNavEntry
        exact
        if={!!api.oAuthTypes?.includes('AuthorizationCodeGrant')}
        name="Authorization Code Grant"
        to={`/explore/api/${api.urlSlug}/authorization-code`}
        subNavLevel={1}
      />
      <SideNavEntry
        exact
        if={!!api.oAuthTypes?.includes('ClientCredentialsGrant')}
        to={`/explore/api/${api.urlSlug}/client-credentials`}
        name="Client Credentials Grant"
        subNavLevel={1}
      />
      <SideNavEntry
        exact
        to={`/explore/api/${api.urlSlug}/release-notes`}
        name="Release notes"
        subNavLevel={1}
      />
      <SideNavEntry
        exact
        to={`/explore/api/${api.urlSlug}/sandbox-access`}
        name="Sandbox access"
        subNavLevel={1}
      />
    </>
  );
};

const DocumentationRoot = (): JSX.Element => {
  const params = useParams<APIUrlSlug>();
  const location = useLocation();
  if (!params.urlSlug) {
    return <ExploreRoot />;
  }
  const api = lookupApiBySlug(params.urlSlug);

  if (
    getApisLoadedState() === apiLoadingState.IN_PROGRESS ||
    getApisLoadedState() === apiLoadingState.ERROR
  ) {
    return <ApisLoader />;
  }
  if (!api) {
    return <ErrorPage404 />;
  }
  if (
    location.pathname.endsWith('authorization-code') &&
    !api.oAuthTypes?.includes('AuthorizationCodeGrant')
  ) {
    return <ErrorPage404 />;
  }
  if (
    location.pathname.endsWith('client-credentials') &&
    !api.oAuthTypes?.includes('ClientCredentialsGrant')
  ) {
    return <ErrorPage404 />;
  }
  return (
    <>
      <ApiBreadcrumbs api={api} />
      <ApiAlerts />
      <ContentWithNav
        fullWidth
        nav={<ExploreSideNav api={api} />}
        content={
          <Switch>
            <Route exact path="/explore/api/:urlSlug" component={ApiOverviewPage} />
            <Route exact path="/explore/api/:urlSlug/docs" component={ApiPage} />
            {api.oAuthTypes?.includes('AuthorizationCodeGrant') && (
              <Route
                exact
                path="/explore/api/:urlSlug/authorization-code"
                component={AuthorizationCodeGrantDocs}
              />
            )}
            {api.oAuthTypes?.includes('ClientCredentialsGrant') && (
              <Route
                exact
                path="/explore/api/:urlSlug/client-credentials"
                component={ClientCredentialsGrantDocs}
              />
            )}
            <Route exact path="/explore/api/:urlSlug/release-notes" component={ReleaseNotes} />
            <Route
              exact
              path="/explore/api/:urlSlug/sandbox-access"
              component={RequestSandboxAccess}
            />
          </Switch>
        }
        navAriaLabel="API Docs Side Nav"
        className="documentation"
      />
    </>
  );
};

export default DocumentationRoot;
