import classNames from 'classnames';
import { ErrorMessage, useFormikContext } from 'formik';
import React, { FC, ReactNode } from 'react';
import toHtmlId from '../../../toHtmlId';

export interface FieldSetProps {
  className?: string;
  legend: ReactNode;
  legendClassName?: string;
  errorClassName?: string;
  name: string;
  required?: boolean;
  children: ReactNode;
  description?: string;
}

const FieldSet: FC<FieldSetProps> = ({
  className,
  legend,
  legendClassName,
  name,
  required = false,
  children,
  description,
}) => {
  const { errors } = useFormikContext();
  const shouldDisplayErrors = !!errors[name];
  const legendClass = shouldDisplayErrors ? 'usa-input-error-label' : legendClassName;
  const errorMessageClass = shouldDisplayErrors ? 'usa-input-error-message' : '';

  const idReadyName = toHtmlId(name);
  const errorId = `${idReadyName}FormFieldError`;
  const legendId = `${idReadyName}Legend`;

  return (
    <div
      className={classNames({
        'usa-input-error': shouldDisplayErrors,
      }, className)}
    >
      <fieldset aria-labelledby={legendId}>
        <legend id={legendId} className={classNames('vads-u-margin-top--0', legendClass)}>
          {legend}
          {required && <span className="form-required-span">(*Required)</span>}
        </legend>
        {description && (
          <p className="vads-u-color--gray vads-u-font-size--sm">
            {description}
          </p>
        )}
        <span id={errorId} className={errorMessageClass} role="alert">
          <ErrorMessage name={name} />
        </span>
        {children}
      </fieldset>
    </div>
  );
};

export default FieldSet;
