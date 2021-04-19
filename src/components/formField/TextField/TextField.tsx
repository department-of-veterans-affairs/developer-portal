import classNames from 'classnames';
import { Field, ErrorMessage, useFormikContext } from 'formik';
import React, { ComponentPropsWithRef, FC, ReactNode } from 'react';
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
}

const TextField: FC<TextFieldProps> = ({ description, className, label, name, required = false, type = 'text', ...props }) => {
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
        {label}{required && <span className="form-required-span">(*Required)</span>}
      </label>
      {
        description &&
        <div id={descriptionId}>
          {description}
        </div>
      }
      <span id={errorId} className={validationClass}>
        <ErrorMessage name={name} />
      </span>

      <Field
        id={fieldId}
        className={fieldClass}
        name={name}
        required={required}
        aria-describedby={`${errorId} ${descriptionId}`}
        aria-invalid={shouldDisplayErrors}
        type={props.as ? undefined : type}
        {...props}
      />
    </div>
  );
};

export default TextField;
