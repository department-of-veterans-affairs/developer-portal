import React, { FC, ReactNode, KeyboardEvent } from 'react';
import { FieldArray, useFormikContext } from 'formik';
import { Values } from '../ProductionAccess';
import { TextField } from '../../../components';

export interface ListOfTextEntriesProps {
  description: ReactNode;
  className?: string;
  type: 'email' | 'url';
  buttonText: string;
}

const ListOfTextEntries: FC<ListOfTextEntriesProps> = ({
  description,
  className,
  type,
  buttonText,
}) => {
  const { values } = useFormikContext<Values>();
  const name = type === 'email' ? 'notificationEmail' : 'termsOfServiceEmail';
  const data = type === 'email' ? values.notificationEmail : values.termsOfServiceEmail;
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
      <div className={className}>
        {description}
        <FieldArray name={name}>
          {({ insert, remove, push }) => (
            <div>
              {data.map((values, index) => (
                <div key={index}>
                  <TextField name={`${name}.${index}`} label="Email" onKeyDown={handleKeyDown} />
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
