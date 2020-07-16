import { 
  AppealsStatusReleaseNotes,
  DecisionReviewReleaseNotes,
} from '../../content/apiDocs/appeals';
import { IApiDescription } from '../schema';

const swaggerHost : string = process.env.REACT_APP_VETSGOV_SWAGGER_API!;
const appealsApis : IApiDescription[] = [
  {
    description: 'Track appeals',
    docSources: [
      {
        metadataUrl: `${swaggerHost}/services/appeals/appeals_status/metadata`,
        openApiUrl: `${swaggerHost}/services/appeals/docs/v0/api`,
      },
    ],
    enabledByDefault: true,
    name: 'Appeals Status API',
    releaseNotes: AppealsStatusReleaseNotes,
    trustedPartnerOnly: false,
    urlFragment: 'appeals',
    vaInternalOnly: true,
  },
  {
    description: 'The Decision Reviews API allows you to interact with a Veteran’s Decision Review requests, also known as benefit appeals.',
    docSources: [
      {
        metadataUrl: `${swaggerHost}/services/appeals/decision_reviews/metadata`,
        openApiUrl: `${swaggerHost}/services/appeals/docs/v1/decision_reviews`,
      },
    ],
    enabledByDefault: true,
    name: 'Decision Reviews API',
    releaseNotes: DecisionReviewReleaseNotes,
    trustedPartnerOnly: false,
    urlFragment: 'decision_reviews',
    vaInternalOnly: true,
  },
];

export default appealsApis;
