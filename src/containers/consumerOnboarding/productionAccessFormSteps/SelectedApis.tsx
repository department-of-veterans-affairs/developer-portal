import classNames from 'classnames';
import * as React from 'react';
import { ErrorMessage, useFormikContext } from 'formik';
import { CheckboxRadioField, OnlyTags } from '../../../components';
import { getAllApis } from '../../../apiDefs/query';
import { APIDescription } from '../../../apiDefs/schema';
import { Flag } from '../../../flags';
import { FLAG_HOSTED_APIS } from '../../../types/constants';
// import { anyOAuthApisSelected } from './validateForm';
// import { OAuthAppInfo } from './OAuthAppInfo';

interface APICheckboxListProps {
  apiCheckboxes: APIDescription[];
}

const ApiCheckboxList = ({ apiCheckboxes }: APICheckboxListProps): JSX.Element => (
  <>
    {apiCheckboxes.map(api => (
      <Flag name={[FLAG_HOSTED_APIS, api.urlFragment]} key={api.urlFragment}>
        <CheckboxRadioField
          type="checkbox"
          name="apis"
          label={
            <>
              <span>{api.name}</span>
              <span className="vads-u-display--inline-block vads-u-margin-left--1">
                {api.vaInternalOnly || api.trustedPartnerOnly ? (
                  <OnlyTags
                    trustedPartnerOnly={api.trustedPartnerOnly}
                    vaInternalOnly={api.vaInternalOnly}
                  />
                ) : undefined}
              </span>
            </>
          }
          value={api.altID ?? api.urlFragment}
        />
      </Flag>
    ))}
  </>
);
const allApis = getAllApis();
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

  // const oauthApisSelected = anyOAuthApisSelected(selectedApis);
  // const oauthApisBorderClass = oauthApisSelected ? 'vads-u-border-left--4px' : '';
  // const oauthApisBorderColorClass = oauthApisSelected
  //   ? 'vads-u-border-color--primary-alt-light'
  //   : '';
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
          Select the APIs for which you are requesting production access.{' '}
          <span className="vads-u-color--secondary-dark">&#40;*Required&#41;</span>
        </legend>
        <span
          id="api-checkbox-error"
          className={classNames(validationClass, errorMessagePaddingClass)}
          role="alert"
        >
          <ErrorMessage name="apis" />
        </span>
        {/* <FieldSet
          className={classNames('vads-u-margin-top--2', 'vads-u-padding-x--1p5')}
        > */}
        <ApiCheckboxList apiCheckboxes={allApis} />
        {/* </FieldSet> */}
      </div>
    </fieldset>
  );
};

export default SelectedAPIs;
