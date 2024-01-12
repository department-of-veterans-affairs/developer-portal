import * as React from 'react';
import { SectionHeaderWrapper } from '../../sectionHeaderWrapper/SectionHeaderWrapper';

const TestUsers = (): JSX.Element => (
  <>
    <SectionHeaderWrapper heading="Test Users" id="test-users" />
    <p>
      Some APIs require test users and test data. Most of the test data provided from the Lighthouse
      platform comes from internal VA systems, is not real data, and are reset based upon new
      recordings of underlying services. We provide{' '}
      <a href="https://github.com/department-of-veterans-affairs/vets-api-clients/blob/master/test_accounts.md">
        test accounts
      </a>{' '}
      for you to use while developing your Lighthouse-based application, and you must be able to log
      in to access this data. These test accounts are API-specific, and contain data that is geared
      toward each API.
    </p>
  </>
);
TestUsers.propTypes = {};

export { TestUsers };
