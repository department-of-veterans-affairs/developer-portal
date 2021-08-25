import * as React from 'react';
import classNames from 'classnames';
import { useFormikContext } from 'formik';
import { TextField } from '../../../../components';
import { VA_EMAIL_PATTERN } from '../../../../utils/validators';
import { Values } from './SandboxAccessForm';

const InternalOnlyInfo = (): JSX.Element => {
  const { errors, values } = useFormikContext();
  const formValues = values as Values;
  const internalApiInfoName = 'internalApiInfo';
  const shouldDisplayInputError = !!errors[internalApiInfoName];
  const internalApiInfoClass = shouldDisplayInputError ? 'vads-u-margin-left--3' : '';
  const internalInputClassNames = 'vads-u-margin-top--2 large-screen:vads-l-col--8';

  return (
    <div className={classNames('vads-u-padding-left--1p5')}>
      <div className="vads-u-font-weight--bold">Internal to VA only:</div>
      <div>
        This API is for use by VA-authorized individuals and departments only. You cannot request an
        API key or use this API unless you have permission from VA. Provisional access takes 2-3
        business days.
      </div>

      <TextField
        label="Program name"
        name="internalApiInfo.programName"
        required
        className={classNames(internalInputClassNames, internalApiInfoClass)}
      />

      <TextField
        label="Business/OIT sponsor email"
        name="internalApiInfo.sponsorEmail"
        required
        type="email"
        className={classNames(internalInputClassNames, internalApiInfoClass)}
      />

      {!VA_EMAIL_PATTERN.test(formValues.email) && (
        <TextField
          label="Your VA issued email"
          name="internalApiInfo.vaEmail"
          required
          type="email"
          className={classNames(internalInputClassNames, internalApiInfoClass)}
        />
      )}
    </div>
  );
};

export { InternalOnlyInfo };
