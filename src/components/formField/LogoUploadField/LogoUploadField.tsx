import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { useFormikContext } from 'formik';
import { VaFileInput } from '@department-of-veterans-affairs/component-library/dist/react-bindings';
import { LPB_LOGO_UPLOAD_POLICY_URL } from '../../../types/constants';
import { Values } from '../../../containers/consumerOnboarding/ProductionAccess';
import './LogoUploadField.scss';

interface AwsSigv4UploadEntity {
  acl: string;
  bucketName: string;
  contentType: string;
  key: string;
  logoUrls: string[];
  policy: string;
  resizeTriggerUrls: string[];
  s3RegionEndpoint: string;
  xAmzAlgorithm: string;
  xAmzCredential: string;
  xAmzDate: string;
  xAmzExpires: string;
  xAmzSecurityToken: string;
  xAmzSignature: string;
}

export interface LogoUploadProps {
  className?: string;
}

type CustomFileChangeEvent = {
  detail: {
    files: FileList;
  };
};

interface XMLHttpRequestWithSignal extends XMLHttpRequest {
  signal?: AbortSignal;
}

export const LogoUploadField = ({ className }: LogoUploadProps): JSX.Element => {
  const [error, setError] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoData, setLogoData] = useState<string | null>(null);
  const formik = useFormikContext<Values>();

  useEffect(() => {
    if (logoFile) {
      const reader = new FileReader();
      reader.onloadend = (): void => {
        setLogoData(reader.result as string);
      };
      reader.readAsDataURL(logoFile);
    }
  }, [logoFile]);

  const getUploadEntity = async (
    fileName: string,
    fileType: string,
  ): Promise<AwsSigv4UploadEntity> => {
    const response = await fetch(LPB_LOGO_UPLOAD_POLICY_URL, {
      body: JSON.stringify({ fileName, fileType }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    });

    if (!response.ok) {
      setError(`We couldn't upload your file`);
    }

    return (await response.json()) as Promise<AwsSigv4UploadEntity>;
  };

  const uploadToS3 = async (file: File, uploadEntity: AwsSigv4UploadEntity): Promise<void> => {
    const formData = new FormData();
    formData.append('acl', uploadEntity.acl);
    formData.append('Content-Type', uploadEntity.contentType);
    formData.append('key', uploadEntity.key);
    formData.append('Policy', uploadEntity.policy);
    formData.append('X-Amz-Algorithm', uploadEntity.xAmzAlgorithm);
    formData.append('X-Amz-Credential', uploadEntity.xAmzCredential);
    formData.append('X-Amz-Date', uploadEntity.xAmzDate);
    formData.append('X-Amz-Expires', uploadEntity.xAmzExpires);
    formData.append('X-Amz-Security-Token', uploadEntity.xAmzSecurityToken);
    formData.append('X-Amz-Signature', uploadEntity.xAmzSignature);
    formData.append('file', file);

    return new Promise((resolve, reject) => {
      const controller = new AbortController();
      const signal = controller.signal;
      const request: XMLHttpRequestWithSignal = new XMLHttpRequest();

      setIsUploading(true);
      request.upload.addEventListener('progress', e => {
        if (e.lengthComputable) {
          const percentCompleted = Math.round((e.loaded / e.total) * 100);
          setUploadProgress(percentCompleted);
        }
      });

      setLogoFile(file);
      request.open(
        'POST',
        `https://${uploadEntity.bucketName}.${uploadEntity.s3RegionEndpoint}`,
        true,
      );
      request.signal = signal;

      const cancelUploadButton = document.getElementById('cancelUpload');
      cancelUploadButton?.addEventListener('click', () => {
        controller.abort();
        setIsUploading(false);
        setUploadProgress(0);
        setLogoFile(null);
        setLogoData(null);
        setError('');
      });

      request.onload = () => {
        if (request.status === 200) {
          setIsUploading(false);
          resolve(request.response);
        } else {
          setIsUploading(false);
          setLogoData(null);
          setLogoFile(null);
          setError(`We couldn't upload your file`);
          reject(request.statusText);
        }
      };

      request.onerror = () => {
        setIsUploading(false);
        setLogoData(null);
        setLogoFile(null);
        setError(`We couldn't upload your file`);
        reject('Network Error');
      };

      request.send(formData);
    });
  };

  const handleFileChange = async (event: CustomFileChangeEvent): Promise<void> => {
    setError('');
    const file = event?.detail?.files[0];
    const maxSizeInBytes = 10 * 1024 * 1024;
    const mimeType = file.type;
    if (mimeType !== 'image/jpeg' && mimeType !== 'image/png') {
      setError(`We couldn’t upload your file. Files should be in PNG or JPEG format.`);
      return;
    }
    if (file.size > maxSizeInBytes) {
      setError(`We couldn’t upload your file. Files should be less than 10 MB.`);
      return;
    }
    if (file) {
      try {
        const uploadEntity = await getUploadEntity(file.name, file.type);
        await uploadToS3(file, uploadEntity);
        await formik.setFieldValue('logoIcon', uploadEntity.logoUrls[0]);
        await formik.setFieldValue('logoLarge', uploadEntity.logoUrls[1]);
      } catch (error: unknown) {
        await formik.setFieldValue('logoIcon', '');
        await formik.setFieldValue('logoLarge', '');
      }
    }
  };

  const handleDeleteFile = () => {
    setIsUploading(false);
    setUploadProgress(0);
    setLogoFile(null);
    setLogoData(null);
    setError('');
  };

  return (
    <div
      className={classNames(
        'vads-u-margin-top--4 medium-screen:vads-l-col--10',
        { 'vads-u-margin-bottom--9': !logoData },
        className,
      )}
    >
      <div>Upload your company logo</div>
      <p className="vads-u-color--gray vads-u-margin--0 vads-u-margin-bottom--2">
        Supported file types: PNG, JPEG; 10 MB max
      </p>
      <div
        className={classNames({
          'vads-u-background-color--gray-lightest': isUploading || uploadProgress === 100,
        })}
      >
        {/* default */}
        {!isUploading && !logoFile && !logoData && (
          <VaFileInput
            data-testid="file-upload-input"
            accept="image/png,image/jpeg"
            buttonText="Upload file"
            error={error}
            onVaChange={(e: CustomFileChangeEvent) => handleFileChange(e)}
          />
        )}
        {/* loading */}
        {isUploading && (
          <div className="vads-u-padding--2">
            <span>
              {logoFile?.name}.{logoFile?.type}
            </span>
            <va-progress-bar percent={uploadProgress} />
            <button id="cancelUpload" className="usa-button usa-button-secondary" type="button">
              Cancel
            </button>
          </div>
        )}
        {/* review & delete */}
        {!isUploading && logoFile && logoData && uploadProgress === 100 && (
          <div className="vads-u-padding--2">
            <div className="vads-u-font-weight--bold">
              {logoFile?.name}.{logoFile?.type}
            </div>
            <span>{logoFile?.size}</span>
            <img src={logoData} alt="Logo preview" className="vads-u-display--block" />
            <button
              className="usa-button usa-button-secondary"
              onClick={handleDeleteFile}
              type="button"
            >
              Delete file
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
