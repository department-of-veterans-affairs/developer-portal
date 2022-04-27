/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { ComponentPropsWithRef, FC, ReactNode, KeyboardEvent } from 'react';

import classNames from 'classnames';
import { Field, useFormikContext, getIn, FieldArray } from 'formik';

import toHtmlId from '../../../toHtmlId';

import { EditInputField } from './EditInputField';

import './MultiEntryTextField.scss';

type FieldProps = ComponentPropsWithRef<typeof Field>;

export interface MultiEntryTextFieldProps {
  className?: string;
  label: ReactNode;
  name: string;
  required?: boolean;
  as?: FieldProps['as'];
  description?: ReactNode;
  type?: 'text' | 'email';
  disabled?: boolean;
  onKeyDown?: (event: KeyboardEvent) => void;
  innerRef?: React.RefObject<HTMLElement>;
  customFieldClass?: string;
  children?: ReactNode;
}

const MultiEntryTextField: FC<MultiEntryTextFieldProps> = ({
  description,
  className,
  label,
  name,
  required = false,
  type = 'text',
  ...props
}) => {
  const { errors, touched, values } = useFormikContext<any>();
  const shouldDisplayErrors =
    (!!errors[name] && !!touched[name]) || (!!getIn(errors, name) && !!getIn(touched, name));
  const labelClass = shouldDisplayErrors ? 'usa-input-error-label' : '';

  const idReadyName = toHtmlId(name);
  const descriptionId = description ? `${idReadyName}FormFieldDescription` : '';

  const emails: string[] = values[name];

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
        render={arrayHelpers => {
          const handleAddInput = () => {
            arrayHelpers.push('');
          };

          const handleRemoveInput = (index: number) => {
            arrayHelpers.remove(index);
          };

          return (
            <>
              <div style={{ maxWidth: '46rem' }}>
                {emails.map((_, index: number) => (
                  <EditInputField
                    index={index}
                    // eslint-disable-next-line react/no-array-index-key
                    key={index}
                    onRemove={handleRemoveInput}
                    name={`${name}.${index}`}
                    type={type}
                    placeHolder="notificationlist@email.com"
                    required={required}
                    descriptionId={descriptionId}
                    isOnlyInput={emails.length === 1}
                    {...props}
                  />
                ))}
              </div>
              <button
                className="usa-button usa-button-secondary vads-u-background-color--white vads-u-margin-top--3"
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

export default MultiEntryTextField;
