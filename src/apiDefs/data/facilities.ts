import { IApiDescription } from '../schema';

const swaggerHost : string = process.env.REACT_APP_VETSGOV_SWAGGER_API!;
const facilitiesApis : IApiDescription[] = [
  {
    description: "VA Facilities",
    docSources: [
      {
        metadataUrl: `${swaggerHost}/services/va_facilities/metadata`,
        openApiUrl: `${swaggerHost}/services/va_facilities/docs/v0/api`,
      },
    ],
    enabledByDefault: true,
    name: 'VA Facilities API',
    urlFragment: 'facilities',
    vaInternalOnly: false,
  },
];

export default facilitiesApis;
