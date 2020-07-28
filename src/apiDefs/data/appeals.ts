import { 
  AppealsStatusReleaseNotes,
  DecisionReviewReleaseNotes,
} from '../../content/apiDocs/appeals';
import { IApiDescription } from '../schema';

const swaggerHost : string = process.env.REACT_APP_VETSGOV_SWAGGER_API!;
const appealsApis : IApiDescription[] = [
  {
    description: 'Allows retrieval of all decision review request statuses (both legacy and AMA). Statuses are read only.',
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
    description: 'Allows submission, management, and retrieval of decision review requests and details such as statuses in accordance with the AMA.',
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
