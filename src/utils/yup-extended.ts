/* eslint-disable @typescript-eslint/no-invalid-this */
import * as yup from 'yup';

yup.addMethod<yup.StringSchema>(yup.string, 'isNotATestString', function () {
  return this.test('isNotATestString', function (value) {
    const { path, createError } = this;

    if (value?.match(/\btest\b|\bsample\b|\bfake\b|\bemail\b/i)) {
      return createError({ message: 'Please enter a real value.', path });
    }

    return true;
  });
});

export default yup;
