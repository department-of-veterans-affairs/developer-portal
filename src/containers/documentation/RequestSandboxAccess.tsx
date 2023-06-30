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
import { APIUrlSlug } from '../../types';
import ErrorPage404 from '../ErrorPage404';
import { getApi } from './DocumentationRoot';
import { SandboxAccessSuccess } from './components/sandbox';
import './RequestSandboxAccess.scss';

const RequestSandboxAccess: React.FunctionComponent = () => {
  const params = useParams<APIUrlSlug>();
  const api = getApi(params.urlSlug);
  const [successResults, setSuccessResults] = useState<ApplySuccessResult | false>(false);
  // const [successResults, setSuccessResults] = useState<ApplySuccessResult>({
  //   apis: ['ccg/fhir'],
  //   ccgClientId: 'CCG-Client-ID',
  //   clientID: 'clientID',
  //   clientSecret: 'clientSecret',
  //   email: 'giles.wells@va.gov',
  //   kongUsername: 'kong-username',
  //   // redirectURI: 'redirectURI',
  //   token: 'api-token-value',
  // });
  if (!api) {
    return <ErrorPage404 />;
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
          <title>{api.name} Request Sandbox Access</title>
        )}
      </Helmet>
      <PageHeader
        header={successResults ? 'Success, happy developing!' : 'Request Sandbox Access'}
        subText={successResults ? '' : api.name}
      />
      {successResults ? (
        <SandboxAccessSuccess result={successResults} api={api} />
      ) : (
        <>
          <p className="vads-u-margin-top--3">
            Submit this form to get instant access to test data for this API.
          </p>
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
          />
        </>
      )}
    </>
  );
};

export default RequestSandboxAccess;
