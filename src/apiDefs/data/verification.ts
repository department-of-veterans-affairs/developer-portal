import { IApiDescription } from '../schema';

const swaggerHost : string = process.env.REACT_APP_VETSGOV_SWAGGER_API!;
const verificationApis : IApiDescription[] = [
  {
    description: "Get a Veteran's disability rating",
    docSources: [
      {
        openApiUrl: `${swaggerHost}/services/veteran_verification/docs/v0/disability_rating`,
      },
    ],
    enabledByDefault: true,
    name: 'Disability Rating',
    urlFragment: 'disability_rating',
    vaInternalOnly: false,
  },
  {
    description: "Get a Veteran's service history",
    docSources: [
      {
        openApiUrl: `${swaggerHost}/services/veteran_verification/docs/v0/service_history`,
      },
    ],
    enabledByDefault: true,
    name: 'Service History',
    urlFragment: 'service_history',
    vaInternalOnly: false,
  },
  {
    description: "Get confirmation of a Veteran's status",
    docSources: [
      {
        openApiUrl: `${swaggerHost}/services/veteran_verification/docs/v0/status`,
      },
    ],
    enabledByDefault: true,
    name: 'Veteran Confirmation',
    urlFragment: 'veteran_confirmation',
    vaInternalOnly: false,
  },
  {
    description: 'Provides methods to standardize and validate addresses.',
    docSources: [
      {
        openApiUrl: `${swaggerHost}/services/address_validation/docs/v1/api`,
      },
    ],
    enabledByDefault: true,
    name: 'Address Validation',
    urlFragment: 'address_validation',
    vaInternalOnly: true,
  },
];

export default verificationApis;
