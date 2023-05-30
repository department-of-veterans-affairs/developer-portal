import * as React from 'react';
import { Route, Switch, useParams } from 'react-router-dom';

import { getApisLoadedState, lookupApiBySlug } from '../../apiDefs/query';
import { APIDescription } from '../../apiDefs/schema';
import { ContentWithNav, SideNavEntry } from '../../components';
import { APIUrlSlug } from '../../types';
import { apiLoadingState } from '../../types/constants';
import ApisLoader from '../../components/apisLoader/ApisLoader';
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
        if={api.oAuthTypes?.includes('AuthorizationCodeGrant')}
        name="Authorization Code Grant"
        to={`/explore/api/${api.urlSlug}/authorization-code`}
        subNavLevel={1}
      />
      <SideNavEntry
        exact
        if={api.oAuthTypes?.includes('ClientCredentialsGrant')}
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
    return <h1>temporary 404</h1>;
  }
  return (
    <ContentWithNav
      fullWidth
      nav={<ExploreSideNav api={api} />}
      content={
        <Switch>
          <Route exact path="/explore/api/:urlSlug" component={ApiOverviewPage} />
          <Route exact path="/explore/api/:urlSlug/docs" component={ApiPage} />
          <Route
            exact
            path="/explore/api/:urlSlug/authorization-code"
            component={AuthorizationCodeGrantDocs}
          />
          <Route
            exact
            path="/explore/api/:urlSlug/client-credentials"
            component={ClientCredentialsGrantDocs}
          />
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
  );
};

export default DocumentationRoot;
