/* eslint-disable no-console */
import * as React from 'react';
import { Helmet } from 'react-helmet';
import { Link, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { BreadCrumbs, PageHeader } from '../../components';
import { APIUrlSlug } from '../../types';
import { getApi } from './DocumentationRoot';

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
      <BreadCrumbs>
        <Link to="/">Home</Link>
        <Link to="/explore">Explore APIs</Link>
        <Link to={`/explore/api/${api.urlSlug as string}`}>{api.name}</Link>
      </BreadCrumbs>
      <PageHeader header={api.name} />
      <ReactMarkdown>{api.description}</ReactMarkdown>
      <Link to={`/explore/api/${api.urlSlug}/docs`} className="vads-c-action-link--green">
        Read the docs
      </Link>
    </>
  );
};

ApiOverviewPage.propTypes = {};
export default ApiOverviewPage;
