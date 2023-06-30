import * as React from 'react';
import { Helmet } from 'react-helmet';
import { Link, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { PageHeader } from '../../components';
import { APIUrlSlug } from '../../types';
import ErrorPage404 from '../ErrorPage404';
import { getApi } from './DocumentationRoot';

const ApiOverviewPage = (): JSX.Element => {
  const params = useParams<APIUrlSlug>();
  const api = getApi(params.urlSlug);
  if (!api) {
    return <ErrorPage404 />;
  }

  return (
    <>
      <Helmet>
        <title>{api.name}</title>
      </Helmet>
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
