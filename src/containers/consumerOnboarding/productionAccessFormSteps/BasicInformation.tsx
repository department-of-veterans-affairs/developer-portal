import React, { FC } from 'react';
import { TextField, ListOfTextEntries } from '../../../components';
// import { Values } from '../ProductionAccess';

const BasicInformation: FC = () => {
  return (
    <>
      <h3>Primary Contact</h3>
      <TextField
        label="First name"
        name="primaryContact.firstName"
        required
        className="vads-u-margin-top--4 medium-screen:vads-l-col--10"
      />

      <TextField
        label="Last name"
        name="primaryContact.lastName"
        required
        className="vads-u-margin-top--4 medium-screen:vads-l-col--10"
      />

      <TextField
        label="Email"
        name="primaryContact.email"
        type="email"
        required
        className="vads-u-margin-top--4 medium-screen:vads-l-col--10"
      />
      <h3>Secondary Contact</h3>
      <TextField
        label="First name"
        name="secondaryContact.firstName"
        required
        className="vads-u-margin-top--4 medium-screen:vads-l-col--10"
      />

      <TextField
        label="Last name"
        name="secondaryContact.lastName"
        required
        className="vads-u-margin-top--4 medium-screen:vads-l-col--10"
      />

      <TextField
        label="Email"
        name="secondaryContact.email"
        type="email"
        required
        className="vads-u-margin-top--4 medium-screen:vads-l-col--10"
      />
      <h3>About your company or organization</h3>
      <TextField
        label="Company or organization name"
        name="companyName"
        required
        className="vads-u-margin-top--4 medium-screen:vads-l-col--10"
      />
      <TextField
        label="Phone number"
        name="phoneNumber"
        required
        className="vads-u-margin-top--4 medium-screen:vads-l-col--10"
      />
      <TextField
        label="Front-end name of application (if different from organization name)"
        name="applicationName"
        required
        className="vads-u-margin-top--4 medium-screen:vads-l-col--10"
      />
      <ListOfTextEntries
        description={
          <>
            <p>Notification email for API status updates</p>
            <p>
              A distribution list email is preferred. You may enter more than one email address, and
              this information can be updated later.
            </p>
          </>
        }
        className="vads-u-background-color--gray-lightest vads-u-margin-top--2p5"
        type="email"
        buttonText=" Add another email"
      />
    </>
  );
};

export default BasicInformation;
