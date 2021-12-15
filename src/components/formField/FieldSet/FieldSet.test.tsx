import { render, screen } from '@testing-library/react';
import { Formik, useFormikContext } from 'formik';
import React from 'react';
import CheckboxRadioField from '../CheckboxRadioField/CheckboxRadioField';
import FieldSet from './FieldSet';

interface RenderProps {
  legend: string;
  required?: boolean;
  description?: string;
}

jest.mock('formik', () => ({
  ...jest.requireActual<{ Field: unknown; ErrorMessage: unknown }>('formik'),
  useFormikContext: jest.fn(),
}));

describe('FieldSet', () => {
  beforeEach(() => {
    (useFormikContext as jest.Mock).mockReset().mockImplementation(() => ({
      errors: {},
      touched: {},
    }));
  });
  const renderComponent = ({ legend, required, description }: RenderProps): void => {
    render(
      <Formik initialValues={{}} onSubmit={jest.fn()}>
        <FieldSet name="test" legend={legend} required={required} description={description}>
          <CheckboxRadioField type="radio" label="Yes" value="web" name="radioButton" />
          <CheckboxRadioField type="radio" label="No" value="native" name="radioButton" />
        </FieldSet>
      </Formik>,
    );
  };

  describe('required is not set', () => {
    it('does not include required in the legend', () => {
      renderComponent({ legend: 'Test Input' });
      expect(screen.queryByText('(*Required)')).not.toBeInTheDocument();
    });
  });

  describe('required is true', () => {
    it('includes required in the label', () => {
      renderComponent({ legend: 'Test Input', required: true });
      expect(screen.getByText('(*Required)')).toBeInTheDocument();
    });
  });

  describe('description is passed', () => {
    it('renders the description', () => {
      renderComponent({ description: 'A test description', legend: 'Test Input' });
      expect(screen.getByText('A test description')).toBeInTheDocument();
    });
  });
});
