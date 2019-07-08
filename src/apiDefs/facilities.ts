import { IApiDescription } from '.';

const swaggerHost : string = process.env.REACT_APP_VETSGOV_SWAGGER_API!;

const facilitiesApis : IApiDescription[] = [
  {
    docSources: [
      {
        metadataUrl: `${swaggerHost}/services/va_facilities/metadata`,
        openApiUrl: `${swaggerHost}/services/va_facilities/docs/v0/api`,
      },
    ],
    name: 'VA Facilities API',
    shortDescription: "VA Facilities",
    urlFragment: 'facilities',
    vaInternalOnly: false,
  },
];

export default facilitiesApis;
