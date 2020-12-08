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
        openApiUrl: `${OPEN_API_SPEC_HOST}/services/address_validation/docs/v1/api`,
      },
    ],
    enabledByDefault: true,
    name: 'Address Validation API',
    oAuth: true,
    oAuthDocs: {
      authorizationUrl:
        'https://sandbox-api.va.gov/oauth2/authorization?\n  client_id=0oa1c01m77heEXUZt2p7\n  &redirect_uri=<yourRedirectURL>\n  &response_type=code\n  &scope=openid offline_access profile email veteran_status.read launch/patient\n  &state=1AOQK33KIfH2g0ADHvU1oWAb7xQY7p6qWnUFiG1ffcUdrbCY1DBAZ3NffrjaoBGQ\n  &nonce=o5jYpLSe29RBHBsn5iAnMKYpYw2Iw9XRBweacc001hRo5xxJEbHuniEbhuxHfVZy',
    },
    releaseNotes: AddressValidationReleaseNotes,
    trustedPartnerOnly: false,
    urlFragment: 'address_validation',
    vaInternalOnly: true,
  },
  {
    description: 'Confirm Veteran status for a given person with an api key.',
    docSources: [
      {
        openApiUrl: `${OPEN_API_SPEC_HOST}/services/veteran_confirmation/docs/v0/api`,
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
    description:
      'Confirm Veteran status for a given person, or get a Veteran’s service history or disability rating.',
    docSources: [
      {
        openApiUrl: `${OPEN_API_SPEC_HOST}/services/veteran_verification/docs/v0/veteran_verification`,
      },
    ],
    enabledByDefault: true,
    name: 'Veteran Verification API',
    oAuth: true,
    releaseNotes: VeteranVerificationReleaseNotes,
    trustedPartnerOnly: false,
    urlFragment: 'veteran_verification',
    vaInternalOnly: false,
  },
];

export default verificationApis;
