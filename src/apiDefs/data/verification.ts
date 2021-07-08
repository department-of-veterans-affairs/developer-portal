import {
  AddressValidationReleaseNotes,
  VeteranConfirmationReleaseNotes,
  VeteranVerificationReleaseNotes,
} from '../../content/apiDocs/verification';
import { OPEN_API_SPEC_HOST } from '../../types/constants';
import { APIDescription } from '../schema';

const verificationApis: APIDescription[] = [
  {
    description: 'Provides methods to standardize and validate addresses.',
    docSources: [
      {
        metadataUrl: `${OPEN_API_SPEC_HOST}/internal/docs/address-validation/metadata.json`,
        openApiUrl: `${OPEN_API_SPEC_HOST}/internal/docs/address-validation/v1/openapi.json`,
      },
    ],
    enabledByDefault: true,
    name: 'Address Validation API',
    releaseNotes: AddressValidationReleaseNotes,
    trustedPartnerOnly: false,
    urlFragment: 'address_validation',
    vaInternalOnly: true,
  },
  {
    // adding an altID to match keys need on the backend for signup
    altID: 'confirmation',
    description: 'Confirm Veteran status for a given person with an api key.',
    docSources: [
      {
        openApiUrl: `${OPEN_API_SPEC_HOST}/internal/docs/veteran-confirmation/v0/openapi.json`,
      },
    ],
    enabledByDefault: true,
    name: 'Veteran Confirmation API',
    releaseNotes: VeteranConfirmationReleaseNotes,
    trustedPartnerOnly: false,
    urlFragment: 'veteran_confirmation',
    vaInternalOnly: false,
  },
  {
    altID: 'verification',
    description:
      'Confirm Veteran status for a given person, or get a Veteran’s service history or disability rating.',
    docSources: [
      {
        openApiUrl: `${OPEN_API_SPEC_HOST}/internal/docs/veteran-verification/v0/openapi.json`,
      },
    ],
    enabledByDefault: true,
    name: 'Veteran Verification API',
    oAuth: true,
    oAuthInfo: {
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
    releaseNotes: VeteranVerificationReleaseNotes,
    trustedPartnerOnly: false,
    urlFragment: 'veteran_verification',
    vaInternalOnly: false,
  },
];

export default verificationApis;
