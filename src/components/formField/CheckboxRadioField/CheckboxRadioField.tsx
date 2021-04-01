import { Field } from 'formik';
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
  const radioClass = type === 'radio' ? 'vads-u-margin--0 vads-u-padding-y--1 vads-u-padding-x--1p5' : '';

  const idReadyName = toHtmlId(name);
  const idReadyValue = toHtmlId(value ?? '');
  const fieldId = `${idReadyName}FormField${idReadyValue}`;

  return (
    <div className={className}>
      <Field
        id={fieldId}
        name={name}
        type={type}
        value={value}
        {...props}
      />
      <label htmlFor={fieldId} className={radioClass}>{label}</label>
    </div>
  );
};

export default CheckboxRadioField;
