import {
  AddressValidationReleaseNotes,
  VeteranConfirmationReleaseNotes,
  VeteranVerificationReleaseNotes,
} from '../../content/apiDocs/verification';
import { IApiDescription } from '../schema';

if (!process.env.REACT_APP_VETSGOV_SWAGGER_API) {
  throw new Error(
    'Developer portal environment is missing config var REACT_APP_VETSGOV_SWAGGER_API',
  );
}

const swaggerHost: string = process.env.REACT_APP_VETSGOV_SWAGGER_API;
const verificationApis: IApiDescription[] = [
  {
    description: 'Provides methods to standardize and validate addresses.',
    docSources: [
      {
        openApiUrl: `${swaggerHost}/services/address_validation/docs/v1/api`,
      },
    ],
    enabledByDefault: true,
    name: 'Address Validation API',
    oAuth: true,
    releaseNotes: AddressValidationReleaseNotes,
    trustedPartnerOnly: false,
    urlFragment: 'address_validation',
    vaInternalOnly: true,
  },
  {
    description: 'Confirm Veteran status for a given person with an api key.',
    docSources: [
      {
        openApiUrl: `${swaggerHost}/services/veteran_confirmation/docs/v0/api`,
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
        openApiUrl: `${swaggerHost}/services/veteran_verification/docs/v0/veteran_verification`,
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
