import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Form, Formik } from 'formik';
import React from 'react';
import * as yup from 'yup';
import TermsOfServiceCheckbox, { TermsOfServiceFormValues } from './TermsOfServiceCheckbox';

describe('TermsOfServiceCheckbox', () => {
  describe('rendered elements', () => {
    it('include the checkbox', () => {
      render(
        <Formik initialValues={{ termsOfService: false }} onSubmit={jest.fn()}>
          <Form noValidate>
            <TermsOfServiceCheckbox />
          </Form>
        </Formik>
      );

      const checkbox = screen.getByRole('checkbox', { name: 'I agree to the terms' });
      expect(checkbox).toBeInTheDocument();
    });

    it('include the description and link', () => {
      render(
        <Formik initialValues={{ termsOfService: false }} onSubmit={jest.fn()}>
          <Form noValidate>
            <TermsOfServiceCheckbox />
          </Form>
        </Formik>
      );

      expect(screen.getByText('Terms and conditions')).toBeInTheDocument();

      const termsLink = screen.getByRole('link', { name: 'terms of service' });
      expect(termsLink).toBeInTheDocument();
      expect(termsLink).toHaveAttribute('href', '/terms-of-service');
      expect(termsLink.parentElement).toHaveTextContent('Review our terms of service.');

      // ensure terms of service link opens in a new tab
      expect(termsLink).toHaveAttribute('target', '_blank');
      expect(termsLink).toHaveAttribute('rel', 'noopener noreferrer');
    });
  });

  describe('changes the termsOfService value', () => {
    const testValueChange = (initialValue: boolean) => async (): Promise<void> => {
      const checkValue = jest.fn((values: TermsOfServiceFormValues): void => {
        expect(values.termsOfService).toBe(!initialValue);
      });

      render(
        <Formik initialValues={{ termsOfService: initialValue }} onSubmit={checkValue}>
          <Form noValidate>
            <TermsOfServiceCheckbox />
            <button type="submit">Submit</button>
          </Form>
        </Formik>
      );

      userEvent.click(screen.getByRole('checkbox', { name: 'I agree to the terms' }));
      userEvent.click(screen.getByRole('button', { name: 'Submit' }));

      // don't want test to pass without running assertion, so we run this check to fail the test
      // if it didn't run
      await waitFor(() => expect(checkValue).toHaveBeenCalledTimes(1));
    };

    it('from no to yes', testValueChange(false));
    it('from yes to no', testValueChange(true));
  });

  describe('validation', () => {
    const schema = yup.object().shape({
      termsOfService: yup.boolean()
        .oneOf([true], 'Accept the terms or else.')
        .required(),
    });

    it('does not have an error message when there is no error', async () => {
      const submitMock = jest.fn();
      render(
        <Formik
          initialValues={{ termsOfService: false }}
          onSubmit={submitMock}
          validateOnBlur={false}
          validateOnChange={false}
          validationSchema={schema}
        >
          <Form noValidate>
            <TermsOfServiceCheckbox />
            <button type="submit">Submit</button>
          </Form>
        </Formik>
      );

      userEvent.click(screen.getByRole('checkbox', { name: 'I agree to the terms' }));
      userEvent.click(screen.getByRole('button', { name: 'Submit' }));

      await waitFor(() => expect(submitMock).toHaveBeenCalledTimes(1));
      expect(screen.queryByText('Accept the terms or else.')).toBeNull();
    });

    it('shows an error message when there is an error', async () => {
      const submitMock = jest.fn();
      render(
        <Formik
          initialValues={{ termsOfService: false }}
          onSubmit={submitMock}
          validateOnBlur={false}
          validateOnChange={false}
          validationSchema={schema}
        >
          <Form noValidate>
            <TermsOfServiceCheckbox />
            <button type="submit">Submit</button>
          </Form>
        </Formik>
      );

      userEvent.click(screen.getByRole('button', { name: 'Submit' }));
      await waitFor(async () => {
        expect(await screen.findByText('Accept the terms or else.')).toBeInTheDocument();
      });

      expect(submitMock).not.toHaveBeenCalled();
    });
  });
});
