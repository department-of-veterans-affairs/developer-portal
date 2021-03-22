import { render, screen } from '@testing-library/react';
import { Formik, useFormikContext } from 'formik';
import React, { ComponentPropsWithRef } from 'react';
import CheckboxRadioField from './CheckboxRadioField';

interface RenderProps {
  label: string;
  required?: boolean;
  type: ComponentPropsWithRef<typeof CheckboxRadioField>['type'];
}

jest.mock('formik', () => ({
  ...jest.requireActual<{Field: unknown; ErrorMessage: unknown}>('formik'),
  useFormikContext: jest.fn(),
}));

describe('FormField', () => {
  beforeEach(() => {
    (useFormikContext as jest.Mock).mockReset().mockImplementation(() => ({
      errors: {},
      touched: {},
    }));
  });
  const renderComponent = ({ label, required = false, type }: RenderProps): void => {
    render(
      <Formik initialValues={{}} onSubmit={jest.fn()}>
        <CheckboxRadioField name="test" label={label} required={required} type={type} />
      </Formik>
    );
  };

  describe('Checkbox', () => {
    it('renders a checkbox', () => {
      renderComponent({ label: 'Test Input', type: 'checkbox' });
      expect(screen.getByRole('checkbox', { name: 'Test Input' })).toBeInTheDocument();
    });
  });

  describe('Radio', () => {
    it('renders a checkbox', () => {
      renderComponent({ label: 'Test Input', type: 'radio' });
      expect(screen.getByRole('radio', { name: 'Test Input' })).toBeInTheDocument();
    });
  });

  describe('required is true', () => {
    it('marks the input as required', () => {
      renderComponent({ label: 'Test Input', required: true, type: 'radio' });
      expect(screen.getByLabelText(/Test Input/)).toHaveAttribute('required');
    });
  });
});
