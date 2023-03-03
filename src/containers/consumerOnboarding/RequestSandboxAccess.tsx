import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { PageHeader } from '../../components';
import { ApplySuccessResult } from '../../types/forms/apply';
import { isVaEmail } from '../../utils/validators';
import { SandboxAccessForm, SandboxAccessSuccess } from './components/sandbox';

interface RequestGoodToKnowProps {
  confirmation: boolean;
}

const RequestSandboxAccessGoodToKnow: React.FunctionComponent<RequestGoodToKnowProps> = ({
  confirmation,
}) => (
  <>
    <p className={confirmation ? 'vads-u-font-weight--bold' : ''}>It’s good to know:</p>
    <ul>
      <li>
        Our rate limiting is 60 requests per minute. If you exceed this quota, your request will
        return a 429 status code. You may petition for increased rate limits by{' '}
        <a href="mailto:api@va.gov">emailing us</a>. Approval will be decided on a case by case
        basis.
      </li>
      <li>
        Getting production access requires multiple steps and can take under a week for open data
        APIs, and over a month for APIs that require a demo.
      </li>
    </ul>
    {confirmation && (
      <p>
        If you would like to report a bug or make a feature request, please open an issue through
        our <Link to="/support">Support page</Link>.
      </p>
    )}
  </>
);

const RequestSandboxAccess: React.FunctionComponent = () => {
  const [successResults, setSuccessResults] = useState<ApplySuccessResult>();

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
        <>
          <SandboxAccessSuccess result={successResults} />
          {isVaEmail(successResults.email) && (
            <RequestSandboxAccessGoodToKnow confirmation={!!successResults.email} />
          )}
        </>
      ) : (
        <>
          <p>Your first step towards developing with VA Lighthouse APIs.</p>
          <p>
            Get automatic sandbox access to VA Lighthouse APIs by completing our access form. When
            your app is ready, request production access.
          </p>
          <RequestSandboxAccessGoodToKnow confirmation={!!successResults} />
          <SandboxAccessForm onSuccess={setSuccessResults} />
        </>
      )}
    </>
  );
};

export default RequestSandboxAccess;
