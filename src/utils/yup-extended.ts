/* eslint-disable @typescript-eslint/no-unnecessary-qualifier */
/* eslint-disable @typescript-eslint/method-signature-style */
/* eslint-disable @typescript-eslint/no-invalid-this */
import * as yup from 'yup';
import { AnyObject, Maybe } from 'yup/lib/types';

yup.addMethod<yup.StringSchema>(yup.string, 'isNotATestString', function () {
  return this.test('isNotATestString', function (value) {
    const { path, createError } = this;

    if (value?.match(/test|sample|fake|email/i)) {
      return createError({ message: 'Please enter a real value.', path });
    }

    return true;
  });
});

declare module 'yup' {
  interface StringSchema<
    TType extends Maybe<string> = string | undefined,
    TContext extends AnyObject = AnyObject,
    TOut extends TType = TType,
  > extends yup.BaseSchema<TType, TContext, TOut> {
    isNotATestString(): StringSchema<TType, TContext>;
  }
}

export default yup;
