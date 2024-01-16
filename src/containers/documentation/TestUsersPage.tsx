import LoadingIndicator from 'component-library-legacy/LoadingIndicator';
import * as React from 'react';
import { useCookies } from 'react-cookie';
import { Helmet } from 'react-helmet';
import { Link, useParams } from 'react-router-dom';

import {
  LPB_TEST_USER_ACCESS_URL,
  LPB_FORGERY_TOKEN,
  testUserAccessState,
} from '../../types/constants';
import { PageHeader } from '../../components';

import { TestUser, isPasswordUniform } from '../../utils/testUsersHelper';
import { useAppDispatch } from '../../hooks';
import { setUserStore } from '../../features/user/userSlice';
import { useGetTestUsersDataQuery } from '../../services/lpb';
import { getApi } from './DocumentationRoot';

interface TestUsersPageParams {
  urlSlug: string;
  userId: string;
  hash: string;
}

const TestUsersPage = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const [testUserAccess, setTestUserAccess] = React.useState(testUserAccessState.INIT);
  const [testUserData, setTestUserData] = React.useState<TestUser[]>([]);
  const setCookie = useCookies(['CSRF-TOKEN'])[1];
  const { urlSlug, userId, hash } = useParams() as unknown as TestUsersPageParams;
  const api = getApi(urlSlug);
  setCookie('CSRF-TOKEN', LPB_FORGERY_TOKEN, {
    path: LPB_TEST_USER_ACCESS_URL,
    sameSite: 'strict',
    secure: true,
  });
  const { data, status } = useGetTestUsersDataQuery({
    hash,
    urlSlug,
    userId,
  });

  React.useEffect(() => {
    if (status === 'fulfilled') {
      setTestUserData(data as TestUser[]);
      dispatch(
        setUserStore({
          id: parseInt(userId, 10),
          testUserHash: hash,
        }),
      );
      setTestUserAccess(testUserAccessState.ACCESS_PERMITTED);
    }
    if (status === 'rejected') {
      setTestUserAccess(testUserAccessState.ACCESS_BLOCKED);
    }
  }, [data, dispatch, hash, status, userId, setTestUserAccess]);

  if (!api) {
    throw new Error('API not found');
  }

  if (testUserAccess === testUserAccessState.INIT) {
    return <LoadingIndicator label="Loading" message="Validating access to Test User Data." />;
  }

  return (
    <>
      <Helmet>
        <title>{api.name} Test Users</title>
      </Helmet>
      <PageHeader header="Test Users" subText={api.name} />
      <div className="va-api-authorization-docs">
        {testUserAccess === testUserAccessState.ACCESS_BLOCKED && (
          <va-alert background-only show-icon status="error" visible>
            <p className="vads-u-margin-y--0">
              There was an error requesting access to the test user data. Please recheck the link in
              your sandbox access signup email or request access by signing up{' '}
              <Link to={`/explore/api/${api.urlSlug}/sandbox-access`}>here</Link>.
            </p>
          </va-alert>
        )}
        {testUserAccess === testUserAccessState.ACCESS_PERMITTED && (
          <>
            <p>
              This page contains login instructions for ID.me and Login.gov and account credentials
              for test users for the <Link to={`/explore/api/${api.urlSlug}`}>{api.name}</Link>.
            </p>
            <h2>How to use this page</h2>
            <p>
              Find the test users on the corresponding{' '}
              <a href={api.oAuthInfo?.acgInfo?.gitHubTestUsers} target="blank">
                test accounts GitHub page
              </a>{' '}
              that will meet your use case. Then, locate those test users on this page to get the
              credentials you need. Follow the instructions for using either ID.me or Login.gov and
              instructions for{' '}
              <Link to={`/explore/api/${api.urlSlug}/authorization-code`}>
                authorization code grant
              </Link>
              .
            </p>
            <p>
              We suggest bookmarking both this page and the test accounts GitHub page so you can
              return to them if you need other test accounts. The links to these pages do not
              expire.
            </p>
            <h3>Logging in with ID.me</h3>
            <p>To log in to the sandbox environment using ID.me, make sure you:</p>
            <ol>
              <li>Choose an account that meets the use case for your needs and API. </li>
              <li>Select ID.me to sign in to the sandbox environment.</li>
              <li>
                Enter the ID.me username and password.{' '}
                {isPasswordUniform('idme', testUserData) && (
                  <>The password for all ID.me test accounts is: Password1234!</>
                )}
              </li>
              <li>
                Don&apos;t change any preselected answers when asked about receiving an
                authentication code. Just click “Continue” to go to the next step.
              </li>
            </ol>
            <h3>Logging in with Login.gov</h3>
            <p>To log in to the sandbox environment using Login.gov, make sure you:</p>
            <ol>
              <li>Choose an account that meets the use case for your needs and API. </li>
              <li>Select Login.gov to sign in to the sandbox environment.</li>
              <li>
                Enter the Login.gov username and password.{' '}
                {isPasswordUniform('logingov', testUserData) && (
                  <>The password for all Login.gov test accounts is: Password12345!!!</>
                )}
              </li>
              <li>
                Use the Login.gov MFA seed to generate a 2FA code with an app such as Google
                Authenticator or Authy.
              </li>
            </ol>

            {isPasswordUniform('idme', testUserData) && (
              <p>Password for all ID.me accounts: Password1234!</p>
            )}
            {isPasswordUniform('logingov', testUserData) && (
              <p>Password for all Login.gov accounts: Password12345!!!</p>
            )}

            <h2>Test user credentials for the {api.name}</h2>

            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>ID</th>
                    <th>ICN</th>
                    <th>SSN</th>
                    <th>Login.gov</th>
                    <th>ID.me</th>
                  </tr>
                </thead>
                <tbody>
                  {testUserData.map((user: TestUser) => (
                    <tr key={user.icn}>
                      <td>{user.name_given}</td>
                      <td>{user.name_family}</td>
                      <td>{user.id}</td>
                      <td>{user.icn}</td>
                      <td>{user.ssn}</td>
                      <td>
                        Email: {user.credentials.logingov.username}
                        <br />
                        Password: {user.credentials.logingov.password}
                        <br />
                        2-Factor Seed: {user.credentials.logingov.seed}
                      </td>
                      <td>
                        Email: {user.credentials.idme.username}
                        <br />
                        Password: {user.credentials.idme.password}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </>
  );
};

TestUsersPage.propTypes = {};
export default TestUsersPage;
