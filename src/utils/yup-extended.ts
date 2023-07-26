/* eslint-disable @typescript-eslint/no-unnecessary-qualifier */
/* eslint-disable @typescript-eslint/method-signature-style */
/* eslint-disable @typescript-eslint/no-invalid-this */
import * as yup from 'yup';
import { AnyObject, Maybe } from 'yup/lib/types';

yup.addMethod<yup.StringSchema>(yup.string, 'isNotATestString', function () {
  return this.test('isNotATestString', function (value) {
    const { path, createError } = this;

    if (value?.match(/\btest\b|\bsample\b|\bfake\b|\bemail\b/i)) {
      return createError({ message: 'Please enter a real value.', path });
    }

    return true;
  });
});

yup.addMethod<yup.StringSchema>(yup.string, 'isValidRSAJWK', function () {
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

declare module 'yup' {
  interface StringSchema<
    TType extends Maybe<string> = string | undefined,
    TContext extends AnyObject = AnyObject,
    TOut extends TType = TType,
  > extends yup.BaseSchema<TType, TContext, TOut> {
    isNotATestString(): StringSchema<TType, TContext>;
    isValidRSAJWK(): StringSchema<TType, TContext>;
  }
}

export default yup;
