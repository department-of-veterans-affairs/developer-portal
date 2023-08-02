import React, { useState, useEffect, useRef } from 'react';

import { ErrorMessage, Field, useFormikContext, getIn } from 'formik';
import classNames from 'classnames';

import { useOutsideGroupClick, useEffectOnce } from '../../../hooks';

import toHtmlId from '../../../toHtmlId';

export interface EditInputFieldProps {
  placeHolder: string;
  onRemove: () => void;
  type?: 'text' | 'email';
  name: string;
  required: boolean;
  descriptionId: string;
  isOnlyInput: boolean;
}

// Initial render input is not disabled, there is no edit button
// If the input is focused, then the edit button is displayed
export const EditInputField: React.FC<EditInputFieldProps> = ({
  onRemove,
  placeHolder,
  type = 'text',
  name,
  required = false,
  descriptionId,
  isOnlyInput,
  ...props
}) => {
  const [isTouched, setIsTouched] = useState(false);
  const [isActive, setIsActive] = useState(true);
  const [isFocused, setIsFocused] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const removeBtnRef = useRef<HTMLButtonElement>(null);

  const idReadyName = toHtmlId(name);
  const { errors, touched } = useFormikContext();
  const errorId = `${idReadyName}FormFieldError`;

  // Focus the input whenever a new one is added
  useEffectOnce(() => {
    if (inputRef.current && !isOnlyInput) {
      inputRef.current.focus();
    }
  });

  // Set focus to the input whenever edit is clicked
  useEffect(() => {
    if (inputRef.current && isTouched) {
      inputRef.current.focus();
    }
  }, [isActive, isTouched, name]);

  useOutsideGroupClick<HTMLInputElement | HTMLButtonElement>([inputRef, removeBtnRef], () => {
    if (isTouched) {
      setIsActive(false);
      setIsFocused(false);
    }
  });

  const shouldDisplayErrors =
    (!!errors[name] && !!touched[name]) || (!!getIn(errors, name) && !!getIn(touched, name));
  const validationClass = shouldDisplayErrors ? 'usa-input-error-message' : '';

  const handleEdit = (): void => {
    setIsActive(true);
  };

  const handleRemove = (): void => {
    onRemove();
  };

  const handleFocus = (): void => {
    setIsTouched(true);
    setIsFocused(true);
  };

  const showEditButton = isTouched && !isActive;
  const showRemoveButton = isFocused && !isOnlyInput;
  const showFocusBackground = isFocused && !isOnlyInput;

  return (
    <div
      className={classNames(
        { 'vads-u-margin--2': !showFocusBackground && !shouldDisplayErrors },
        {
          'usa-input-error vads-u-padding-top--0 vads-u-padding-bottom--0p5 vads-u-position--normal vads-u-padding-right--2 vads-u-width--full vads-u-padding-left--1.5':
            shouldDisplayErrors && !isFocused,
        },
        { 'vads-u-background-color--gray-cool-light vads-u-padding--2': showFocusBackground },
      )}
    >
      <span
        id={errorId}
        className={classNames(validationClass, { 'vads-u-display--none': isFocused })}
        role="alert"
      >
        <ErrorMessage name={name} />
      </span>

      <div className="input-container">
        <div className={showEditButton ? 'input-edit-button-container' : 'vads-u-display--none'}>
          <button
            className="usa-button usa-button-secondary vads-u-background-color--white vads-u-margin--0p5 vads-u-width--auto"
            type="button"
            onClick={handleEdit}
          >
            edit
          </button>
        </div>

        <Field
          className={classNames('vads-u-margin-right--2p5 vads-u-width--full', {
            'vads-u-background-color--gray-lighter': showEditButton,
          })}
          id={name}
          name={name}
          required={required}
          aria-describedby={`${errorId} ${descriptionId}`}
          aria-invalid={shouldDisplayErrors}
          type={type}
          disabled={!isActive}
          placeholder={placeHolder}
          innerRef={inputRef}
          onFocus={handleFocus}
          {...props}
        />

        <div
          className={
            showRemoveButton
              ? 'vads-u-display--flex vads-u-flex-direction--row-reverse'
              : 'vads-u-display--none'
          }
        >
          <button
            ref={removeBtnRef}
            className="usa-button usa-button-secondary vads-u-background-color--white vads-u-width--auto"
            type="button"
            onClick={handleRemove}
          >
            remove
          </button>
        </div>
      </div>
    </div>
  );
};
