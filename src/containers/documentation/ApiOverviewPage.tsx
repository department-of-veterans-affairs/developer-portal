/* eslint-disable no-console */
import * as React from 'react';
import { Helmet } from 'react-helmet';
import { Link, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

import { PageHeader } from '../../components';
import { APIUrlSlug } from '../../types';
import { ExploreApiTags } from '../../components/exploreApiCard/ExploreApiTags';
import { APIDescription } from '../../apiDefs/schema';

import { getApi } from './DocumentationRoot';
import './ApiOverviewPage.scss';

/**
 * This function replaces the placeholder {API_URL_SLUG} with the actual API url slug
 * @param markdown The overview page content to parse
 * @param api The API used to replace the placeholders
 * @returns Parsed markdown with no placeholders
 */
const parseContent = (markdown: string, api: APIDescription): string =>
  markdown.replace(/\{API_URL_SLUG\}/g, api.urlSlug);

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
      <ReactMarkdown className="api-overview-content">
        {parseContent(api.overviewPageContent, api)}
      </ReactMarkdown>
      <Link to={`/explore/api/${api.urlSlug}/docs`} className="vads-c-action-link--green">
        Read the docs
      </Link>
    </>
  );
};

ApiOverviewPage.propTypes = {};
export default ApiOverviewPage;
