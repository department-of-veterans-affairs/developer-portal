import React, { FC } from 'react';
import { TextField } from '../../../../components';

const PolicyGovernance: FC = () => (
  <fieldset>
    <legend>
      <h3 className="vads-u-margin-bottom--3">Terms of service and privacy policies</h3>
    </legend>
    <TextField
      name="policyDocuments"
      label={
        <>
          Provide a single public link (URL).{' '}
          <span className="form-required-span">(*Required)</span>
        </>
      }
      description="We will review your policies to make sure they meet our standards. These policies must be accessible through your application."
    />
  </fieldset>
);

export { PolicyGovernance };
