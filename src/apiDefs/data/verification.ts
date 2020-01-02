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
    name: 'Address Validation',
    urlFragment: 'address_validation',
    vaInternalOnly: true,
  },
  {
    description: "Confirm a Veteran's status, get a Veteran's disability rating, or get a Veteran's service history",
    docSources: [
      {
        openApiUrl: `${swaggerHost}/services/veteran_verification/docs/v0/metadata`,
      },
    ],
    enabledByDefault: true,
    name: 'Veteran Verification',
    urlFragment: 'veteran_verification',
    vaInternalOnly: false,
  },
];

export default verificationApis;
