/* eslint-disable no-console */
import { VaAlert } from '@department-of-veterans-affairs/component-library/dist/react-bindings';
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { SandboxAccessForm } from '@department-of-veterans-affairs/sandbox-access-form';
import { Link, useParams } from 'react-router-dom';
import { PageHeader } from '../../components';
import { LPB_APPLY_URL } from '../../types/constants';
import { ApplySuccessResult } from '../../types/forms/apply';
import { SUPPORT_CONTACT_PATH, TERMS_OF_SERVICE_PATH } from '../../types/constants/paths';
import { getApi } from './DocumentationRoot';
import { SandboxAccessSuccess } from './components/sandbox';
import './RequestSandboxAccess.scss';

const RequestSandboxAccess = (): JSX.Element => {
  const { urlSlug } = useParams();
  const api = getApi(urlSlug);
  const [successResults, setSuccessResults] = useState<ApplySuccessResult | false>(false);

  if (!api || api.blockSandboxForm) {
    throw new Error('API does not allow sandbox signups via the public portal');
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

  const acgPkceAuthUrl = `/explore/api/${urlSlug as string}/authorization-code`;
  const ccgPublicKeyUrl = `/explore/api/${urlSlug as string}/client-credentials`;

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
          {api.altID ? (
            <SandboxAccessForm
              apiIdentifier={api.altID}
              authTypes={authTypes}
              onFailure={onFormFailure}
              onSuccess={setSuccessResults}
              urls={{
                acgPkceAuthUrl,
                ccgPublicKeyUrl,
                postUrl: LPB_APPLY_URL,
                termsOfServiceUrl: TERMS_OF_SERVICE_PATH,
              }}
              key={api.urlFragment}
            />
          ) : (
            <VaAlert status="error" visible uswds>
              <p>
                There is an error with this Sandbox Access Form. Please{' '}
                <Link to={SUPPORT_CONTACT_PATH}>contact support</Link> for additional assistance.
              </p>
            </VaAlert>
          )}
        </>
      )}
    </>
  );
};

export default RequestSandboxAccess;
