import * as React from 'react';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router';
import { PageHeader } from '../../../components';
import { Https } from '../../../components/oauthDocs/acg/Https';
import { TestUsers } from '../../../components/oauthDocs/acg/TestUsers';
import { IdToken } from '../../../components/oauthDocs/acg/IdToken';
import { PageLinks } from '../../../components/oauthDocs/acg/PageLinks';
import { ScopesContent } from '../../../components/oauthDocs/acg/ScopesContent';
import { BuildingOIDCContent } from '../../../components/oauthDocs/acg/BuildingOIDCContent';
import { GettingStarted } from '../../../components/oauthDocs/acg/GettingStarted';
import { APIUrlFragment } from '../../../types';

import './AuthorizationCodeGrantDocs.scss';
import { getApi } from '../DocumentationRoot';

const AuthorizationCodeGrantDocs = (): JSX.Element => {
  const params = useParams<APIUrlFragment>();
  const api = getApi(params.urlFragment);
  if (!api) {
    return <h1>ApiPage.tsx 404</h1>;
  }

  return (
    <>
      <Helmet>
        <title>Authorization Code Flow</title>
      </Helmet>
      <PageHeader header="Authorization Code Flow" subText={api.name} />
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
