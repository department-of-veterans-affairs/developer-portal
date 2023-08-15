import classNames from 'classnames';
import * as React from 'react';
import { ErrorMessage, useFormikContext } from 'formik';
import { ApiCheckboxList, FieldSet } from '../../../../components';
import {
  getAllAuthCodeApis,
  getAllKeyAuthApis,
  getAllCCGApis,
  includesAuthCodeAPI,
  includesCcgAPI,
} from '../../../../apiDefs/query';
import ApisLoader from '../../../../components/apisLoader/ApisLoader';
import { OAuthAcgAppInfo } from './OAuthAcgAppInfo';
import { OAuthCcgAppInfo } from './OAuthCcgAppInfo';

interface SelectedApisProps {
  selectedApis: string[];
}

const SelectedAPIs = ({ selectedApis }: SelectedApisProps): JSX.Element => {
  const { errors } = useFormikContext();
  const checkboxName = 'apis';
  const shouldDisplayErrors = !!errors[checkboxName];
  const containerClass = classNames({
    'usa-input-error': shouldDisplayErrors,
  });

  const labelClass = classNames({
    'usa-input-error-label': shouldDisplayErrors,
  });

  const selectAPIClass = classNames({
    'vads-u-font-weight--bold': shouldDisplayErrors,
    'vads-u-font-weight--normal': !shouldDisplayErrors,
  });

  const authCodeApiSelected = includesAuthCodeAPI(selectedApis);
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
      className={classNames(containerClass, 'vads-u-margin-top--2p5')}
    >
      <div className="vads-u-margin-top--2 apply-checkbox-labels">
        <legend
          id="select-checkbox-api"
          className={classNames(
            selectAPIClass,
            labelClass,
            'vads-u-font-size--base',
            'vads-u-margin-bottom--1p5',
            'vads-u-padding-right--1p5',
          )}
        >
          Select the APIs for which you are requesting production access.{' '}
          <span className="vads-u-color--secondary-dark">&#40;*Required&#41;</span>
        </legend>
        <div
          id="api-checkbox-error"
          className={classNames('vads-u-margin-bottom--1p5', 'vads-u-padding-x--1p5', {
            'usa-input-error-message': shouldDisplayErrors,
          })}
          role="alert"
        >
          <ErrorMessage name="apis" />
        </div>
        <ApisLoader>
          <>
            <FieldSet
              className={classNames('vads-u-margin-top--2')}
              legend="Standard APIs:"
              legendClassName={classNames('vads-u-font-size--lg')}
              name="standardApis"
            >
              <ApiCheckboxList apis={getAllKeyAuthApis()} authType="apikey" />
            </FieldSet>
            <FieldSet
              className={classNames(
                'vads-u-margin-top--2',
                'vads-u-padding-bottom--1p5',
                authCodeApisBorderClass,
                authCodeApisBorderColorClass,
              )}
              legend="Authorization Code Grant APIs:"
              legendClassName={classNames('vads-u-font-size--lg')}
              name="oauthApis"
            >
              <ApiCheckboxList apis={getAllAuthCodeApis()} authType="acg" />
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
              legendClassName={classNames('vads-u-font-size--lg')}
              name="ccgApis"
            >
              <ApiCheckboxList apis={getAllCCGApis()} authType="ccg" />
              {ccgApiSelected && <OAuthCcgAppInfo />}
            </FieldSet>
          </>
        </ApisLoader>
      </div>
    </fieldset>
  );
};

export { SelectedAPIs };
