import { render, screen } from '@testing-library/react';
import { Formik, useFormikContext } from 'formik';
import React from 'react';
import CheckboxRadioField from '../CheckboxRadioField/CheckboxRadioField';
import FieldSet from './FieldSet';

interface RenderProps {
  legend: string;
  required?: boolean;
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
  const renderComponent = ({ legend, required }: RenderProps): void => {
    render(
      <Formik initialValues={{}} onSubmit={jest.fn()}>
        <FieldSet name="test" legend={legend} required={required}>
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
});
