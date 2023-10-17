import React from 'react';
import { render } from '@testing-library/react';
import { Formik, useFormikContext } from 'formik';
import { ScrollToFirstError } from './ScrollToFirstError';

jest.mock('formik', () => ({
  ...jest.requireActual<{ Field: unknown; ErrorMessage: unknown }>('formik'),
  useFormikContext: jest.fn(),
}));

describe('ScrollToFirstError', () => {
  beforeEach(() => {
    (useFormikContext as jest.Mock).mockReset().mockImplementation(() => ({
      errors: { firstName: 'Some error' },
      touched: {},
    }));
  });

  it('focuses the first error', () => {
    render(
      <Formik initialValues={{}} onSubmit={jest.fn()}>
        <form>
          <input name="firstName" />
          <input name="secondName" />
          <ScrollToFirstError />
        </form>
      </Formik>,
    );

    expect(document.activeElement).toBe('firstName');
  });
});
