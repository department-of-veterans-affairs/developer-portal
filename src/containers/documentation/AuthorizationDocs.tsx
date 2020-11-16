import * as React from 'react';

import { PageHeader } from '../../components';
import OAuth from '../../content/apiDocs/oauthTechnical.mdx';

import './AuthorizationDocs.scss';

export const AuthorizationDocs = (): JSX.Element => {
  return (
    <div className="va-api-authorization-docs">
      <PageHeader header="Authorization" />
      <OAuth />
    </div>
  );
};
