import { ErrorableInput } from 'src/types';

const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const validateByPattern = (
  newValue: ErrorableInput,
  pattern: RegExp,
  failMsg: string,
): void => {
  const invalid = newValue.value == null || !pattern.test(newValue.value);
  if (invalid) {
    newValue.validation = failMsg;
  }
};

export const validateEmail = (newValue: ErrorableInput): ErrorableInput => {
  validateByPattern(newValue, EMAIL_REGEX, 'Must be a valid email address.');
  return newValue;
};

export const validateOAuthRedirectURI = (newValue: ErrorableInput): ErrorableInput => {
  const partialUrlPattern = /^http[s]?:[/][/][^/:?#]+(:[0-9]+)?([/][^?#]*)?$/;
  validateByPattern(newValue, partialUrlPattern, 'Must be an http or https URI.');
  return newValue;
};

export const validatePresence = (newValue: ErrorableInput, fieldName: string): ErrorableInput => {
  const presencePattern = /^(?!\s*$).+/;
  validateByPattern(newValue, presencePattern, `${fieldName} must not be blank.`);
  return newValue;
};
