/* eslint-disable no-console */
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { SandboxAccessForm } from '@department-of-veterans-affairs/sandbox-access-form';
import { getActiveApis, lookupApiByFragment } from '../../apiDefs/query';
import { APIDescription } from '../../apiDefs/schema';
import { PageHeader } from '../../components';
import { LPB_APPLY_URL } from '../../types/constants';
import { ApplySuccessResult } from '../../types/forms/apply';
import {
  AUTHORIZATION_CCG_PATH,
  AUTHORIZATION_PKCE_PATH,
  TERMS_OF_SERVICE_PATH,
} from '../../types/constants/paths';
import { SandboxAccessSuccess } from './components/sandbox';

const RequestSandboxAccess: React.FunctionComponent = () => {
  const apis = getActiveApis();
  const [successResults, setSuccessResults] = useState<ApplySuccessResult>();
  // This is bad and VERY placeholder
  const defaultApi = {
    oAuth: true,
    oAuthInfo: {
      acgInfo: true,
      ccgInfo: true,
    },
    urlFragment: 'claims',
  } as unknown as APIDescription;
  const [selectedApi, setSelectedApi] = useState<APIDescription>(defaultApi);

  const onChangeApi = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    const api =
      lookupApiByFragment(event.target.value) ?? ({ urlFragment: 'appeals' } as APIDescription);
    setSelectedApi(api);
  };

  const onFormFailure = (data: unknown): void => {
    console.log(data);
  };

  const getAuthTypes = (api: APIDescription): string[] => {
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
    return authTypes;
  };

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
        <>
          <select value={selectedApi.urlFragment} onChange={onChangeApi}>
            {apis.map((api: APIDescription) => (
              <option key={api.urlFragment} value={api.urlFragment}>
                {api.name}
              </option>
            ))}
          </select>
          <SandboxAccessForm
            apiIdentifier={selectedApi.urlFragment}
            authTypes={getAuthTypes(selectedApi)}
            onFailure={onFormFailure}
            onSuccess={setSuccessResults}
            urls={{
              acgPkceAuthUrl: AUTHORIZATION_PKCE_PATH,
              ccgPublicKeyUrl: AUTHORIZATION_CCG_PATH,
              postUrl: LPB_APPLY_URL,
              termsOfServiceUrl: TERMS_OF_SERVICE_PATH,
            }}
            key={selectedApi.urlFragment}
            internalOnly={!!selectedApi.vaInternalOnly}
          />
        </>
      )}
    </>
  );
};

export default RequestSandboxAccess;
