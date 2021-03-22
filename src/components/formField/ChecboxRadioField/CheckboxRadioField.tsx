import classNames from 'classnames';
import { Field, useFormikContext } from 'formik';
import React, { FC, ReactNode } from 'react';
import toHtmlId from '../../../toHtmlId';

export interface CheckboxRadioFieldProps {
  className?: string;
  label: ReactNode;
  name: string;
  required?: boolean;
  type: 'checkbox' | 'radio';
  value?: string;
}

const CheckboxRadioField: FC<CheckboxRadioFieldProps> = ({ name, className, label, type, value, ...props }) => {
  const { errors, touched } = useFormikContext();
  const shouldDisplayErrors = !!errors[name] && !!touched[name];
  const containerClass = shouldDisplayErrors ? 'usa-input-error' : '';
  const labelClass = shouldDisplayErrors ? 'usa-input-error-label' : '';
  const radioClass = type === 'radio' ? 'vads-u-margin--0 vads-u-padding-y--1 vads-u-padding-x--1p5' : '';

  const idReadyName = toHtmlId(name);
  const fieldId = `${idReadyName}FormField${value ?? ''}`;

  return (
    <div className={classNames(containerClass, className)}>
      <Field
        id={fieldId}
        name={name}
        aria-invalid={shouldDisplayErrors}
        type={type}
        value={value}
        {...props}
      />
      <label htmlFor={fieldId} className={classNames(labelClass, radioClass)}>{label}</label>
    </div>
  );
};

export default CheckboxRadioField;
