import * as React from 'react';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';
import { PageHeader } from '../../../components';
import { Https } from '../../../components/oauthDocs/acg/Https';
import { TestUsers } from '../../../components/oauthDocs/acg/TestUsers';
import { IdToken } from '../../../components/oauthDocs/acg/IdToken';
import { PageLinks } from '../../../components/oauthDocs/acg/PageLinks';
import { ScopesContent } from '../../../components/oauthDocs/acg/ScopesContent';
import { BuildingOIDCContent } from '../../../components/oauthDocs/acg/BuildingOIDCContent';
import { GettingStarted } from '../../../components/oauthDocs/acg/GettingStarted';

import './AuthorizationCodeGrantDocs.scss';
import { getApi } from '../DocumentationRoot';

const AuthorizationCodeGrantDocs = (): JSX.Element => {
  const params = useParams();
  const api = getApi(params.urlSlug);
  if (!api?.oAuthTypes?.includes('AuthorizationCodeGrant')) {
    throw new Error('API does not include this auth type');
  }

  return (
    <>
      <Helmet>
        <title>{api.name} Authorization Code Grant</title>
      </Helmet>
      <PageHeader header="Authorization Code Grant" subText={api.name} />
      <div className="va-api-authorization-docs">
        <PageLinks />
        <GettingStarted />
        <BuildingOIDCContent api={api} />
        <ScopesContent api={api} />
        <IdToken />
        <TestUsers />
        <Https />
      </div>
    </>
  );
};

export { AuthorizationCodeGrantDocs };
