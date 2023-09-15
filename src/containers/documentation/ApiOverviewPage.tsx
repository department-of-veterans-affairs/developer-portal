import * as React from 'react';
import { Helmet } from 'react-helmet';
import { Link, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

import { PageHeader } from '../../components';
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
  const params = useParams();
  const api = getApi(params.urlSlug);

  if (!api) {
    throw new Error('API not found');
  }

  return (
    <>
      <Helmet>
        <title>{api.name}</title>
      </Helmet>
      <PageHeader header={api.name} className="vads-u-margin-bottom--1p5" />
      <ExploreApiTags api={api} />
      <ReactMarkdown
        className="api-overview-content"
        components={{
          a: ({ className, children, ...anchorProps }): JSX.Element => (
            <Link className={className} to={anchorProps.href ?? ''}>
              {String(children)}
            </Link>
          ),
        }}
      >
        {parseContent(api.overviewPageContent, api)}
      </ReactMarkdown>
      <Link
        to={`/explore/api/${api.urlSlug}/docs`}
        className="vads-c-action-link--green vads-u-display--inline-block vads-u-margin-bottom--9"
      >
        Read the docs
      </Link>
    </>
  );
};

ApiOverviewPage.propTypes = {};
export default ApiOverviewPage;
