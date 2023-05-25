import * as React from 'react';
import { Route, Switch, useParams } from 'react-router-dom';

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

  return lookupApiByFragment(apiName);
};
export { getApi };

const ExploreSideNav = (props: ExploreSideNavProps): JSX.Element => {
  const { api } = props;
  return (
    <>
      <SideNavEntry key="all" exact to={`/explore/api/${api.urlFragment}`} name={api.name} />
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
        name="Release notes"
        subNavLevel={1}
      />
      <SideNavEntry
        exact
        to={`/explore/api/${api.urlFragment}/sandbox-access`}
        name="Sandbox access"
        subNavLevel={1}
      />
    </>
  );
};

const DocumentationRoot = (): JSX.Element => {
  const params = useParams<APIUrlFragment>();
  if (!params.urlFragment) {
    return <ExploreRoot />;
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
  return (
    <ContentWithNav
      fullWidth
      nav={<ExploreSideNav api={api} />}
      content={
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
      }
      navAriaLabel="API Docs Side Nav"
      className="documentation"
    />
  );
};

export default DocumentationRoot;
