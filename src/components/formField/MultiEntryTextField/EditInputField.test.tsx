import React from 'react';
import { render } from '@testing-library/react';
import { Formik, useFormikContext } from 'formik';

import { EditInputField, EditInputFieldProps } from './EditInputField';

jest.mock('formik', () => ({
  ...jest.requireActual<{ Field: unknown; ErrorMessage: unknown }>('formik'),
  useFormikContext: jest.fn(),
}));

describe('EditInputField', () => {
  beforeEach(() => {
    (useFormikContext as jest.Mock).mockReset().mockImplementation(() => ({
      errors: {},
      touched: {},
    }));
  });

  const defaultProps: EditInputFieldProps = {
    descriptionId: 'test',
    isOnlyInput: false,
    name: 'test field',
    onRemove: jest.fn(),
    placeHolder: 'test',
    required: false,
    type: 'text',
  };

  it('should render', () => {
    const { container } = render(
      <Formik initialValues={{}} onSubmit={jest.fn()}>
        <EditInputField {...defaultProps} />
      </Formik>,
    );
    expect(container).toBeInTheDocument();
  });
});
