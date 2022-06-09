import * as React from 'react';
import { SectionHeaderWrapper } from '../../index';
import { lookupApiByFragment } from '../../../apiDefs/query';
import { ClientCredentialsFlowContentProps } from '../../../containers/documentation/ClientCredentialsGrant/ClientCredentialsGrantDocs';
import GeneratingJWTContent from './GeneratingJWTContent';
import RetrievingTokenContent from './RetrievingTokenContent';

const AuthCodeFlowContent = (props: ClientCredentialsFlowContentProps): JSX.Element => {
  const apiDef = lookupApiByFragment(props.selectedOption);
  const scopes = apiDef?.oAuthInfo?.ccgInfo?.scopes ?? [];
  const baseAuthPath = apiDef?.oAuthInfo?.ccgInfo?.baseAuthPath ?? '/oauth2/{api}/v1';
  const apiName = apiDef?.name ?? '';
  const sandboxAud = apiDef?.oAuthInfo?.ccgInfo?.sandboxAud ?? '';
  const productionAud = apiDef?.oAuthInfo?.ccgInfo?.productionAud ?? '';

  return (
    <div>
      <SectionHeaderWrapper heading="Requesting a Token with CCG" id="requesting-a-token" />
      <p>
        To get authorized{' '}
        <a href="https://developer.okta.com/docs/reference/api/oidc/#token-claims-for-client-authentication-with-client-secret-or-private-key-jwt">
          generate a JSON web token
        </a>{' '}
        (JWT) and sign it using your private key. You’ll then use the signed JWT as a client
        assertion to receive an access token.
      </p>
      <GeneratingJWTContent
        apiName={apiName}
        productionAud={productionAud}
        sandboxAud={sandboxAud}
      />
      <RetrievingTokenContent
        options={props.options}
        selectedOption={props.selectedOption}
        baseAuthPath={baseAuthPath}
        scopes={scopes}
      />
    </div>
  );
};

export { AuthCodeFlowContent };
