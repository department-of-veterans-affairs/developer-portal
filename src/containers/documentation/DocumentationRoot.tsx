import * as React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getApisLoadedState, lookupApiBySlug } from '../../apiDefs/query';
import { APIDescription } from '../../apiDefs/schema';
import { ApiAlerts, ApiBreadcrumbs, ContentWithNav, SideNavEntry } from '../../components';
import { apiLoadingState } from '../../types/constants';
import ApisLoader from '../../components/apisLoader/ApisLoader';
import './Documentation.scss';
import { RootState, UserStore } from '../../types';

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
  const selector = (state: RootState): UserStore => state.userStore;
  const { id: userId, testUserHash } = useSelector(selector);
  const { api } = props;
  return (
    <>
      <SideNavEntry end name={api.name} to="." />
      <SideNavEntry end name="Docs" subNavLevel={1} to="docs" />
      {!!api.oAuthTypes?.includes('AuthorizationCodeGrant') && (
        <>
          <SideNavEntry
            end
            name="Authorization Code Grant"
            subNavLevel={1}
            to="authorization-code"
          />
          {!api.oAuthInfo?.acgInfo?.disableTestUsersPage && !!userId && testUserHash && (
            <SideNavEntry
              end
              name="Test users"
              subNavLevel={2}
              to={`test-users/${userId}/${testUserHash}`}
            />
          )}
        </>
      )}
      {!!api.oAuthTypes?.includes('ClientCredentialsGrant') && (
        <SideNavEntry end name="Client Credentials Grant" subNavLevel={1} to="client-credentials" />
      )}
      <SideNavEntry end name="Release notes" subNavLevel={1} to="release-notes" />
      {!api.blockSandboxForm && (
        <SideNavEntry end name="Sandbox access" subNavLevel={1} to="sandbox-access" />
      )}
    </>
  );
};

const DocumentationRoot = (): JSX.Element => {
  const params = useParams();
  const api = lookupApiBySlug(params.urlSlug as string);

  if (
    getApisLoadedState() === apiLoadingState.IN_PROGRESS ||
    getApisLoadedState() === apiLoadingState.ERROR
  ) {
    return <ApisLoader />;
  }
  if (!api) {
    throw new Error('API not found');
  }

  return (
    <>
      <ApiBreadcrumbs api={api} />
      <ApiAlerts />
      <ContentWithNav
        fullWidth
        nav={<ExploreSideNav api={api} />}
        navAriaLabel="API Docs Side"
        className="documentation"
      />
    </>
  );
};

export default DocumentationRoot;
