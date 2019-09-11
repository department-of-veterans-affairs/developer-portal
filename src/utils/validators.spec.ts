import 'jest';

import { validateEmail, validateOAuthRedirectURI, validatePresence } from '../utils/validators';

describe('validateEmail', () => {
  it('should add validation filed to newValue when email is not valid', () => {
    expect(
      validateEmail({
        dirty: true,
        value: 'bademail(at)example.com',
      }),
    ).toEqual(expect.objectContaining({ validation: 'Must be a valid email address.' }));
  });

  it('should not add validation if the email is valid', () => {
    expect(
      validateEmail({
        dirty: true,
        value: 'goodemail@example.com',
      }),
    ).toEqual(
      expect.not.objectContaining({
        validation: 'Must be a valid email address.',
      }),
    );
  });
});

describe('validateOAuthRedirectURI', () => {
  it('should accept localhost urls with ports', () => {
    const validatedInput = validateOAuthRedirectURI({
      dirty: true,
      value: 'http://localhost:8080/',
    });
    expect(validatedInput).not.toEqual(expect.objectContaining({ validation: expect.anything() }));
  });

  it('should reject URLs with query strings', () => {
    const validatedInput = validateOAuthRedirectURI({
      dirty: true,
      value: 'https://example.com?a=b',
    });
    expect(validatedInput).toEqual(expect.objectContaining({ validation: expect.any(String) }));
  });

  it('should reject URLs with fragments', () => {
    const validatedInput = validateOAuthRedirectURI({
      dirty: true,
      value: 'https://example.com/#frag',
    });
    expect(validatedInput).toEqual(expect.objectContaining({ validation: expect.any(String) }));
  });
});

describe('validatePresence', () => {
  it('should add validation filed to newValue when field is not valid', () => {
    expect(
      validatePresence({
        dirty: true,
        value: '',
      }, 'email'),
    ).toEqual(expect.objectContaining({ validation: 'email must not be blank.' }));
  });

  it('should not add validation if the email is valid', () => {
    expect(
      validatePresence({
        dirty: true,
        value: 'goodemail@example.com',
      }, 'email'),
    ).toEqual(
      expect.not.objectContaining({
        validation: 'email must not be blank.',
      }),
    );
  });
});