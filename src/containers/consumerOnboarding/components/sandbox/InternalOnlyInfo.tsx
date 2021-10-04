import * as React from 'react';
import classNames from 'classnames';
import { useFormikContext } from 'formik';
import { TextField } from '../../../../components';
import { isVaEmail } from '../../../../utils/validators';
import { Values } from './SandboxAccessForm';

const InternalOnlyInfo = (): JSX.Element => {
  const { errors, values } = useFormikContext<Values>();
  const internalApiInfoName = 'internalApiInfo';
  const shouldDisplayInputError = !!errors[internalApiInfoName];

  return (
    <div className={classNames('vads-u-padding-left--1p5')}>
      <div className="vads-u-font-weight--bold">Internal to VA only:</div>
      <div>
        This API is for use by VA-authorized individuals and departments only. You cannot request an
        API key or use this API unless you have permission from VA.
      </div>

      <div className={classNames('xsmall-screen:vads-l-col--10', shouldDisplayInputError ? 'vads-u-margin-left--0p5' : '')}>
        <TextField
          label="Program name"
          name="internalApiInfo.programName"
          required
          className="vads-u-margin-top--2"
        />

        <TextField
          label="Business/OIT sponsor email"
          name="internalApiInfo.sponsorEmail"
          required
          type="email"
          className="vads-u-margin-top--2"
        />

        {!isVaEmail(values.email) && (
          <TextField
            label="Your VA issued email"
            name="internalApiInfo.vaEmail"
            required
            type="email"
            className="vads-u-margin-top--2"
          />
        )}
      </div>

    </div>
  );
};

export { InternalOnlyInfo };
