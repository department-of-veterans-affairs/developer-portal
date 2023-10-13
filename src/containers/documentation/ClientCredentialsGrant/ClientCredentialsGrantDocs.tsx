import * as React from 'react';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';
import GoodToKnow from '../../../components/oauthDocs/ccg/GoodToKnow';
import { PageHeader } from '../../../components';
import { GettingStarted } from '../../../components/oauthDocs/ccg/GettingStarted';
import { AuthCodeFlowContent } from '../../../components/oauthDocs/ccg/AuthCodeFlowContent';
import { TestUsers } from '../../../components/oauthDocs/ccg/TestUsers';

import ApisLoader from '../../../components/apisLoader/ApisLoader';
import { getApi } from '../DocumentationRoot';

const ClientCredentialsGrantDocs = (): JSX.Element => {
  const params = useParams();
  const api = getApi(params.urlSlug);
  if (!api?.oAuthTypes?.includes('ClientCredentialsGrant')) {
    throw new Error('API does not include this auth type');
  }

  return (
    <>
      <Helmet>
        <title>{api.name} Client Credentials Grant</title>
      </Helmet>
      <PageHeader header="Client Credentials Grant" subText={api.name} />
      <div className="va-api-authorization-docs vads-u-margin-top--3">
        <p>The authentication model for the {api.name} uses OAuth2.0/OpenID Connect. </p>
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
