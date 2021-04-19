import { render, screen } from '@testing-library/react';
import { Formik, useFormikContext } from 'formik';
import React, { ComponentPropsWithRef, ReactNode } from 'react';
import TextField from './TextField';

interface RenderProps {
  label: string;
  required?: boolean;
  type?: ComponentPropsWithRef<typeof TextField>['type'];
  as?: string;
  description?: ReactNode;
}

jest.mock('formik', () => ({
  ...jest.requireActual<{Field: unknown; ErrorMessage: unknown}>('formik'),
  useFormikContext: jest.fn(),
}));

describe('TextField', () => {
  beforeEach(() => {
    (useFormikContext as jest.Mock).mockReset().mockImplementation(() => ({
      errors: {},
      touched: {},
    }));
  });
  const renderComponent = ({ label, required, type, as, description }: RenderProps): void => {
    render(
      <Formik initialValues={{}} onSubmit={jest.fn()}>
        <TextField name="test" label={label} required={required} type={type} as={as} description={description} />
      </Formik>
    );
  };
  it('defaults the type to text', () => {
    renderComponent({ label: 'Test Input' });
    const field = screen.getByRole('textbox', { name: 'Test Input' });
    expect(field).toBeInTheDocument();
    expect(field).toHaveAttribute('type', 'text');
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

  describe('type is set to email', () => {
    it('renders an email input', () => {
      renderComponent({ label: 'Test Input', type: 'email' });
      expect(screen.getByLabelText('Test Input')).toHaveAttribute('type', 'email');
    });
  });

  describe('as is set to textarea', () => {
    it('renders a textarea', () => {
      renderComponent({ as: 'textarea', label: 'Test Input' });
      expect(screen.getByLabelText('Test Input', {
        selector: 'textarea',
      })).toBeInTheDocument();
    });
  });

  describe('description is passed in', () => {
    it('renders the description', () => {
      renderComponent({ description: 'Hello world', label: 'Test Input' });
      expect(screen.getByText('Hello world')).toBeInTheDocument();
    });
  });
});
