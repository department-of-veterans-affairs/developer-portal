/* eslint-disable no-console */
import * as React from 'react';
import { Helmet } from 'react-helmet';
import { Link, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { PageHeader } from '../../components';

import { APIUrlFragment } from '../../types';
import { getApi } from './DocumentationRoot';

const ApiOverviewPage = (): JSX.Element => {
  const params = useParams<APIUrlFragment>();
  const api = getApi(params.urlFragment);
  if (!api) {
    return <h1>placeholder 404</h1>;
  }

  return (
    <>
      <Helmet>
        <title>{api.name} Documentation</title>
      </Helmet>
      <PageHeader header={api.name} />
      <ReactMarkdown>{api.description}</ReactMarkdown>
      <Link to={`/explore/api/${api.urlFragment}/docs`} className="vads-c-action-link--green">
        Read the docs
      </Link>
    </>
  );
};

ApiOverviewPage.propTypes = {};
export default ApiOverviewPage;
