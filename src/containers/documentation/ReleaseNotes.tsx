import * as React from 'react';
import ReactMarkdown from 'react-markdown';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { APIUrlSlug } from '../../types';
import { BreadCrumbs, PageHeader } from '../../components';
import { getApi } from './DocumentationRoot';
import './ReleaseNotes.scss';

export const ReleaseNotes = (): JSX.Element => {
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
        <Link to={`/explore/api/${api.urlSlug as string}/release-notes`}>Release Notes</Link>
      </BreadCrumbs>
      <PageHeader header="Release notes" subText={api.name} />
      <div className="release-notes-wrapper">
        <ReactMarkdown>{api.releaseNotes}</ReactMarkdown>
      </div>
    </>
  );
};
