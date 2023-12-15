import LoadingIndicator from 'component-library-legacy/LoadingIndicator';
import * as React from 'react';
import { useCookies } from 'react-cookie';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';

import {
  LPB_TEST_USER_ACCESS_URL,
  LPB_FORGERY_TOKEN,
  testUserAccessState,
} from '../../types/constants';
import { PageHeader } from '../../components';

import './TestUsersPage.scss';
import { ResponseType, makeRequest } from '../../utils/makeRequest';
import { getApi } from './DocumentationRoot';

const TestUsersPage = (): JSX.Element => {
  const [testUserAccess, setTestUserAccess] = React.useState(testUserAccessState.IN_PROGRESS);
  const [testUsers, setTestUsers] = React.useState<unknown[]>([]);
  const setCookie = useCookies(['CSRF-TOKEN'])[1];
  const { urlSlug, userId, hash } = useParams();
  const api = getApi(urlSlug);

  if (!api) {
    throw new Error('API not found');
  }

  if (testUserAccess === testUserAccessState.IN_PROGRESS) {
    try {
      setCookie('CSRF-TOKEN', LPB_FORGERY_TOKEN, {
        path: LPB_TEST_USER_ACCESS_URL,
        sameSite: 'strict',
        secure: true,
      });

      makeRequest(
        LPB_TEST_USER_ACCESS_URL,
        {
          body: JSON.stringify({
            hash,
            urlSlug,
            userId,
          }),
          headers: {
            'X-Csrf-Token': LPB_FORGERY_TOKEN,
            accept: 'application/json',
            'content-type': 'application/json',
          },
          method: 'POST',
        },
        { responseType: ResponseType.JSON },
      )
        // eslint-disable-next-line promise/always-return
        .then((data: unknown): void => {
          const responseData = data as {
            ok: boolean;
            status: number;
            body: unknown[];
          };
          // eslint-disable-next-line no-console
          console.log(responseData.body);
          setTestUsers(responseData.body);
          setTestUserAccess(testUserAccessState.ACCESS_PERMITTED);
        })
        .catch(() => {
          setTestUserAccess(testUserAccessState.ACCESS_BLOCKED);
        });
    } catch {
      setTestUserAccess(testUserAccessState.ACCESS_BLOCKED);
    }

    return <LoadingIndicator label="Loading" message="Validating access to Test User Data." />;
  }

  return (
    <>
      <Helmet>
        <title>{api.name} Test Users</title>
      </Helmet>
      <PageHeader header="Test Users" subText={api.name} />
      {testUserAccess === testUserAccessState.ACCESS_BLOCKED && (
        <p>
          There was an error requesting access for the test user data. Please recheck your link in
          your sandbox access signup email or request access by signing up for Sandbox Access.
        </p>
      )}
      {testUserAccess === testUserAccessState.ACCESS_PERMITTED && (
        <>
          <p>Here&apos;s some test user data:</p>
          <ul>
            {testUsers.map((user: { icn: number; name_given: string; name_family: string }) => (
              <li key={user.icn}>
                {user.name_given} {user.name_family}
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
};

TestUsersPage.propTypes = {};
export default TestUsersPage;
