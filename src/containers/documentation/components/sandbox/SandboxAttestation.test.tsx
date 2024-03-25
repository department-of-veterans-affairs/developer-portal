import * as React from 'react';
import 'jest';
import { Formik, useFormikContext } from 'formik';
import { render, screen } from '@testing-library/react';
import { fakeCategories } from '../../../../__mocks__/fakeCategories';
import { SandboxAttestation } from './SandboxAttestation';

jest.mock('formik', () => ({
  ...jest.requireActual<{ ErrorMessage: unknown }>('formik'),
  useFormikContext: jest.fn(),
}));

describe('SandboxAttestation', () => {
  it('renders', () => {
    (useFormikContext as jest.Mock).mockReset().mockImplementation(() => ({
      errors: {},
    }));

    render(
      <Formik initialValues={{}} onSubmit={jest.fn()}>
        <SandboxAttestation api={fakeCategories.lotr.apis[0]} />
      </Formik>,
    );
    expect(screen.getByText(/Requirements for the Rings API/)).toBeInTheDocument();
  });
});
