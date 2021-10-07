import * as React from 'react';
import Helmet from 'react-helmet';
import { useSelector } from 'react-redux';
import {
  PageHeader,
  APISelector
} from '../../../components';
import { GettingStarted } from '../../../components/oauthDocs/ccg/GettingStarted';
import { AuthCodeFlowContent } from '../../../components/oauthDocs/ccg/AuthCodeFlowContent';
import { TestUsers } from '../../../components/oauthDocs/ccg/TestUsers';
import { getAllOauthApis } from '../../../apiDefs/query';
import { isApiDeactivated } from '../../../apiDefs/deprecated';
import { APIDescription } from '../../../apiDefs/schema';
import { RootState } from '../../../types';

interface ClientCredentialsFlowContentProps {
  options: APIDescription[];
  selectedOption: string;
  apiDef?: APIDescription | null;
}

const ClientCredentialsGrantDocs = (): JSX.Element => {
  // TODO: only get APIs that provide client credentials type oauth
  const options = getAllOauthApis().filter((item: APIDescription) => !isApiDeactivated(item) && 
                                                                     item.oAuthTypes && 
                                                                     item.oAuthTypes.includes("ClientCredentialsGrant"));
  const selectedOAuthApi = useSelector(
    (state: RootState) => state.oAuthApiSelection.selectedOAuthApi,
  );

  return (
    <div className="va-api-authorization-docs">
      <Helmet>
        <title>Client Credentials Grant</title>
      </Helmet>
      <PageHeader halo="Authorization" header="Client Credentials Grant" />
      <p>
        The Lighthouse OAuth 2.0 Client Credentials Grant (CCG) works by using your RSA generated key pair in JSON Web Key (JWK) format, as described in the OpenID spec. 
      </p>
      <APISelector options={options} selectedOption={selectedOAuthApi} />
      <GettingStarted />
      <AuthCodeFlowContent options={options} selectedOption={selectedOAuthApi} />
      <TestUsers />
    </div>
  );
};

export { ClientCredentialsGrantDocs, ClientCredentialsFlowContentProps };
