import React, { FC, useEffect, useRef } from 'react';
import ListOfTextEntries from './ListOfTextEntries';

const PolicyGovernance: FC = () => {
  const firstInputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    firstInputRef.current?.focus();
  }, []);
  return (
    <>
      <h3>Terms of service and privacy policies</h3>
      <ListOfTextEntries
        description={
          <>
            <p>
              Provide a public link or attach copies of your terms of service and privacy policies.{' '}
              <span className="form-required-span">(*Required)</span>
            </p>
            <p>
              We will review your policies to make sure they meet our standards. These policies must
              be accessible through your application.
            </p>
          </>
        }
        className="vads-u-background-color--gray-lightest vads-u-margin-top--2p5"
        name="policyDocuments"
        buttonText="Add a URL"
        innerRef={firstInputRef}
      />
    </>
  );
};

export { PolicyGovernance };
