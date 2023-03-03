/* eslint-disable no-console */
import classNames from 'classnames';
import * as React from 'react';
import { ErrorMessage, useFormikContext } from 'formik';
import { CheckboxRadioField, FieldSet, ApiTags } from '../../../../components';
import {
  getAllKeyAuthApis,
  getAllAuthCodeApis,
  includesAuthCodeAPI,
  includesCcgAPI,
  getAllCCGApis,
} from '../../../../apiDefs/query';
import { APIDescription, VaInternalOnly } from '../../../../apiDefs/schema';
import { Flag } from '../../../../flags';
import { FLAG_HOSTED_APIS } from '../../../../types/constants';
import { isHostedApiEnabled } from '../../../../apiDefs/env';
import ApisLoader from '../../../../components/apisLoader/ApisLoader';
import { OAuthAcgAppInfo } from './OAuthAcgAppInfo';
import { OAuthCcgAppInfo } from './OAuthCcgAppInfo';
import { InternalOnlyInfo } from './InternalOnlyInfo';
import { Values } from './SandboxAccessForm';
import './SelectedApis.scss';

interface APICheckboxListProps {
  apiCheckboxes: APIDescription[];
  authType: 'acg' | 'apikey' | 'ccg';
}

const ApiCheckboxList = ({ apiCheckboxes, authType }: APICheckboxListProps): JSX.Element => {
  const formValues = useFormikContext<Values>().values;

  return (
    <>
      {apiCheckboxes
        .filter(
          api =>
            (!api.vaInternalOnly || api.vaInternalOnly !== VaInternalOnly.StrictlyInternal) &&
            isHostedApiEnabled(api.urlFragment, api.enabledByDefault),
        )
        .map(api => {
          const apiCheckboxName = api.altID ?? api.urlFragment;
          const internalApiSelected =
            formValues.apis.includes(`${authType}/${apiCheckboxName}`) &&
            api.vaInternalOnly &&
            api.vaInternalOnly === VaInternalOnly.AdditionalDetails;
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
                        <ApiTags openData={api.openData} vaInternalOnly={api.vaInternalOnly} />
                      </span>
                    </>
                  }
                  value={`${authType}/${apiCheckboxName}`}
                  className="vads-u-padding-left--1p5"
                />
                {/* Request model will need an update to support multiple internal only APIs
              with separate VA info when we add the next internal only api */}
                {internalApiSelected && <InternalOnlyInfo />}
              </div>
            </Flag>
          );
        })}
    </>
  );
};

interface SelectedApisProps {
  selectedApis: string[];
}

// eslint-disable-next-line complexity
const SelectedAPIs = ({ selectedApis }: SelectedApisProps): JSX.Element => {
  const { errors } = useFormikContext<Values>();
  const checkboxName = 'apis';
  const shouldDisplayErrors = !!errors[checkboxName];
  const containerClass = shouldDisplayErrors ? 'usa-input-error' : '';
  const labelClass = shouldDisplayErrors ? 'usa-input-error-label' : '';
  const validationClass = shouldDisplayErrors ? 'usa-input-error-message' : '';
  const errorMessagePaddingClass = shouldDisplayErrors ? 'vads-u-padding-x--1p5' : '';
  const selectAPIClass = shouldDisplayErrors
    ? 'vads-u-font-weight--bold'
    : 'vads-u-font-weight--normal';

  // console.log(selectedApis);
  const authCodeApiSelected = includesAuthCodeAPI(selectedApis);
  // console.log(authCodeApiSelected);
  const authCodeApisBorderClass = authCodeApiSelected ? 'vads-u-border-left--4px' : '';
  const authCodeApisBorderColorClass = authCodeApiSelected
    ? 'vads-u-border-color--primary-alt-light'
    : '';

  const ccgApiSelected = includesCcgAPI(selectedApis);
  const ccgApisBorderClass = ccgApiSelected ? 'vads-u-border-left--4px' : '';
  const ccgApisBorderColorClass = ccgApiSelected ? 'vads-u-border-color--primary-alt-light' : '';

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
          <ApisLoader>
            <ApiCheckboxList apiCheckboxes={getAllKeyAuthApis()} authType="apikey" />
          </ApisLoader>
        </FieldSet>
        <FieldSet
          className={classNames(
            'vads-u-margin-top--2',
            'vads-u-padding-bottom--1p5',
            authCodeApisBorderClass,
            authCodeApisBorderColorClass,
          )}
          legend="Authorization Code Flow APIs:"
          legendClassName={classNames('vads-u-font-size--lg', 'vads-u-padding-left--1p5')}
          name="oauthApis"
        >
          <ApiCheckboxList apiCheckboxes={getAllAuthCodeApis()} authType="acg" />
          {authCodeApiSelected && <OAuthAcgAppInfo />}
        </FieldSet>
        <FieldSet
          className={classNames(
            'vads-u-margin-top--2',
            'vads-u-padding-bottom--1p5',
            ccgApisBorderClass,
            ccgApisBorderColorClass,
          )}
          legend="Client Credentials Grant APIs:"
          legendClassName={classNames('vads-u-font-size--lg', 'vads-u-padding-left--1p5')}
          name="ccgApis"
        >
          <ApiCheckboxList apiCheckboxes={getAllCCGApis()} authType="ccg" />
          {ccgApiSelected && <OAuthCcgAppInfo />}
        </FieldSet>
      </div>
    </fieldset>
  );
};

export default SelectedAPIs;
