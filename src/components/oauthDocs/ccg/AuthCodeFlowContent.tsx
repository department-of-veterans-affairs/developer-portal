import * as React from 'react';
import { SectionHeaderWrapper } from '../../index';
import { ApiRequiredProps } from '../../../containers/documentation/DocumentationRoot';
import GeneratingJWTContent from './GeneratingJWTContent';
import RetrievingTokenContent from './RetrievingTokenContent';

const AuthCodeFlowContent = (props: ApiRequiredProps): JSX.Element => {
  const { api } = props;
  const scopes = api.oAuthInfo?.ccgInfo?.scopes ?? [];
  const baseAuthPath = api.oAuthInfo?.ccgInfo?.baseAuthPath ?? '/oauth2/{api}/v1';
  const apiName = api.name;
  const sandboxAud = api.oAuthInfo?.ccgInfo?.sandboxAud ?? '';
  const productionAud = api.oAuthInfo?.ccgInfo?.productionAud ?? '';

  return (
    <div>
      <SectionHeaderWrapper heading="Requesting a Token with CCG" id="requesting-a-token" />
      <p>
        To get authorized{' '}
        <a href="https://developer.okta.com/docs/reference/api/oidc/#token-claims-for-client-authentication-with-client-secret-or-private-key-jwt">
          generate a JSON web token
        </a>{' '}
        (JWT) and sign it using your private key. You&apos;ll then use the signed JWT as a client
        assertion to receive an access token.
      </p>
      <GeneratingJWTContent
        apiName={apiName}
        productionAud={productionAud}
        sandboxAud={sandboxAud}
      />
      <RetrievingTokenContent baseAuthPath={baseAuthPath} scopes={scopes} />
    </div>
  );
};

export { AuthCodeFlowContent };
