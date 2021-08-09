import React, { FC, ReactNode, useState, MouseEvent } from 'react';
import { FieldArray, useFormikContext, ErrorMessage, Field, useField } from 'formik';
import classNames from 'classnames';
import { Values } from '../../ProductionAccess';
import { TextField } from '../../../../components';
import './ListOfTextEntries.scss';

interface TextEntryProps {
  name: string;
  index: number;
  label?: string;
  onClick: (event: MouseEvent) => void;
}

export interface ListOfTextEntriesProps {
  description: ReactNode;
  className?: string;
  name: string;
  buttonText: string;
  label?: string;
  innerRef?: React.RefObject<HTMLElement>;
}

const TextEntry = ({ name, index, label, onClick }: TextEntryProps): JSX.Element => {
  const [disabled, setDisabled] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [, , helpers] = useField(`${name}.${index}`);
  const containerClass = isEditing
    ? classNames(
        'vads-u-background-color--gray-cool-light',
        'va-text-entry-container',
        'vads-u-display--flex',
        'vads-u-padding--2',
        'vads-u-margin--4',
        'vads-u-flex-direction--column',
      )
    : classNames('');

  const fieldClass = isEditing
    ? classNames('va-text-entry-field', 'va-text-entry-field-edit')
    : classNames(
        'vads-u-display--flex',
        'vads-u-flex-direction--row',
        'vads-u-flex-wrap--nowrap',
        'vads-u-align-items--center',
        'va-text-entry-field',
        'medium-screen:vads-l-col--10',
        'vads-u-margin--2',
      );

  return (
    <div className={containerClass}>
      <Field
        as={TextField}
        name={`${name}.${index}`}
        label={label}
        onBlur={(): void => {
          helpers.setTouched(true);
          setDisabled(true);
          setIsEditing(false);
        }}
        disabled={disabled}
        className={fieldClass}
        customFieldClass={classNames('vads-u-margin-right--0')}
      >
        {disabled && (
          <button
            type="button"
            name="edit"
            onClick={(): void => {
              setDisabled(false);
              setIsEditing(true);
            }}
            className={classNames(
              'usa-button-secondary',
              'vads-u-margin-bottom--0',
              'vads-u-margin-left--neg9',
              'vads-u-margin-right--0',
              'vads-u-margin-top--0',
            )}
          >
            Edit
          </button>
        )}
      </Field>
      {isEditing && (
        <button
          type="button"
          name="remove"
          onClick={onClick}
          className={classNames('usa-button-secondary')}
        >
          Remove
        </button>
      )}
    </div>
  );
};

const ListOfTextEntries: FC<ListOfTextEntriesProps> = ({
  description,
  className,
  name,
  buttonText,
  label,
}) => {
  const { values, errors } = useFormikContext<Values>();
  const data = values[name] as string[];
  const shouldDisplayErrors = !!errors[name];
  const containerClass = shouldDisplayErrors ? 'usa-input-error' : '';
  const validationClass = shouldDisplayErrors ? 'usa-input-error-message' : '';
  const errorMessagePaddingClass = shouldDisplayErrors ? 'vads-u-padding-x--1p5' : '';
  return (
    <div
      className={classNames(containerClass, 'vads-u-background-color--gray-lightest', className)}
    >
      {description}
      <span className={classNames(validationClass, errorMessagePaddingClass)} role="alert">
        <ErrorMessage name={name} />
      </span>
      <FieldArray name={name}>
        {({ remove, push }): ReactNode => (
          <div className="vads-u-padding-y--1p5">
            {data.map((value, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <div key={index}>
                <TextEntry
                  name={name}
                  index={index}
                  label={label}
                  onClick={(): void => remove(index)}
                />
              </div>
            ))}
            <div className="vads-u-margin-top--2">
              {data[data.length - 1] === '' && data.length > 1 ? (
                <button
                  className={classNames('usa-button-secondary', 'vads-u-background-color--white')}
                  type="button"
                  onClick={(): void => remove(data.length - 1)}
                >
                  Remove
                </button>
              ) : (
                <button
                  className={classNames('usa-button-secondary', 'vads-u-background-color--white')}
                  type="button"
                  onClick={(): void => push('')}
                >
                  {buttonText}
                </button>
              )}
            </div>
          </div>
        )}
      </FieldArray>
    </div>
  );
};

export default ListOfTextEntries;
