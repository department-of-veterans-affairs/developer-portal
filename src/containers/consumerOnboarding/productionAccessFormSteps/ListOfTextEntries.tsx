import React, { FC, ReactNode } from 'react';
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
  return (
    <>
      <div className={className}>
        {description}
        <FieldArray name={name}>
          {({ insert, remove, push }) =>
            data.map((values, index) => (
              <div key={index}>
                <TextField name={`${name}.${index}`} label="Email" />
                <button type="button" onClick={() => push('')}>
                  {buttonText}
                </button>
              </div>
            ))
          }
        </FieldArray>
      </div>
    </>
  );
};

export default ListOfTextEntries;
