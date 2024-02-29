import * as React from 'react';
import { useParams } from 'react-router-dom';
import { SectionHeaderWrapper } from '../../sectionHeaderWrapper/SectionHeaderWrapper';
import { testUserGitHubUrl } from '../../../utils/testUsersHelper';

const TestUsers = (): JSX.Element => {
  const { urlSlug } = useParams();
  return (
    <>
      <SectionHeaderWrapper heading="Test Users" id="test-users" />
      <p>
        Some APIs require test users and test data. Most of the test data provided from the
        Lighthouse platform comes from internal VA systems, are not real data, and are reset based
        upon new recordings of underlying services. We provide test accounts for you to use while
        developing your application. These test accounts are API-specific, and contain data that is
        geared toward each API.
      </p>
      <p>
        To access test data, go to the{' '}
        <a href={testUserGitHubUrl(urlSlug)}>test accounts GitHub page</a> and find test users that
        meet your use case. Then, access test account credentials by using the link in the email
        we&apos;ll send to you when you sign up for sandbox access.
      </p>
    </>
  );
};

TestUsers.propTypes = {};

export { TestUsers };
