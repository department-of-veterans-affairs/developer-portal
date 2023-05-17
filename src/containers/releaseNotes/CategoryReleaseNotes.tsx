import * as React from 'react';
import ReactMarkdown from 'react-markdown';
import { useParams } from 'react-router';
import { Helmet } from 'react-helmet';
import { APIUrlFragment } from '../../types';
import { getApi } from '../documentation/DocumentationRoot';
import { PageHeader } from '../../components';

export const CategoryReleaseNotes = (): JSX.Element => {
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
      <PageHeader header="Release Notes" subText={api.name} />
      <div className="release-notes-wrapper">
        <ReactMarkdown>{api.releaseNotes}</ReactMarkdown>
      </div>
    </>
  );
};
