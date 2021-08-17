import classNames from 'classnames';
import * as React from 'react';
import { ErrorMessage, useFormikContext } from 'formik';
import { ApiCheckboxList } from '../../../../components';
import { getAllApis } from '../../../../apiDefs/query';

const allApis = getAllApis();

const SelectedAPIs = (): JSX.Element => {
  const { errors } = useFormikContext();
  const checkboxName = 'apis';
  const shouldDisplayErrors = !!errors[checkboxName];
  const containerClass = classNames({
    'usa-input-error': shouldDisplayErrors,
  });

  const labelClass = classNames({
    'usa-input-error-label': shouldDisplayErrors,
  });

  const validationClass = classNames({
    'usa-input-error-message': shouldDisplayErrors,
  });

  const errorMessagePaddingClass = classNames({
    'vads-u-padding-x--1p5': shouldDisplayErrors,
  });

  const selectAPIClass = classNames({
    'vads-u-font-weight--bold': shouldDisplayErrors,
    'vads-u-font-weight--normal': !shouldDisplayErrors,
  });

  return (
    <fieldset
      aria-labelledby="select-checkbox-api"
      className={classNames(
        containerClass,
        'apply-api-select',
        'vads-u-background-color--gray-lightest',
        'vads-u-margin-top--2p5',
        'vads-u-padding-x--1p5',
      )}
    >
      <div className="vads-u-margin-top--1 apply-checkbox-labels">
        <legend
          id="select-checkbox-api"
          className={classNames(selectAPIClass, labelClass, 'vads-u-font-size--base')}
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
        <ApiCheckboxList apis={allApis} />
      </div>
    </fieldset>
  );
};

export { SelectedAPIs };
