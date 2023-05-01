import * as React from 'react';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router';
import GoodToKnow from '../../../components/oauthDocs/ccg/GoodToKnow';
import { PageHeader } from '../../../components';
import { GettingStarted } from '../../../components/oauthDocs/ccg/GettingStarted';
import { AuthCodeFlowContent } from '../../../components/oauthDocs/ccg/AuthCodeFlowContent';
import { TestUsers } from '../../../components/oauthDocs/ccg/TestUsers';
import { APIUrlFragment } from '../../../types';

import ApisLoader from '../../../components/apisLoader/ApisLoader';
import { getApi } from '../DocumentationRoot';

const ClientCredentialsGrantDocs = (): JSX.Element => {
  const params = useParams<APIUrlFragment>();
  const api = getApi(params.urlFragment);
  if (!api) {
    return <h1>ApiPage.tsx 404</h1>;
  }

  return (
    <>
      <Helmet>
        <title>Client Credentials Grant</title>
      </Helmet>
      <PageHeader header="Client Credentials Grant" subText={api.name} />
      <div className="va-api-authorization-docs">
        <p>
          VA&apos;s{' '}
          <a href="https://datatracker.ietf.org/doc/html/rfc6749#section-4.4">
            OAuth 2.0 Client Credentials Grant
          </a>{' '}
          (CCG) grants access by using your RSA-generated key in{' '}
          <a href="https://datatracker.ietf.org/doc/html/rfc7517">JSON Web Key (JWK)</a> format, as
          described in the{' '}
          <a href="https://openid.net/specs/draft-jones-json-web-key-03.html">OpenID spec</a>.
        </p>
        <ApisLoader hideSpinner />
        <GoodToKnow />
        <GettingStarted api={api} />
        <AuthCodeFlowContent api={api} />
        <TestUsers />
      </div>
    </>
  );
};

export { ClientCredentialsGrantDocs };
