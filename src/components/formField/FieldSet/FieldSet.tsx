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
  ariaLabel?: string;
  children: ReactNode;
}

const FieldSet: FC<FieldSetProps> = ({
  className,
  legend,
  legendClassName,
  errorClassName,
  name,
  ariaLabel,
  required = false,
  children,
}) => {
  const { errors, touched } = useFormikContext();
  const shouldDisplayErrors = !!errors[name] && !!touched[name];
  const containerClass = shouldDisplayErrors ? classNames('usa-input-error', errorClassName) : '';
  const legendClass = shouldDisplayErrors ? 'usa-input-error-label' : legendClassName;
  const errorMessageClass = shouldDisplayErrors ? 'usa-input-error-message' : '';

  const errorId = `${toHtmlId(name)}FormFieldError`;

  return (
    <div className={classNames(containerClass, className)}>
      <fieldset aria-label={ariaLabel}>
        <legend className={classNames('vads-u-margin-top--0', legendClass)}>
          {legend}
          {required && <span className="form-required-span">(*Required)</span>}
        </legend>
        <span id={errorId} className={errorMessageClass}>
          <ErrorMessage name={name} />
        </span>
        {children}
      </fieldset>
    </div>
  );
};

export default FieldSet;
