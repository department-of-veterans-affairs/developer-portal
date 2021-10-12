import * as React from 'react';
import { SectionHeaderWrapper } from '../../sectionHeaderWrapper/SectionHeaderWrapper';

const TestUsers = (): JSX.Element => (
  <>
    <SectionHeaderWrapper heading="Test user ICNs" id="test-users" />
    <p>
      You can get test users ICNs on
      the <a href="https://github.com/department-of-veterans-affairs/vets-api-clients/blob/master/test_accounts.md">test users page</a>. Search by the values indicated in your API documentation.
    </p>
  </>
);

TestUsers.propTypes = {};

export { TestUsers };
