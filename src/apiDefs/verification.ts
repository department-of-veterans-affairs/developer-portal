import { IApiDescription } from '.';

const swaggerHost : string = process.env.REACT_APP_VETSGOV_SWAGGER_API!;

const verificationApis : IApiDescription[] = [
  {
    docSources: [
      {
        openApiUrl: `${swaggerHost}/services/veteran_verification/docs/v0/disability_rating`,
      },
    ],
    name: 'Disability Rating',
    shortDescription: "Get a Veteran's disability rating",
    urlFragment: 'disability_rating',
    vaInternalOnly: false,
  },
  {
    docSources: [
      {
        openApiUrl: `${swaggerHost}/services/veteran_verification/docs/v0/service_history`,
      },
    ],
    name: 'Service History',
    shortDescription: "Get a Veteran's service history",
    urlFragment: 'service_history',
    vaInternalOnly: false,
  },
  {
    docSources: [
      {
        openApiUrl: `${swaggerHost}/services/veteran_verification/docs/v0/status`,
      },
    ],
    name: 'Veteran Confirmation',
    shortDescription: "Get confirmation of a Veteran's status",
    urlFragment: 'veteran_confirmation',
    vaInternalOnly: false,
  },
  {
    docSources: [
      {
        openApiUrl: `${swaggerHost}/services/address_validation/docs/v1/api`,
      },
    ],
    name: 'Address Validation',
    shortDescription: 'Provides methods to standardize and validate addresses.',
    urlFragment: 'address_validation',
    vaInternalOnly: true,
  },
];

export default verificationApis;
