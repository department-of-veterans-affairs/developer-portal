import classNames from 'classnames';
import { Field, ErrorMessage, useFormikContext } from 'formik';
import React, { ComponentPropsWithRef, FC, ReactNode, KeyboardEvent } from 'react';
import toHtmlId from '../../../toHtmlId';

type FieldProps = ComponentPropsWithRef<typeof Field>;

export interface TextFieldProps {
  className?: string;
  label: ReactNode;
  name: string;
  required?: boolean;
  as?: FieldProps['as'];
  description?: ReactNode;
  type?: 'text' | 'email' | 'password';
  disabled?: boolean;
  onKeyDown?: (event: KeyboardEvent) => void;
  ref?: React.RefObject<React.FC>;
  customFieldClass?: string;
  children?: ReactNode;
}

const TextField: FC<TextFieldProps> = ({
  description,
  className,
  label,
  name,
  required = false,
  type = 'text',
  disabled = false,
  onKeyDown,
  customFieldClass,
  children,
  ...props
}) => {
  const { errors, touched } = useFormikContext();
  const shouldDisplayErrors = !!errors[name] && !!touched[name];
  const containerClass = shouldDisplayErrors ? 'usa-input-error' : '';
  const labelClass = shouldDisplayErrors ? 'usa-input-error-label' : '';
  const validationClass = shouldDisplayErrors ? 'usa-input-error-message' : '';
  const fieldClass = props.as === 'textarea' ? classNames('vads-u-margin-top--2p5') : '';

  const idReadyName = toHtmlId(name);
  const descriptionId = description ? `${idReadyName}FormFieldDescription` : '';
  const errorId = `${idReadyName}FormFieldError`;
  const fieldId = `${idReadyName}FormField`;

  return (
    <div className={classNames(containerClass, className)}>
      <label htmlFor={fieldId} className={classNames('vads-u-margin-top--0', labelClass)}>
        {label}
        {required && <span className="form-required-span">(*Required)</span>}
      </label>
      {description && <div id={descriptionId}>{description}</div>}
      <span id={errorId} className={validationClass} role="alert">
        <ErrorMessage name={name} />
      </span>

      <Field
        id={fieldId}
        className={classNames(fieldClass, customFieldClass)}
        name={name}
        required={required}
        aria-describedby={`${errorId} ${descriptionId}`}
        aria-invalid={shouldDisplayErrors}
        type={props.as ? undefined : type}
        disabled={disabled}
        onKeyDown={onKeyDown}
        {...props}
      />
      {children}
    </div>
  );
};

export default TextField;
