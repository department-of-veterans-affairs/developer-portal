import classNames from 'classnames';
import { Field, ErrorMessage, useFormikContext, getIn } from 'formik';
import React, { FC, ReactNode, KeyboardEvent } from 'react';
import toHtmlId from '../../../toHtmlId';

export interface SelectFieldProps {
  className?: string;
  label: ReactNode;
  secondLabel?: string;
  name: string;
  required?: boolean;
  description?: ReactNode;
  placeholder?: string;
  disabled?: boolean;
  onKeyDown?: (event: KeyboardEvent) => void;
  innerRef?: React.RefObject<HTMLElement>;
  customFieldClass?: string;
  children?: ReactNode;
}

const SelectField: FC<SelectFieldProps> = ({
  description,
  className,
  label,
  secondLabel,
  name,
  required = false,
  placeholder,
  disabled = false,
  onKeyDown,
  customFieldClass,
  children,
  innerRef,
  ...props
}) => {
  const { errors, touched } = useFormikContext();
  const shouldDisplayErrors =
    (!!errors[name] && !!touched[name]) || (!!getIn(errors, name) && !!getIn(touched, name));
  const containerClass = shouldDisplayErrors ? 'usa-input-error' : '';
  const labelClass = shouldDisplayErrors ? 'usa-input-error-label' : '';
  const validationClass = shouldDisplayErrors ? 'usa-input-error-message' : '';
  const fieldClass = 'vads-u-margin-top--1';

  const idReadyName = toHtmlId(name);
  const descriptionId = description ? `${idReadyName}FormFieldDescription` : '';
  const errorId = `${idReadyName}FormFieldError`;
  const fieldId = `${idReadyName}FormField`;

  return (
    <div className={classNames('va-api-text-field', containerClass, className)}>
      <label htmlFor={fieldId} className={classNames('vads-u-margin-top--0', labelClass)}>
        {label}
        {secondLabel && <p className="second-label">{secondLabel}</p>}
        {required && (
          <span
            className={classNames('form-required-span', {
              'second-label-required-span': secondLabel,
            })}
          >
            (*Required)
          </span>
        )}
      </label>
      {description && (
        <div
          id={descriptionId}
          className={classNames('vads-u-color--gray', 'vads-u-margin-top--2')}
        >
          {description}
        </div>
      )}
      <span id={errorId} className={validationClass} role="alert">
        <ErrorMessage name={name} />
      </span>

      <Field
        component="select"
        id={fieldId}
        className={classNames(fieldClass, customFieldClass)}
        name={name}
        required={required}
        aria-describedby={`${errorId} ${descriptionId}`}
        aria-invalid={shouldDisplayErrors}
        placeholder={placeholder}
        disabled={disabled}
        onKeyDown={onKeyDown}
        innerRef={innerRef}
        {...props}
      >
        {children}
      </Field>
    </div>
  );
};

export default SelectField;
