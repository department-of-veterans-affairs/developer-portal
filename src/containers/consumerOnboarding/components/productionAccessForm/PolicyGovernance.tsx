import React, { FC } from 'react';
import { TextField } from '../../../../components';

const PolicyGovernance: FC = () => (
  <fieldset>
    <legend>
      <h3 className="vads-u-margin-bottom--3">Provide a public link to your app&apos;s terms of service and privacy policies.</h3>
      <p className="vads-u-color--gray-medium vads-u-font-size--base vads-u-font-weight--normal">We will review your policies to make sure they meet our standards. These policies must be accessible through your application.</p>
    </legend>
    <TextField
      name="termsOfServiceURL"
      label={
        <>
          Terms of service URL.{' '}
          <span className="form-required-span">(*Required)</span>
        </>
      }
    />
    <TextField
      name="privacyPolicyURL"
      label={
        <>
          Privacy policy URL.{' '}
          <span className="form-required-span">(*Required)</span>
        </>
      }
    />
  </fieldset>
);

export { PolicyGovernance };
