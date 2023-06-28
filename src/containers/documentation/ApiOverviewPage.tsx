/* eslint-disable no-console */
import * as React from 'react';
import { Helmet } from 'react-helmet';
import { Link, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

import { PageHeader } from '../../components';
import { APIUrlSlug } from '../../types';
import { ExploreApiTags } from '../../components/exploreApiCard/ExploreApiTags';

import { getApi } from './DocumentationRoot';
import './ApiOverviewPage.scss';

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
      <ExploreApiTags api={api} />
      <ReactMarkdown className="api-overview-content">{api.overviewPageContent}</ReactMarkdown>
      <Link to={`/explore/api/${api.urlSlug}/docs`} className="vads-c-action-link--green">
        Read the docs
      </Link>
    </>
  );
};

ApiOverviewPage.propTypes = {};
export default ApiOverviewPage;
