import React, { FC, ReactNode, KeyboardEvent } from 'react';
import { FieldArray, useFormikContext, ErrorMessage } from 'formik';
import classNames from 'classnames';
import { Values } from '../ProductionAccess';
import { TextField } from '../../../components';

export interface ListOfTextEntriesProps {
  description: ReactNode;
  className?: string;
  name: string;
  buttonText: string;
  label?: string;
}

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
  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === 'Enter') {
      if ((event.target as HTMLInputElement).value === '') {
        return;
      }
      (event.target as HTMLInputElement).blur();
      (event.target as HTMLInputElement).disabled = true;
    }
  };
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
              {data?.map((values, index) => (
                <div key={index}>
                  <TextField
                    name={`${name}.${index}`}
                    label={label}
                    onKeyDown={handleKeyDown}
                    required
                  />
                </div>
              ))}
              <button type="button" onClick={() => push('')}>
                {buttonText}
              </button>
            </div>
          )}
        </FieldArray>
      </div>
    </>
  );
};

export default ListOfTextEntries;
