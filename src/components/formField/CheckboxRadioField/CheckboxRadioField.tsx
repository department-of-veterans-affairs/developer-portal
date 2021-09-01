import classNames from 'classnames';
import { Field, getIn, useFormikContext, ErrorMessage } from 'formik';
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
  showError?: boolean;
}

const CheckboxRadioField: FC<CheckboxRadioFieldProps> = ({
  name,
  className,
  label,
  type,
  innerRef,
  value,
  showError = false,
  ...props
}) => {
  const { errors, touched } = useFormikContext();
  const radioClass =
    type === 'radio' ? 'vads-u-margin--0 vads-u-padding-y--1 vads-u-padding-x--1p5' : '';

  const idReadyName = toHtmlId(name);
  const idReadyValue = toHtmlId(value ?? '');
  const applyErrorStyles = showError && !!getIn(errors, name) && !!getIn(touched, name);
  const errorId = `${idReadyName}FormFieldError`;
  const fieldId = `${idReadyName}FormField${idReadyValue}`;

  return (
    <div
      className={classNames({
        'usa-input-error': applyErrorStyles,
      }, className)}
    >
      <Field
        id={fieldId}
        name={name}
        type={type}
        value={value}
        innerRef={innerRef}
        aria-invalid={applyErrorStyles}
        {...props}
      />
      <label htmlFor={fieldId} className={radioClass}>
        {label}
      </label>
      {showError && (
        <span
          id={errorId}
          className={classNames({ 'usa-input-error-message': applyErrorStyles })}
          role="alert"
        >
          <ErrorMessage name={name} />
        </span>
      )}
    </div>
  );
};

export default CheckboxRadioField;
