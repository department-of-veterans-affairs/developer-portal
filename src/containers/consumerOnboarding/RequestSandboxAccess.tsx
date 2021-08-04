import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { PageHeader } from '../../components';
import { ApplySuccessResult } from '../../types';
import { SandboxAccessForm, SandboxAccessSuccess } from './components/sandbox';

const RequestSandboxAccess: React.FunctionComponent = () => {
  const [successResults, setSuccessResults] = useState<ApplySuccessResult>();
  return (
    <>
      <Helmet>
        <title>Request Sandbox Access</title>
      </Helmet>
      <PageHeader header="Request Sandbox Access" />
      {successResults ? (
        <SandboxAccessSuccess result={successResults} />
      ) : (
        <>
          <p>Your first step towards developing with VA Lighthouse APIs.</p>
          <p>
            Get automatic sandbox access to VA Lighthouse APIs by completing our access form. When
            your app is ready, request production access.
          </p>
          <p>It’s good to know:</p>
          <ul>
            <li>
              Our rate limiting is 60 requests per minute. If you exceed this quota, your request
              will return a 429 status code. You may petition for increased rate limits by{' '}
              <a href="mailto:api@va.gov">emailing us</a>. Approval will be decided on a case by
              case basis.
            </li>
            <li>
              Getting production access requires multiple steps and can take under a week for open
              data APIs, and over a month for APIs that require a demo.
            </li>
          </ul>
          <SandboxAccessForm onSuccess={setSuccessResults} />
        </>
      )}
    </>
  );
};

export default RequestSandboxAccess;
