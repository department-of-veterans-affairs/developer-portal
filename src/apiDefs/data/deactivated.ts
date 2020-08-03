import { IApiDescription } from "../schema";

import {
  ArgonautReleaseNotes,
  UrgentCareApiIntro,
  UrgentCareReleaseNotes,
} from '../../content/apiDocs/health';

const swaggerHost : string = process.env.REACT_APP_VETSGOV_SECONDARY_SWAGGER_API!;
const deactivatedApis : IApiDescription[] = [
  {
    description: 'Both the legacy API endpoints and this legacy documentation will no longer be accessible beginning Oct 1, 2019.',
    docSources: [
      {
        openApiUrl: `${swaggerHost}/services/argonaut/v0/openapi.json`,
      },
    ],
    enabledByDefault: true,
    name: 'Veterans Health API (Legacy)',
    oAuth: true,
    releaseNotes: ArgonautReleaseNotes,
    trustedPartnerOnly: false,
    urlFragment: 'argonaut',
    vaInternalOnly: false,
  },
  {
    description: "The VA's Health Urgent Care Eligibility API supports industry standards (e.g., Fast Healthcare Interoperability Resources [FHIR]) and provides access to a Veteran's urgent care eligibility status.",
    docSources: [
      {
        apiIntro: UrgentCareApiIntro,
        openApiUrl: `${swaggerHost}/services/fhir/v0/r4/openapi.json`,
      },
    ],
    enabledByDefault: true,
    name: 'Urgent Care Eligibility API (FHIR)',
    oAuth: true,
    releaseNotes: UrgentCareReleaseNotes,
    trustedPartnerOnly: false,
    urlFragment: 'urgent_care',
    vaInternalOnly: false,
  },
];

export default deactivatedApis;
