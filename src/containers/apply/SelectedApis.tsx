import classNames from 'classnames';
import * as React from 'react';
import { useFormikContext, ErrorMessage } from 'formik';
import { CheckboxRadioField } from '../../components';
import './SelectedApis.scss';

interface APICheckbox {
  id: string;
  label: string;
}

interface APICheckboxListProps {
  apiCheckboxes: APICheckbox[];
}

const ApiCheckboxList = ({ apiCheckboxes }: APICheckboxListProps): JSX.Element => (
  <>
    {apiCheckboxes.map(api => (
      <CheckboxRadioField
        type="checkbox"
        key={api.id}
        name="apis"
        label={api.label}
        value={api.id}
      />
    ))}
  </>
);

const oauthInfo = [
  {
    id: 'claims',
    label: 'VA Claims API',
  },
  {
    id: 'health',
    label: 'VA Health API',
  },
  {
    id: 'communityCare',
    label: 'Community Care Eligibility API',
  },
  {
    id: 'verification',
    label: 'VA Veteran Verification API',
  },
];

const apiInfo = [
  {
    id: 'claimsAttributes',
    label: 'Claims Attributes API',
  },
  {
    id: 'benefits',
    label: 'VA Benefits API',
  },
  {
    id: 'facilities',
    label: 'VA Facilities API',
  },
  {
    id: 'vaForms',
    label: 'VA Forms API',
  },
  {
    id: 'confirmation',
    label: 'VA Veteran Confirmation API',
  },
];

const SelectedAPIs = (): JSX.Element => {
  const { errors, touched } = useFormikContext();
  const checkboxName = 'apis';
  const shouldDisplayErrors = !!errors[checkboxName] && !!touched[checkboxName];
  const containerClass = shouldDisplayErrors ? 'usa-input-error' : '';
  const labelClass = shouldDisplayErrors ? 'usa-input-error-label' : '';
  const validationClass = shouldDisplayErrors ? 'usa-input-error-message' : '';
  const selectAPIClass = shouldDisplayErrors
    ? 'vads-u-font-weight--bold'
    : 'vads-u-font-weight--normal';

  return (
    <fieldset className={classNames(containerClass, 'apply-api-select')}>
      <span className="vads-u-margin-top--3 apply-checkbox-labels">
        <legend className={classNames(selectAPIClass, 'vads-u-font-size--base', labelClass)}>
          Select the APIs you want to access.{' '}
          <span className="apply-required">&#40;*Required&#41;</span>
        </legend>
        <span id="api-checkbox-error" className={validationClass}>
          <ErrorMessage name="apis" />
        </span>
        <p>You can always request access to more APIs later.</p>
        <fieldset
          className="vads-u-margin-top--2"
          aria-label="Please select all of the Standard APIs you'd like access to:"
        >
          <legend className="vads-u-font-size--lg">Standard APIs:</legend>
          <ApiCheckboxList apiCheckboxes={apiInfo} />
        </fieldset>
        <fieldset
          className="vads-u-margin-top--2"
          aria-label="Please select all the OAuth APIs you'd like access to:"
        >
          <legend className="vads-u-font-size--lg">OAuth APIs:</legend>
          <ApiCheckboxList apiCheckboxes={oauthInfo} />
        </fieldset>
      </span>
    </fieldset>
  );
};

export default SelectedAPIs;
