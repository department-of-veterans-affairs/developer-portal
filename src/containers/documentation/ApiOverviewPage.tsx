/* eslint-disable no-console */
import * as React from 'react';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { lookupApiByFragment } from '../../apiDefs/query';
import { APIDescription } from '../../apiDefs/schema';
import { PageHeader } from '../../components';

import { APIUrlFragment } from '../../types';

const getApi = (apiName?: string): APIDescription | null => {
  if (!apiName) {
    return null;
  }

  return lookupApiByFragment(apiName);
};

const ApiOverviewPage = (): JSX.Element => {
  const params = useParams<APIUrlFragment>();
  console.log(params);
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
    </>
  );
};

ApiOverviewPage.propTypes = {};
export default ApiOverviewPage;
