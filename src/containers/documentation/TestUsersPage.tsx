import * as React from 'react';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';

import { PageHeader } from '../../components';

import { getApi } from './DocumentationRoot';
import './TestUsersPage.scss';

const TestUsersPage = (): JSX.Element => {
  const params = useParams();
  const api = getApi(params.urlSlug);

  if (!api) {
    throw new Error('API not found');
  }

  return (
    <>
      <Helmet>
        <title>{api.name} Test Users</title>
      </Helmet>
      <PageHeader header="Test Users" subText={api.name} />
      <p>This is where the test users data is displayed after authentication.</p>
    </>
  );
};

TestUsersPage.propTypes = {};
export default TestUsersPage;
