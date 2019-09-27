import { IApiDescription } from './schema';

// TODO swagger host will be caseflow
const swaggerHost : string = process.env.REACT_APP_VETSGOV_SWAGGER_API!;
const appealsApis : IApiDescription[] = [
  {
    description: 'The Decision Reviews API allows you to interact with a Veteran’s Decision Review requests, also known as benefit appeals.',
    docSources: [
      {
        // TODO match these to what's listed in Kong
        metadataUrl: `${swaggerHost}/services/vba_documents/metadata`,
        openApiUrl: `${swaggerHost}/services/vba_documents/docs/v0/api`,
      },
    ],
    name: 'Decision Reviews API',
    // urlFragment: 'benefits',
    urlFragment: 'decision_reviews', // TODO why does this value produce no content?
    vaInternalOnly: true,
  },
];

export default appealsApis;
