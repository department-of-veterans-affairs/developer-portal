/* eslint-disable @typescript-eslint/no-invalid-this */
import * as yup from 'yup';
import { StringSchema } from 'yup';

yup.addMethod<StringSchema>(yup.string, 'isValidRSAJWK', function () {
  return this.test('isValidRSAJWK', function (value: string) {
    const { path, createError } = this;

    try {
      const jwk = JSON.parse(value) as {
        [key: string]: string;
      };

      if (!jwk.kty || !jwk.n || !jwk.e || jwk.kty !== 'RSA') {
        return createError({
          message: 'Please enter a valid RSA-generated key in JSON Web Key format.',
          path,
        });
      }

      return true;
    } catch (e: unknown) {
      return createError({
        message: 'Please enter a valid RSA-generated key in JSON Web Key format.',
        path,
      });
    }
  });
});

// Override Yup's email validator
const emailRegex =
  /^[\w!#$%&'*+-/=?^_`{|}~]+(?:\.[\w!#$%&'*+/=?`{|}~^-]+)*@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,63}$/;
yup.addMethod(yup.string, 'email', function (message: string) {
  return this.matches(emailRegex, {
    excludeEmptyString: true,
    message,
    name: 'email',
  });
});

declare module 'yup' {
  interface StringSchema {
    isValidRSAJWK: () => StringSchema;
  }
}

export default yup;
