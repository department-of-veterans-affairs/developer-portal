import { render, screen } from '@testing-library/react';
import { Formik, useFormikContext } from 'formik';
import React, { ReactNode } from 'react';
import MultiEntryTextField from './MultiEntryTextField';

interface RenderProps {
  description?: ReactNode;
  emails?: string[];
  label: string;
  placeholder?: string;
  required?: boolean;
}

jest.mock('formik', () => ({
  ...jest.requireActual<{ Field: unknown; ErrorMessage: unknown }>('formik'),
  useFormikContext: jest.fn(),
}));

describe('MultiEntryTextField', () => {
  beforeEach(() => {
    (useFormikContext as jest.Mock).mockReset().mockImplementation(() => ({
      errors: {},
      touched: {},
    }));
  });
  const renderComponent = ({
    label,
    required,
    description,
    placeholder = '',
    emails = [],
  }: RenderProps): void => {
    render(
      <Formik initialValues={{}} onSubmit={jest.fn()}>
        <MultiEntryTextField
          name="test"
          label={label}
          required={required}
          description={description}
          placeholder={placeholder}
          emails={emails}
        />
      </Formik>,
    );
  };
  describe('required is not set', () => {
    it('does not include required in the label', () => {
      renderComponent({ label: 'Test Input' });
      expect(screen.queryByText('(*Required)')).not.toBeInTheDocument();
    });
  });

  describe('required is true', () => {
    it('includes required in the label', () => {
      renderComponent({ label: 'Test Input', required: true });
      expect(screen.getByText('(*Required)')).toBeInTheDocument();
    });
  });

  describe('description is passed in', () => {
    it('renders the description', () => {
      renderComponent({ description: 'Hello world', label: 'Test Input' });
      expect(screen.getByText('Hello world')).toBeInTheDocument();
    });
  });
});
