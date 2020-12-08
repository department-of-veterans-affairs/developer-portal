import * as React from 'react';
import Helmet from 'react-helmet';

import { PageHeader, BuildingOIDCContent } from '../../components';
import OAuthPageLinks from '../../content/apiDocs/oauth/oauthTechnicalPageLinks.mdx';
import OAuthGettingStarted from '../../content/apiDocs/oauth/oauthTechnicalGettingStarted.mdx';
import OAuthScopes from '../../content/apiDocs/oauth/oauthTechnicalScopes.mdx';
import OAuthIdToken from '../../content/apiDocs/oauth/oauthTechnicalIdToken.mdx';
import OAuthTestUsers from '../../content/apiDocs/oauth/oauthTechnicalTestUsers.mdx';

import './AuthorizationDocs.scss';

export const AuthorizationDocs = (): JSX.Element => (
  <div className="va-api-authorization-docs">
    <Helmet>
      <title>Authorization</title>
    </Helmet>
    <PageHeader header="Authorization" />
    <OAuthPageLinks />
    <OAuthGettingStarted />
    <BuildingOIDCContent />
    <OAuthScopes />
    <OAuthIdToken />
    <OAuthTestUsers />
  </div>
);
