import * as moment from 'moment';
import { IApiDescription } from "../schema";

import {
  UrgentCareApiIntro,
  UrgentCareDeactivationNotice,
  UrgentCareDeprecationNotice,
  UrgentCareReleaseNotes,
} from '../../content/apiDocs/health';

const swaggerHost : string = process.env.REACT_APP_VETSGOV_SECONDARY_SWAGGER_API!;
const deactivatedApis : IApiDescription[] = [
  {
    deactivationInfo: {
      deactivationContent: UrgentCareDeactivationNotice,
      deactivationDate: moment('20 Jul 2020 00:00 EDT'),
      deprecationContent: UrgentCareDeprecationNotice,
      deprecationDate: moment('13 Jul 2020 00:00 EDT'),
    },
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
