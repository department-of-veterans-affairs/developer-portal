import {
  AddressValidationReleaseNotes,
  VeteranConfirmationReleaseNotes,
  VeteranVerificationReleaseNotes,
  VaLetterGeneratorReleaseNotes,
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
    altID: 'vaLetterGenerator',
    description: 'Generate documents and letters for proof of existing VA benefits and status.',
    docSources: [
      {
        metadataUrl: `${OPEN_API_SPEC_HOST}/internal/docs/veteran-letters/metadata.json`,
        openApiUrl: `${OPEN_API_SPEC_HOST}/internal/docs/veteran-letters/v1/openapi.json`,
      },
    ],
    enabledByDefault: false,
    lastProdAccessStep: ProdAccessFormSteps.Three,
    name: 'VA Letter Generator API',
    oAuth: true,
    oAuthInfo: {
      ccgInfo: {
        baseAuthPath: 'oauth2/veteran-letters/system/v1/',
        productionAud: 'TBD',
        sandboxAud: 'TBD',
        scopes: ['letters.read'],
      },
    },
    oAuthTypes: ['ClientCredentialsGrant'],
    openData: false,
    releaseNotes: VaLetterGeneratorReleaseNotes,
    urlFragment: 'va_letter_generator',
    vaInternalOnly: true,
    veteranRedirect: {
      linkText: 'Download VA benefit letters from VA.Gov.',
      linkUrl: 'https://www.va.gov/records/download-va-letters/',
      message: 'Are you a Veteran or Veteran representative?',
    },
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
    lastProdAccessStep: ProdAccessFormSteps.Three,
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
