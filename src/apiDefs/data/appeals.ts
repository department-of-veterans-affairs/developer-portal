import { AppealsReleaseNotes } from '../../content/apiDocs/benefits';
import { IApiDescription } from '../schema';

const swaggerHost : string = process.env.REACT_APP_VETSGOV_SWAGGER_API!;
const appealsApis : IApiDescription[] = [
  {
    description: 'The Decision Reviews API allows you to interact with a Veteran’s Decision Review requests, also known as benefit appeals.',
    docSources: [
      {
        // metadataUrl: ,// metadata endpoint is not yet exposed
        openApiUrl: `${swaggerHost}/services/appeals/docs/v1/decision_reviews`,
      },
    ],
    enabledByDefault: false,
    name: 'Decision Reviews API',
    releaseNotes: AppealsReleaseNotes,
    trustedPartnerOnly: false,
    urlFragment: 'decision_reviews',
    vaInternalOnly: true,
  },
];

export default appealsApis;
