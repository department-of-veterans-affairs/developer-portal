import * as React from 'react';
import 'jest';
import { render, screen } from '@testing-library/react';
import { Formik, useFormikContext } from 'formik';
import { Provider } from 'react-redux';
import store from '../../store';
import { setApis } from '../../features/apis/apisSlice';
import { fakeCategories } from '../../__mocks__/fakeCategories';
import { Attestation } from './Attestation';

jest.mock('formik', () => ({
  ...jest.requireActual<{ ErrorMessage: unknown }>('formik'),
  useFormikContext: jest.fn(),
}));

describe('Attestation', () => {
  store.dispatch(setApis(fakeCategories));

  it('should be visible when API requires attestation', () => {
    (useFormikContext as jest.Mock).mockReset().mockImplementation(() => ({
      errors: { attestationChecked: 'You must attest to request production access for this API.' },
      isSubmitting: true,
      setFieldError: jest.fn(),
      values: { apis: ['somevalue/rings'], termsOfService: true },
    }));

    const { container } = render(
      <Provider store={store}>
        <Formik initialValues={{}} onSubmit={jest.fn()}>
          <Attestation api={fakeCategories.lotr.apis[0]} />
        </Formik>
      </Provider>,
    );
    const modal = container.querySelector('va-modal') as HTMLElement;
    expect(modal).toHaveAttribute('visible', 'true');
    expect(screen.getByText(/Rings API/)).toBeInTheDocument();
  });

  it('should not be visible when selecting a non-attestation api', () => {
    (useFormikContext as jest.Mock).mockReset().mockImplementation(() => ({
      errors: {},
      values: { apis: ['somevalue/someapi'] },
    }));
    const { container } = render(
      <Provider store={store}>
        <Formik initialValues={{}} onSubmit={jest.fn()}>
          <Attestation api={fakeCategories.lotr.apis[0]} />
        </Formik>
      </Provider>,
    );
    const modal = container.querySelector('va-modal') as HTMLElement;
    expect(modal).toHaveAttribute('visible', 'false');
  });

  it('should be display children', () => {
    (useFormikContext as jest.Mock).mockReset().mockImplementation(() => ({
      errors: { attestationChecked: 'You must attest to request production access for this API.' },
      isSubmitting: true,
      setFieldError: jest.fn(),
      values: { apis: ['somevalue/rings'], termsOfService: true },
    }));

    render(
      <Provider store={store}>
        <Formik initialValues={{}} onSubmit={jest.fn()}>
          <Attestation api={fakeCategories.lotr.apis[0]}>
            <p>Child text</p>
          </Attestation>
        </Formik>
      </Provider>,
    );
    expect(screen.getByText(/Child text/)).toBeInTheDocument();
  });
});
