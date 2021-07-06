import classNames from 'classnames';
import * as React from 'react';
import { ErrorMessage, useFormikContext } from 'formik';
import { CheckboxRadioField, FieldSet } from '../../components';
import { anyOAuthApisSelected } from './validateForm';
import { OAuthAppInfo } from './OAuthAppInfo';
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

interface SelectedApisProps {
  selectedApis: string[];
}

const SelectedAPIs = ({ selectedApis }: SelectedApisProps): JSX.Element => {
  const { errors } = useFormikContext();
  const checkboxName = 'apis';
  const shouldDisplayErrors = !!errors[checkboxName];
  const containerClass = shouldDisplayErrors ? 'usa-input-error' : '';
  const labelClass = shouldDisplayErrors ? 'usa-input-error-label' : '';
  const validationClass = shouldDisplayErrors ? 'usa-input-error-message' : '';
  const errorMessagePaddingClass = shouldDisplayErrors ? 'vads-u-padding-x--1p5' : '';
  const selectAPIClass = shouldDisplayErrors
    ? 'vads-u-font-weight--bold'
    : 'vads-u-font-weight--normal';

  const oauthApisSelected = anyOAuthApisSelected(selectedApis);
  const oauthApisBorderClass = oauthApisSelected ? 'vads-u-border-left--4px' : '';
  const oauthApisBorderColorClass = oauthApisSelected
    ? 'vads-u-border-color--primary-alt-light'
    : '';

  return (
    <fieldset
      aria-labelledby="select-checkbox-api"
      className={classNames(
        containerClass,
        'apply-api-select',
        'vads-u-background-color--gray-lightest',
        'vads-u-margin-top--2p5',
        )}
    >
      <div className="vads-u-margin-top--1 apply-checkbox-labels">
        <legend
          id="select-checkbox-api"
          className={classNames(
            selectAPIClass,
            labelClass,
            'vads-u-font-size--base',
            'vads-u-padding-x--1p5',
          )}
        >
          Select the APIs you want to access.{' '}
          <span className="vads-u-color--secondary-dark">&#40;*Required&#41;</span>
        </legend>
        <span
          id="api-checkbox-error"
          className={classNames(validationClass, errorMessagePaddingClass)}
          role="alert"
        >
          <ErrorMessage name="apis" />
        </span>
        <p className="vads-u-padding-x--1p5">You can always request access to more APIs later.</p>
        <FieldSet
          className={classNames('vads-u-margin-top--2', 'vads-u-padding-x--1p5')}
          legend="Standard APIs:"
          legendClassName="vads-u-font-size--lg"
          name="standardApis"
        >
          <ApiCheckboxList apiCheckboxes={apiInfo} />
        </FieldSet>
        <FieldSet
          className={classNames(
            'vads-u-margin-top--2',
            'vads-u-padding-x--1p5',
            'vads-u-padding-bottom--1p5',
            oauthApisBorderClass,
            oauthApisBorderColorClass,
          )}
          legend="OAuth APIs:"
          legendClassName="vads-u-font-size--lg"
          name="oauthApis"
        >
          <ApiCheckboxList apiCheckboxes={oauthInfo} />
          {oauthApisSelected && <OAuthAppInfo />}
        </FieldSet>
      </div>
    </fieldset>
  );
};

export default SelectedAPIs;
