import { VaModal } from '@department-of-veterans-affairs/component-library/dist/react-bindings';
import * as React from 'react';
import { TextField } from '../../../../components';
import { useModalController } from '../../../../hooks';
import { PublicKeySteps } from '../../../../components/oauthDocs/ccg/PublicKeySteps';

const OAuthCcgAppInfo = (): JSX.Element => {
  const { modalVisible, setModalVisible } = useModalController();
  return (
    <div className="vads-u-margin-left--2">
      <div className="vads-u-margin-top--4">
        <p>
          In order to access an API that uses OAuth 2.0 Client Credentials Grant, you must provide
          your public key.{' '}
          <button
            onClick={(): void => setModalVisible(true)}
            type="button"
            className="usa-button usa-button-secondary usa-button-unstyled"
          >
            Learn how to generate a public key.
          </button>
        </p>
      </div>
      <VaModal
        id="generate-ccg-modal"
        large
        visible={modalVisible}
        onCloseEvent={(): void => setModalVisible(false)}
        onPrimaryButtonClick={(): void => setModalVisible(false)}
        primaryButtonText="Close"
        modalTitle="Generating Public RSA Key and Converting to JWK Format"
        uswds
      >
        <div className="va-api-authorization-docs">
          <PublicKeySteps />
        </div>
      </VaModal>
      <TextField
        as="textarea"
        placeholder='{
    "kty": "RSA",
    "n": "mYi1wUpwkJ1QB8...",
    "e": "AQAB",
    "alg": "RS256",
    "use": "sig"
  }'
        label="OAuth public key"
        name="oAuthPublicKey"
        required
        className="vads-u-margin-top--4"
      />
    </div>
  );
};

export { OAuthCcgAppInfo };
