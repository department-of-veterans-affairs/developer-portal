import * as React from 'react';
import Helmet from 'react-helmet';

import { PageHeader } from '../../components';
import OAuth from '../../content/apiDocs/oauthTechnical.mdx';

import './AuthorizationDocs.scss';

export const AuthorizationDocs = (): JSX.Element => (
  <div className="va-api-authorization-docs">
    <Helmet>
      <title>Authorization</title>
    </Helmet>
    <PageHeader header="Authorization" />
    <OAuth />
  </div>
);
