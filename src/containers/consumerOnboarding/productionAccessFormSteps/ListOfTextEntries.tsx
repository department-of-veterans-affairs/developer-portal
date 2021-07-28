import React, { FC, ReactNode, useState, KeyboardEvent } from 'react';
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
}

export interface ListOfTextEntriesProps {
  description: ReactNode;
  className?: string;
  name: string;
  buttonText: string;
  label?: string;
}

const TextEntry = ({ name, index, label, value }: TextEntryProps): JSX.Element => {
  // const [editing, setEditing] = useState(false);
  const [disabled, setDisabled] = useState(false);
  // let viewMode = {};
  // let editMode = {};

  // if (editing) {
  //   viewMode.display = 'none';
  // } else {
  //   editMode.display = 'none';
  // }
  // useEffect(() => {
  //   return () => {
  //     console.log('Cleaning up...');
  //   };
  // }, []);

  // const handleEditing = () => {
  //   setEditing(true);
  // };
  const handleUpdatedDone = (event: KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === 'Enter' && value !== '') {
      setDisabled(true);
    }
  };
  return (
    <TextField
      name={`${name}.${index}`}
      label={label}
      onKeyDown={handleUpdatedDone}
      required
      disabled={disabled}
      className={classNames(
        'vads-u-display--flex',
        'vads-u-flex-direction--row',
        'vads-u-flex-wrap--nowrap',
        'vads-u-align-items--center',
        'va-text-entry-field',
      )}
      customFieldClass={classNames(
        'va-api-search-autocomplete',
        'vads-u-margin-y--0',
        'vads-u-padding--1',
      )}
    >
      {disabled && (
        <button
          type="button"
          name="edit"
          onClick={() => setDisabled(false)}
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
    </TextField>
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
  // const labelClass = shouldDisplayErrors ? 'usa-input-error-label' : '';
  const validationClass = shouldDisplayErrors ? 'usa-input-error-message' : '';
  const errorMessagePaddingClass = shouldDisplayErrors ? 'vads-u-padding-x--1p5' : '';
  // const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>): void => {
  //   if (event.key === 'Enter') {
  //     if ((event.target as HTMLInputElement).value === '') {
  //       return;
  //     }
  //     (event.target as HTMLInputElement).blur();
  //     (event.target as HTMLInputElement).disabled = true;
  //   }
  // };
  // const [disabled, setDisabled] = useState(false);
  // const handleOnBlur = () => {
  //   setDisabled(!disabled);
  // };
  return (
    <>
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
          {({ insert, remove, push }) => (
            <div>
              {data?.map((value, index) => (
                <div key={index}>
                  <TextEntry name={name} index={index} label={label} value={value} />
                </div>
              ))}
              {data[data.length - 1] === '' ? (
                <button type="button">Remove</button>
              ) : (
                <button type="button" onClick={() => push('')}>
                  {buttonText}
                </button>
              )}
            </div>
          )}
        </FieldArray>
      </div>
    </>
  );
};

export default ListOfTextEntries;
