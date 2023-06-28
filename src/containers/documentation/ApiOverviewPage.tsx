/* eslint-disable no-console */
import * as React from 'react';
import { Helmet } from 'react-helmet';
import { Link, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

import { PageHeader } from '../../components';
import { APIDescription } from '../../apiDefs/schema';
import { APIUrlSlug } from '../../types';
import { lookupCategoryByApi } from '../../apiDefs/query';

import { getApi } from './DocumentationRoot';
import './ApiOverviewPage.scss';

const APITags = ({ api }: { api: APIDescription }): JSX.Element => {
  const isCCG = api.oAuthTypes?.includes('ClientCredentialsGrant');
  const isACG = api.oAuthTypes?.includes('AuthorizationCodeGrant');
  const isOpen = api.openData;
  const isRestricted = api.vaInternalOnly;

  const apiCategory = lookupCategoryByApi(api);

  return (
    <ul className="api-overview-tags">
      {isRestricted ? <li>RESTRICTED ACCESS</li> : ''}
      {isCCG ? <li>CLIENT CREDENTIALS GRANT</li> : ''}
      {isACG ? <li>AUTH CODE GRANT</li> : ''}
      {apiCategory ? <li>{apiCategory.properName}</li> : ''}
      {isOpen ? <li>OPEN DATA</li> : ''}
    </ul>
  );
};

const ApiOverviewPage = (): JSX.Element => {
  const params = useParams<APIUrlSlug>();
  const api = getApi(params.urlSlug);

  if (!api) {
    return <h1>placeholder 404</h1>;
  }

  return (
    <>
      <Helmet>
        <title>{api.name} Documentation</title>
      </Helmet>
      <PageHeader header={api.name} />
      <APITags api={api} />
      <ReactMarkdown className="api-overview-content">{api.overviewPageContent}</ReactMarkdown>
      <Link to={`/explore/api/${api.urlSlug}/docs`} className="vads-c-action-link--green">
        Read the docs
      </Link>
    </>
  );
};

ApiOverviewPage.propTypes = {};
export default ApiOverviewPage;
