import { facilitiesContent, FacilitiesReleaseNotes } from '../../content/apiDocs/facilities';
import { OPEN_API_SPEC_HOST } from '../../types/constants';
import { APIDescription } from '../schema';

const facilitiesApis: APIDescription[] = [
  {
    description: 'VA Facilities',
    docSources: [
      {
        openApiUrl: `${OPEN_API_SPEC_HOST}/internal/docs/facilities/v0/openapi.json`,
      },
    ],
    enabledByDefault: true,
    name: 'VA Facilities API',
    releaseNotes: FacilitiesReleaseNotes,
    trustedPartnerOnly: false,
    urlFragment: 'facilities',
    vaInternalOnly: false,
    veteranRedirect: facilitiesContent.veteranRedirect,
  },
];

export default facilitiesApis;
