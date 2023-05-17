/* eslint-disable no-console */
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { SandboxAccessForm } from '@department-of-veterans-affairs/sandbox-access-form';
import { useParams } from 'react-router';
import { PageHeader } from '../../components';
import { LPB_APPLY_URL } from '../../types/constants';
import { ApplySuccessResult } from '../../types/forms/apply';
import {
  AUTHORIZATION_CCG_PATH,
  AUTHORIZATION_PKCE_PATH,
  TERMS_OF_SERVICE_PATH,
} from '../../types/constants/paths';
import { APIUrlFragment } from '../../types';
import { getApi } from '../documentation/DocumentationRoot';
import { SandboxAccessSuccess } from './components/sandbox';

const RequestSandboxAccess: React.FunctionComponent = () => {
  const params = useParams<APIUrlFragment>();
  const api = getApi(params.urlFragment);
  const [successResults, setSuccessResults] = useState<ApplySuccessResult>();
  if (!api) {
    return <h1>placeholder 404</h1>;
  }

  const onFormFailure = (data: unknown): void => {
    console.log(data);
  };

  const authTypes = [];
  if (!api.oAuth) {
    authTypes.push('apikey');
  }
  if (api.oAuthInfo?.acgInfo) {
    authTypes.push('acg');
  }
  if (api.oAuthInfo?.ccgInfo) {
    authTypes.push('ccg');
  }

  return (
    <>
      <Helmet>
        {successResults ? (
          <title>Your submission was successful.</title>
        ) : (
          <title>Request Sandbox Access</title>
        )}
      </Helmet>
      <PageHeader
        header={successResults ? 'Your submission was successful.' : 'Request Sandbox Access'}
      />
      {successResults ? (
        <SandboxAccessSuccess result={successResults} />
      ) : (
        <SandboxAccessForm
          apiIdentifier={api.urlFragment}
          authTypes={authTypes}
          onFailure={onFormFailure}
          onSuccess={setSuccessResults}
          urls={{
            acgPkceAuthUrl: AUTHORIZATION_PKCE_PATH,
            ccgPublicKeyUrl: AUTHORIZATION_CCG_PATH,
            postUrl: LPB_APPLY_URL,
            termsOfServiceUrl: TERMS_OF_SERVICE_PATH,
          }}
          key={api.urlFragment}
          internalOnly={!!api.vaInternalOnly}
        />
      )}
    </>
  );
};

export default RequestSandboxAccess;
