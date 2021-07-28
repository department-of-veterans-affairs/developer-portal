import React, { FC, ReactNode, useState, KeyboardEvent, MouseEvent } from 'react';
import { FieldArray, useFormikContext, ErrorMessage } from 'formik';
import classNames from 'classnames';
import { Values } from '../ProductionAccess';
import { TextField } from '../../../components';
import './ListOfTextEntries.scss';

interface TextEntryProps {
  name: string;
  index: number;
  label?: string;
  value: string;
  onClick: (event: MouseEvent) => void;
}

export interface ListOfTextEntriesProps {
  description: ReactNode;
  className?: string;
  name: string;
  buttonText: string;
  label?: string;
}

const TextEntry = ({ name, index, label, value, onClick }: TextEntryProps): JSX.Element => {
  const [disabled, setDisabled] = useState(false);
  const { touched } = useFormikContext();

  const handleUpdatedDone = (event: KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === 'Enter' && value !== '') {
      setDisabled(true);
    }
  };
  return (
    <div className="vads-u-margin-y--2">
      <TextField
        name={`${name}.${index}`}
        label={label}
        onKeyDown={handleUpdatedDone}
        disabled={disabled}
        className={classNames(
          'vads-u-display--flex',
          'vads-u-flex-direction--row',
          'vads-u-flex-wrap--nowrap',
          'vads-u-align-items--center',
          'va-text-entry-field',
        )}
        customFieldClass={classNames('vads-u-margin-y--0', 'vads-u-padding--1')}
      >
        {disabled && (
          <button
            type="button"
            name="edit"
            onClick={(): void => setDisabled(false)}
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

        {!disabled && value !== '' && !touched[`${name}.${index}`] && (
          <button
            type="button"
            name="remove"
            onClick={onClick}
            className={classNames(
              'usa-button-secondary',
              'vads-u-margin-bottom--0',
              // 'vads-u-margin-left--neg5',
              'vads-u-margin-right--0',
              'vads-u-margin-top--0',
            )}
          >
            Remove
          </button>
        )}
      </TextField>
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
    <div className={classNames(containerClass, className)}>
      {description}
      <span
        id="api-checkbox-error"
        className={classNames(validationClass, errorMessagePaddingClass)}
        role="alert"
      >
        <ErrorMessage name={name} />
      </span>
      <FieldArray name={name}>
        {({ remove, push }): ReactNode => (
          <div className="vads-u-padding-y--1p5">
            {data.map((value, index) => (
              <div key={index}>
                <TextEntry
                  name={name}
                  index={index}
                  label={label}
                  value={value}
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
