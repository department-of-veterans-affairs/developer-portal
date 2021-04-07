import { validateEmail, validateOAuthRedirectURI, validatePresence } from './validators';

describe('validateEmail', () => {
  it('should return validation failure message if email is not valid', () => {
    expect(
      validateEmail('bademail(at)example.com'),
    ).toEqual('Enter a valid email address.');
  });

  it('should return undefined if the email is valid', () => {
    expect(
      validateEmail('goodemail@example.com')).toBeUndefined();
  });
});

describe('validateOAuthRedirectURI', () => {
  it('should accept localhost urls with ports', () => {
    const validationMessage = validateOAuthRedirectURI('http://localhost:8080/');
    expect(validationMessage).toBeUndefined();
  });

  it('should reject URLs with query strings', () => {
    const validationMessage = validateOAuthRedirectURI('https://example.com?a=b');
    expect(validationMessage).toBeTruthy();
  });

  it('should reject URLs with fragments', () => {
    const validationMessage = validateOAuthRedirectURI('https://example.com/#frag');
    expect(validationMessage).toBeTruthy();
  });
});

describe('validatePresence', () => {
  it('should add validation filed to newValue when field is not valid', () => {
    expect(
      validatePresence('email', ''),
    ).toEqual('Enter your email.');
  });

  it('should not add validation if the email is valid', () => {
    expect(
      validatePresence('email', 'goodemail@example.com'),
    ).toBeUndefined();
  });
});
