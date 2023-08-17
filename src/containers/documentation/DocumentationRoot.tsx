import * as React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { getApisLoadedState, lookupApiBySlug } from '../../apiDefs/query';
import { APIDescription } from '../../apiDefs/schema';
import { ApiAlerts, ApiBreadcrumbs, ContentWithNav, SideNavEntry } from '../../components';
import { apiLoadingState } from '../../types/constants';
import ApisLoader from '../../components/apisLoader/ApisLoader';
import ErrorPage404 from '../ErrorPage404';
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
      <SideNavEntry name={api.name} to="." />
      <SideNavEntry end name="Docs" subNavLevel={1} to="docs" />
      {!!api.oAuthTypes?.includes('AuthorizationCodeGrant') && (
        <SideNavEntry end name="Authorization Code Grant" subNavLevel={1} to="authorization-code" />
      )}
      {!!api.oAuthTypes?.includes('ClientCredentialsGrant') && (
        <SideNavEntry end name="Client Credentials Grant" subNavLevel={1} to="client-credentials" />
      )}
      <SideNavEntry end name="Release notes" subNavLevel={1} to="release-notes" />
      <SideNavEntry end name="Sandbox access" subNavLevel={1} to="sandbox-access" />
    </>
  );
};

const DocumentationRoot = (): JSX.Element => {
  const params = useParams();
  const location = useLocation();
  const api = lookupApiBySlug(params.urlSlug as string);

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
        navAriaLabel="API Docs Side Nav"
        className="documentation"
      />
    </>
  );
};

export default DocumentationRoot;
