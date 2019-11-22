import { IApiDescription } from '../schema';

const swaggerHost: string = process.env.REACT_APP_VETSGOV_SWAGGER_API!;
const vaFormsApis: IApiDescription[] = [
  {
    description: 'Look up VA forms and check for new versions.',
    docSources: [
      {
        metadataUrl: `${swaggerHost}/services/va_forms/metadata`,
        openApiUrl: `${swaggerHost}/services/va_forms/docs/v0/api`,
      },
    ],
    enabledByDefault: true,
    name: 'VA Forms API',
    urlFragment: 'vaForms',
    vaInternalOnly: false,
  },
];

export default vaFormsApis;
