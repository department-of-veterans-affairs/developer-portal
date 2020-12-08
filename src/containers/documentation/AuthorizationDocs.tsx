import * as React from 'react';
import Helmet from 'react-helmet';

import { PageHeader, BuildingOIDCContent } from '../../components';
import PageLinks from '../../content/apiDocs/oauth/PageLinks.mdx';
import GettingStarted from '../../content/apiDocs/oauth/GettingStarted.mdx';
import Scopes from '../../content/apiDocs/oauth/Scopes.mdx';
import IdToken from '../../content/apiDocs/oauth/IdToken.mdx';
import TestUsers from '../../content/apiDocs/oauth/TestUsers.mdx';

import './AuthorizationDocs.scss';

export const AuthorizationDocs = (): JSX.Element => (
  <div className="va-api-authorization-docs">
    <Helmet>
      <title>Authorization</title>
    </Helmet>
    <PageHeader header="Authorization" />
    <PageLinks />
    <GettingStarted />
    <BuildingOIDCContent />
    <Scopes />
    <IdToken />
    <TestUsers />
  </div>
);
