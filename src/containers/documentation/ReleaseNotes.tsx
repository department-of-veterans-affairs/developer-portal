import * as React from 'react';
import ReactMarkdown from 'react-markdown';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import ErrorPage404 from '../ErrorPage404';
import { PageHeader } from '../../components';
import { getApi } from './DocumentationRoot';
import './ReleaseNotes.scss';

export const ReleaseNotes = (): JSX.Element => {
  const params = useParams();
  const api = getApi(params.urlSlug);
  if (!api) {
    return <ErrorPage404 />;
  }

  return (
    <>
      <Helmet>
        <title>{api.name} Release Notes</title>
      </Helmet>
      <PageHeader header="Release notes" subText={api.name} />
      <div className="release-notes-wrapper">
        <ReactMarkdown>{api.releaseNotes}</ReactMarkdown>
      </div>
    </>
  );
};
