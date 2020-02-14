import { IApiDescription } from '../schema';

const swaggerHost: string = process.env.REACT_APP_VETSGOV_SWAGGER_API!;
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
    urlFragment: 'address_validation',
    vaInternalOnly: true,
    trustedPartnerOnly: false,
  },
  {
    description: "Confirm Veteran status for a given person with an api key.",
    docSources: [
      {
        openApiUrl: `${swaggerHost}/services/veteran_confirmation/docs/v0/api`,
      },
    ],
    enabledByDefault: true,
    name: 'Veteran Confirmation API',
    urlFragment: 'veteran_confirmation',
    vaInternalOnly: false,
    trustedPartnerOnly: false,
  },
  {
    description: "Confirm Veteran status for a given person, or get a Veteran’s service history or disability rating.",
    docSources: [
      {
        openApiUrl: `${swaggerHost}/services/veteran_verification/docs/v0/veteran_verification`,
      },
    ],
    enabledByDefault: true,
    name: 'Veteran Verification API',
    oAuth: true,
    urlFragment: 'veteran_verification',
    vaInternalOnly: false,
    trustedPartnerOnly: false,
  },
];

export default verificationApis;
