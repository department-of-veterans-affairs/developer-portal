import React, { FC, useEffect, useRef } from 'react';
import { TextField } from '../../../../components';

const PolicyGovernance: FC = () => {
  const firstInputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    firstInputRef.current?.focus();
  }, []);
  return (
    <>
      <h3 className="vads-u-margin-bottom--3">Terms of service and privacy policies</h3>
      <TextField
        name="policyDocuments"
        label={
          <>
            Provide a single public link (URL).{' '}
            <span className="form-required-span">(*Required)</span>
          </>
        }
        description="We will review your policies to make sure they meet our standards. These policies must be accessible through your application."
        innerRef={firstInputRef}
      />
    </>
  );
};

export { PolicyGovernance };
