import classNames from 'classnames';
import { ErrorMessage, Field, useFormikContext } from 'formik';
import React, { ComponentPropsWithoutRef, FC, ReactNode } from 'react';

type FieldProps = ComponentPropsWithoutRef<typeof Field>;

interface FormFieldProps {
  label: string;
  name: string;
  required?: boolean;
  type?: FieldProps['type'];
  as?: FieldProps['as'];
  description?: ReactNode;
  className?: string;
}

export const FormField: FC<FormFieldProps> = ({ label, required = false, name, description, className, ...props }) => {
  const { errors, touched } = useFormikContext();

  const shouldDisplayErrors = !!errors[name] && !!touched[name];
  const containerClass = shouldDisplayErrors ? 'usa-input-error' : '';
  const labelClass = shouldDisplayErrors ? 'usa-input-error-label' : '';
  const validationClass = shouldDisplayErrors ? 'usa-input-error-message' : '';

  const descriptionId = `formField${name}Description`;
  const errorId = `formField${name}Error`;

  return (
    <div className={classNames(containerClass, className)}>
      <label htmlFor={`formField${name}`} className={labelClass}>
        {label}{required && <span className="form-required-span">(*Required)</span>}
      </label>
      {
        description &&
          <div id={descriptionId}>
            {description}
          </div>
      }
      <span id={`formField${name}Error`} className={validationClass}>
        <ErrorMessage name={name} />
      </span>
      <Field id={`formField${name}`} name={name} required={required} {...props} aria-describedby={`${errorId} ${descriptionId}`} />
    </div>
  );
};
