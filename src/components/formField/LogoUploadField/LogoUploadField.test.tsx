import React from 'react';
import { Formik } from 'formik';
import { act, render, waitFor } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { LogoUploadField } from './LogoUploadField';
import { LPB_LOGO_UPLOAD_POLICY_URL } from '../../../types/constants';

describe('LogoUploadField', () => {
  const server = setupServer(
    rest.post(`${LPB_LOGO_UPLOAD_POLICY_URL}`, (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({
          acl: 'public-read',
          bucketName: 'your-bucket-name',
          s3RegionEndpoint: 'east.com',
        }),
      );
    }),
  );

  beforeAll(() => {
    server.listen();
  });

  afterEach(() => {
    server.resetHandlers();
    jest.restoreAllMocks();
  });

  afterAll(() => {
    server.close();
  });

  it('renders without crashing', () => {
    const { getByText } = render(
      <Formik initialValues={{}} onSubmit={jest.fn()}>
        <LogoUploadField />
      </Formik>,
    );
    expect(getByText(/Upload your company logo/i)).toBeInTheDocument();
  });

  it('rejects file size over 10mb', async () => {
    const size = 11 * 1024 * 1024;
    const content = new Array(size).fill('a').join('');
    const blob = new Blob([content], { type: 'image/png' });
    const mockFile = new File([blob], 'large_logo.png', { type: 'image/png' });

    const { getByTestId } = render(
      <Formik initialValues={{}} onSubmit={jest.fn()}>
        <LogoUploadField />
      </Formik>,
    );

    const webComponent = getByTestId('file-upload-input');
    const customEvent = new CustomEvent('vaChange', {
      detail: {
        files: [mockFile],
      },
    });

    act(() => {
      webComponent.dispatchEvent(customEvent);
    });

    expect(webComponent.getAttribute('error')).toBe(
      'We couldn’t upload your file. Files should be less than 10 MB.',
    );
  });

  it('rejects wrong file mime type', async () => {
    const size = 5 * 1024 * 1024;
    const content = new Array(size).fill('a').join('');
    const blob = new Blob([content], { type: 'application/pdf' });
    const mockFile = new File([blob], 'manual.pdf', { type: 'application/pdf' });

    const { getByTestId } = render(
      <Formik initialValues={{}} onSubmit={jest.fn()}>
        <LogoUploadField />
      </Formik>,
    );

    const webComponent = getByTestId('file-upload-input');
    const customEvent = new CustomEvent('vaChange', {
      detail: {
        files: [mockFile],
      },
    });

    act(() => {
      webComponent.dispatchEvent(customEvent);
    });

    expect(webComponent.getAttribute('error')).toBe(
      'We couldn’t upload your file. Files should be in PNG or JPEG format.',
    );
  });

  it('displays loading with cancel button', async () => {
    const size = 9 * 1024 * 1024;
    const content = new Array(size).fill('a').join('');
    const blob = new Blob([content], { type: 'image/jpeg' });
    const mockFile = new File([blob], 'logo.jpeg', { type: 'image/jpeg' });

    const { getByTestId, getByText } = render(
      <Formik initialValues={{}} onSubmit={jest.fn()}>
        <LogoUploadField />
      </Formik>,
    );

    const webComponent = getByTestId('file-upload-input');
    const customEvent = new CustomEvent('vaChange', {
      detail: {
        files: [mockFile],
      },
    });

    act(() => {
      webComponent.dispatchEvent(customEvent);
    });

    await waitFor(() => {
      expect(getByText('Cancel')).toBeInTheDocument();
    });
  });
});
