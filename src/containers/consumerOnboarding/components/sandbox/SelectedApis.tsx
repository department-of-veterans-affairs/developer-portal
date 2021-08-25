import classNames from 'classnames';
import * as React from 'react';
import { ErrorMessage, useFormikContext } from 'formik';
import { CheckboxRadioField, FieldSet, ApiTags } from '../../../../components';
import { getAllOauthApis, getAllKeyAuthApis } from '../../../../apiDefs/query';
import { APIDescription } from '../../../../apiDefs/schema';
import { Flag } from '../../../../flags';
import { FLAG_HOSTED_APIS, APPLY_INTERNAL_APIS } from '../../../../types/constants';
import { anyOAuthApisSelected } from './validateForm';
import { OAuthAppInfo } from './OAuthAppInfo';
import { InternalOnlyInfo } from './InternalOnlyInfo';
import { Values } from './SandboxAccessForm';
import './SelectedApis.scss';

interface APICheckboxListProps {
  apiCheckboxes: APIDescription[];
  checkedApis: Values;
}

const ApiCheckboxList = ({ apiCheckboxes, checkedApis }: APICheckboxListProps): JSX.Element => {
  const hostedApis = apiCheckboxes.filter(
    api =>
      !api.vaInternalOnly  ||
      APPLY_INTERNAL_APIS.includes(api.urlFragment),
  );

  return (
    <>
      {hostedApis.map(api => {
        const apiCheckboxName = api.altID ?? api.urlFragment;
        const internalApiSelected =
          checkedApis.apis.includes(apiCheckboxName) && api.vaInternalOnly;
        return (
          <Flag name={[FLAG_HOSTED_APIS, api.urlFragment]} key={api.urlFragment}>
            <div
              className={classNames(
                internalApiSelected ? 'vads-u-border-left--4px' : '',
                internalApiSelected ? 'vads-u-border-color--primary-alt-light' : '',
              )}
            >
              <CheckboxRadioField
                type="checkbox"
                name="apis"
                label={
                  <>
                    <span>{api.name}</span>
                    <span className="vads-u-display--inline-block vads-u-margin-left--1">
                      <ApiTags
                        openData={api.openData}
                        vaInternalOnly={api.vaInternalOnly}
                      />
                    </span>
                  </>
                }
                value={apiCheckboxName}
                className="vads-u-padding-left--1p5"
              />
              {internalApiSelected && <InternalOnlyInfo />}
            </div>
          </Flag>
        );
      })}
    </>
  );
};

const oauthApis = getAllOauthApis();
const keyAuthApis = getAllKeyAuthApis();

interface SelectedApisProps {
  selectedApis: string[];
}

const SelectedAPIs = ({ selectedApis }: SelectedApisProps): JSX.Element => {
  const { errors, values } = useFormikContext<Values>();
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
        'vads-u-padding-right--2',
        'vads-l-col--12',
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
          className={classNames('vads-u-margin-top--2')}
          legend="Standard APIs:"
          legendClassName={classNames('vads-u-font-size--lg', 'vads-u-padding-left--1p5')}
          name="standardApis"
        >
          <ApiCheckboxList apiCheckboxes={keyAuthApis} checkedApis={values} />
        </FieldSet>
        <FieldSet
          className={classNames(
            'vads-u-margin-top--2',
            'vads-u-padding-bottom--1p5',
            oauthApisBorderClass,
            oauthApisBorderColorClass,
          )}
          legend="OAuth APIs:"
          legendClassName={classNames('vads-u-font-size--lg', 'vads-u-padding-left--1p5')}
          name="oauthApis"
        >
          <ApiCheckboxList apiCheckboxes={oauthApis} checkedApis={values} />
          {oauthApisSelected && <OAuthAppInfo />}
        </FieldSet>
      </div>
    </fieldset>
  );
};

export default SelectedAPIs;
