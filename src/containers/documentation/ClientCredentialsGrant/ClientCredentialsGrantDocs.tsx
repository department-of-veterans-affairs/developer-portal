import * as React from 'react';
import Helmet from 'react-helmet';
import {
  PageHeader
} from '../../../components';

// import CategoryPage from './CategoryPage'

const ClientCredentialsGrantDocs = (): JSX.Element => {
  return (
    <div className="va-api-authorization-docs">
      <Helmet>
        <title>Client Credentials Grant</title>
      </Helmet>
      <PageHeader header="Client Credentials Grant" />
    </div>
  );
};

export { ClientCredentialsGrantDocs };
