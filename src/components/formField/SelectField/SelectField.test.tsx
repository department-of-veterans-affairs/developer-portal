import { render, screen } from '@testing-library/react';
import { Formik, useFormikContext } from 'formik';
import React, { ReactNode } from 'react';
import SelectField from './SelectField';

interface RenderProps {
  label: string;
  required?: boolean;
  as?: string;
  description?: ReactNode;
  children?: ReactNode;
}

jest.mock('formik', () => ({
  ...jest.requireActual<{ Field: unknown; ErrorMessage: unknown }>('formik'),
  useFormikContext: jest.fn(),
}));

describe('SelectField', () => {
  beforeEach(() => {
    (useFormikContext as jest.Mock).mockReset().mockImplementation(() => ({
      errors: {},
      touched: {},
    }));
  });
  const renderComponent = ({ label, required, description, children }: RenderProps): void => {
    render(
      <Formik initialValues={{}} onSubmit={jest.fn()}>
        <SelectField name="test" label={label} required={required} description={description}>
          {children}
        </SelectField>
      </Formik>,
    );
  };

  it('renders a select component', () => {
    render(
      <Formik initialValues={{}} onSubmit={jest.fn()}>
        <SelectField name="country" label="country" required>
          <option value="" />
          <option value="USA">United States</option>
        </SelectField>
      </Formik>,
    );
    const field = screen.getByRole('combobox', { name: /country/ });
    const option = screen.getByRole('option', { name: 'United States' });
    expect(field).toBeInTheDocument();
    expect(option).toBeInTheDocument();
  });

  describe('required is not set', () => {
    it('does not include required in the label', () => {
      renderComponent({ label: 'Test Input' });
      expect(screen.queryByText('(*Required)')).not.toBeInTheDocument();
    });

    it('does not mark the input as required', () => {
      renderComponent({ label: 'Test Input' });
      expect(screen.getByLabelText(/Test Input/)).not.toHaveAttribute('required');
    });
  });

  describe('required is true', () => {
    it('includes required in the label', () => {
      renderComponent({ label: 'Test Input', required: true });
      expect(screen.getByText('(*Required)')).toBeInTheDocument();
    });

    it('marks the input as required', () => {
      renderComponent({ label: 'Test Input', required: true });
      expect(screen.getByLabelText(/Test Input/)).toHaveAttribute('required');
    });
  });

  describe('description is passed in', () => {
    it('renders the description', () => {
      renderComponent({ description: 'Hello world', label: 'Test Input' });
      expect(screen.getByText('Hello world')).toBeInTheDocument();
    });
  });
});
