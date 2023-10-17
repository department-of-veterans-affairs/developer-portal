import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { Formik, useFormikContext } from 'formik';
import { TextField } from '../components';
import { ScrollToFirstError } from './ScrollToFirstError';

jest.mock('formik', () => ({
  ...jest.requireActual<{ ErrorMessage: unknown }>('formik'),
  useFormikContext: jest.fn(),
}));

describe('ScrollToFirstError', () => {
  beforeEach(() => {
    (useFormikContext as jest.Mock).mockReset().mockImplementation(() => ({
      errors: { lastName: 'Some error' },
      touched: {},
    }));
  });

  it('focuses the first error', async () => {
    render(
      <Formik initialValues={{}} onSubmit={jest.fn()}>
        <form>
          <TextField name="firstName" label="First Name" />
          <TextField name="lastName" label="Last Name" />
          <ScrollToFirstError />
        </form>
      </Formik>,
    );
    const field = screen.getByRole('textbox', { name: /Last Name/ });
    await waitFor(() => expect(document.activeElement).toBe(field));
  });
});
