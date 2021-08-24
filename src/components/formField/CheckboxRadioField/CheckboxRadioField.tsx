import { Field, getIn, useFormikContext } from 'formik';
import React, { FC, ReactNode } from 'react';
import toHtmlId from '../../../toHtmlId';

export interface CheckboxRadioFieldProps {
  className?: string;
  label: ReactNode;
  name: string;
  required?: boolean;
  type: 'checkbox' | 'radio';
  value?: string;
  innerRef?: React.RefObject<HTMLElement>;
}

const CheckboxRadioField: FC<CheckboxRadioFieldProps> = ({
  name,
  className,
  label,
  type,
  innerRef,
  value,
  ...props
}) => {
  const { errors, touched } = useFormikContext();
  const radioClass =
    type === 'radio' ? 'vads-u-margin--0 vads-u-padding-y--1 vads-u-padding-x--1p5' : '';

  const idReadyName = toHtmlId(name);
  const idReadyValue = toHtmlId(value ?? '');
  const fieldId = `${idReadyName}FormField${idReadyValue}`;
  const shouldDisplayErrors = !!getIn(errors, name) && !!getIn(touched, name);

  return (
    <div className={className}>
      <Field
        id={fieldId}
        name={name}
        type={type}
        value={value}
        innerRef={innerRef}
        aria-invalid={shouldDisplayErrors}
        {...props}
      />
      <label htmlFor={fieldId} className={radioClass}>
        {label}
      </label>
    </div>
  );
};

export default CheckboxRadioField;
