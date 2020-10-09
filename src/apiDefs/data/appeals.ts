import {
  AppealsStatusReleaseNotes,
  DecisionReviewReleaseNotes,
} from '../../content/apiDocs/appeals';
import { OPEN_API_SPEC_HOST } from '../../types/constants';
import { APIDescription } from '../schema';

const appealsApis: APIDescription[] = [
  {
    description:
      'Allows retrieval of all decision review request statuses (both legacy and AMA). Statuses are read only.',
    docSources: [
      {
        metadataUrl: `${OPEN_API_SPEC_HOST}/services/appeals/appeals_status/metadata`,
        openApiUrl: `${OPEN_API_SPEC_HOST}/services/appeals/docs/v0/api`,
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
    description:
      'Allows submission, management, and retrieval of decision review requests and details such as statuses in accordance with the AMA.',
    docSources: [
      {
        metadataUrl: `${OPEN_API_SPEC_HOST}/services/appeals/decision_reviews/metadata`,
        openApiUrl: `${OPEN_API_SPEC_HOST}/services/appeals/docs/v1/decision_reviews`,
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
