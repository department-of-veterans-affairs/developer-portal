import React, { FC, ReactNode } from 'react';

import classNames from 'classnames';
import { useFormikContext, getIn, FieldArray } from 'formik';

import toHtmlId from '../../../toHtmlId';

import { EditInputField } from './EditInputField';

import './MultiEntryTextField.scss';

export interface MultiEntryEmailFieldProps {
  className?: string;
  description?: ReactNode;
  label: ReactNode;
  name: string;
  placeholder: string;
  required?: boolean;
  emails: string[];
}

// Initially renders with one input that's enabled and isn't focused
// When the add button is clicked a new input is rendered below the other inputs
// When a new input is added all other inputs in the group are disabled and focus is set to the new input
// Each input is validated individually
const MultiEntryEmailField: FC<MultiEntryEmailFieldProps> = ({
  className,
  description,
  label,
  name,
  placeholder = '',
  required = false,
  emails,
}) => {
  const { errors, touched } = useFormikContext<unknown>();
  const shouldDisplayErrors =
    (!!errors[name] && !!touched[name]) || (!!getIn(errors, name) && !!getIn(touched, name));
  const labelClass = shouldDisplayErrors ? 'usa-input-error-label' : '';

  const idReadyName = toHtmlId(name);
  const descriptionId = description ? `${idReadyName}FormFieldDescription` : '';

  return (
    <div
      className={classNames(
        'va-api-text-field vads-u-background-color--gray-lightest vads-u-padding--2',
        className,
      )}
    >
      <label className={classNames('vads-u-margin-top--0', labelClass)}>
        {label}
        {required && <span className="form-required-span">(*Required)</span>}
      </label>

      <div id={descriptionId} className={classNames('vads-u-color--gray', 'vads-u-margin-top--2')}>
        {description}
      </div>

      <FieldArray
        name={name}
        render={(arrayHelpers): ReactNode => {
          const handleAddInput = (): void => {
            arrayHelpers.push('');
          };

          const handleRemoveInput = (index: number): void => {
            arrayHelpers.remove(index);
          };

          return (
            <>
              <div style={{ maxWidth: '46rem' }}>
                {emails.map((_, index: number) => (
                  <EditInputField
                    // eslint-disable-next-line react/no-array-index-key
                    key={index}
                    onRemove={(): void => handleRemoveInput(index)}
                    name={`${name}.${index}`}
                    type="email"
                    placeHolder={placeholder}
                    required={required}
                    descriptionId={descriptionId}
                    isOnlyInput={emails.length === 1}
                  />
                ))}
              </div>

              <button
                className="usa-button usa-button-secondary vads-u-background-color--white vads-u-margin-top--3 vads-u-width--auto"
                type="button"
                onClick={handleAddInput}
              >
                Add another email
              </button>
            </>
          );
        }}
      />
    </div>
  );
};

export default MultiEntryEmailField;
