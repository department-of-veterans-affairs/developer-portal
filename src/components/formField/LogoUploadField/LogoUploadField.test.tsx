import React from 'react';
import { Formik } from 'formik';
import { render } from '@testing-library/react';
import { LogoUploadField } from './LogoUploadField';

describe('LogoUploadField', () => {
  let fetchMock: jest.Mock;

  beforeEach(() => {
    fetchMock = jest.fn();
    global.fetch = fetchMock;
  });

  afterEach(() => {
    fetchMock.mockRestore();
  });

  it('renders without crashing', () => {
    const { getByText } = render(
      <Formik initialValues={{}} onSubmit={jest.fn()}>
        <LogoUploadField />
      </Formik>,
    );
    expect(getByText(/Upload your company logo/i)).toBeInTheDocument();
  });
});
