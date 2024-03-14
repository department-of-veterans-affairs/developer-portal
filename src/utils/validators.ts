const EMAIL_PATTERN =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const VA_EMAIL_PATTERN = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@va.gov$/;
const PRESENCE_PATTERN = /^(?!\s*$).+/;
const PARTIAL_URL_PATTERN = /^http[s]?:[/][/][^/:?#]+(:[0-9]+)?([/][^?#]*)?$/;

export const validatePresence = (fieldName: string, value: string): string | undefined => {
  if (!PRESENCE_PATTERN.test(value)) {
    return `Enter your ${fieldName}.`;
  }

  return undefined;
};

export const validateOAuthApplicationType = (value: string): string | undefined => {
  if (!PRESENCE_PATTERN.test(value)) {
    return 'Choose an option.';
  }

  return undefined;
};

export const validateEmail = (value: string): string | undefined => {
  if (!EMAIL_PATTERN.test(value)) {
    return 'Enter a valid email address.';
  }

  return undefined;
};

export const validateVAEmail = (value: string): string | undefined => {
  if (!VA_EMAIL_PATTERN.test(value)) {
    return 'Enter a valid VA-issued email address.';
  }

  return undefined;
};

export const validateOAuthRedirectURI = (value: string): string | undefined => {
  if (!PARTIAL_URL_PATTERN.test(value)) {
    return 'Enter an http or https URI.';
  }

  return undefined;
};

export const isVaEmail = (value: string): boolean => VA_EMAIL_PATTERN.test(value);

export const validateOAuthPublicKey = (value: string): string | undefined => {
  try {
    const jwk = JSON.parse(value) as {
      [key: string]: string;
    };

    if (!jwk.kty || !jwk.n || !jwk.e || jwk.kty !== 'RSA') {
      return 'Please enter a valid RSA-generated key in JSON Web Key format.';
    }

    return undefined;
  } catch (e: unknown) {
    return 'Please enter a valid RSA-generated key in JSON Web Key format.';
  }
};
