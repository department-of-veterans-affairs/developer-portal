import React, { FC, useEffect, useRef } from 'react';
import { TextField } from '../../../../components';
import { Flag } from '../../../../flags';
import { FLAG_LIST_AND_LOOP } from '../../../../types/constants';
import ListOfTextEntries from './ListOfTextEntries';

const PolicyGovernance: FC = () => {
  const firstInputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    firstInputRef.current?.focus();
  }, []);
  return (
    <>
      <h3 className="vads-u-margin-bottom--3">Terms of service and privacy policies</h3>
      <Flag
        name={[FLAG_LIST_AND_LOOP]}
        fallbackRender={(): JSX.Element => (
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
        )}
      >
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
      </Flag>
    </>
  );
};

export { PolicyGovernance };
