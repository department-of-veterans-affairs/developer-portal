import {
  AddressValidationReleaseNotes,
  VeteranConfirmationReleaseNotes,
  VeteranVerificationReleaseNotes,
} from '../../content/apiDocs/verification';
import { OPEN_API_SPEC_HOST } from '../../types/constants';
import { APIDescription, ProdAccessFormSteps } from '../schema';

const verificationApis: APIDescription[] = [
  {
    altID: 'addressValidation',
    description: 'Provides methods to standardize and validate addresses.',
    docSources: [
      {
        metadataUrl: `${OPEN_API_SPEC_HOST}/internal/docs/address-validation/metadata.json`,
        openApiUrl: `${OPEN_API_SPEC_HOST}/internal/docs/address-validation/v1/openapi.json`,
      },
    ],
    enabledByDefault: true,
    lastProdAccessStep: ProdAccessFormSteps.Three,
    name: 'Address Validation API',
    openData: false,
    releaseNotes: AddressValidationReleaseNotes,
    urlFragment: 'address_validation',
    vaInternalOnly: true,
  },
  {
    // adding an altID to match keys need on the backend for signup
    altID: 'confirmation',
    description: 'Confirm Veteran status for a given person with an API key.',
    docSources: [
      {
        metadataUrl: `${OPEN_API_SPEC_HOST}/internal/docs/veteran-confirmation/metadata.json`,
        openApiUrl: `${OPEN_API_SPEC_HOST}/internal/docs/veteran-confirmation/v0/openapi.json`,
      },
    ],
    enabledByDefault: true,
    lastProdAccessStep: ProdAccessFormSteps.Four,
    name: 'Veteran Confirmation API',
    openData: false,
    releaseNotes: VeteranConfirmationReleaseNotes,
    urlFragment: 'veteran_confirmation',
    vaInternalOnly: false,
  },
  {
    altID: 'verification',
    description:
      'Confirm Veteran status for a given person, or get a Veteran’s service history or disability rating.',
    docSources: [
      {
        metadataUrl: `${OPEN_API_SPEC_HOST}/internal/docs/veteran-verification/metadata.json`,
        openApiUrl: `${OPEN_API_SPEC_HOST}/internal/docs/veteran-verification/v0/openapi.json`,
      },
    ],
    enabledByDefault: true,
    lastProdAccessStep: ProdAccessFormSteps.Four,
    name: 'Veteran Verification API',
    oAuth: true,
    oAuthInfo: {
      acgInfo: {
        baseAuthPath: '/oauth2/veteran-verification/v1',
        scopes: [
          'profile',
          'openid',
          'offline_access',
          'service_history.read',
          'disability_rating.read',
          'veteran_status.read',
        ],
      },
    },
    oAuthTypes: ['AuthorizationCodeGrant'],
    openData: false,
    releaseNotes: VeteranVerificationReleaseNotes,
    urlFragment: 'veteran_verification',
    vaInternalOnly: false,
  },
];

export default verificationApis;
