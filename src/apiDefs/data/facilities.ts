import { FacilitiesReleaseNotes } from '../../content/apiDocs/facilities';
import { OPEN_API_SPEC_HOST } from '../../types/constants';
import { APIDescription } from '../schema';

const facilitiesApis: APIDescription[] = [
  {
    description: 'VA Facilities',
    docSources: [
      {
        openApiUrl: `${OPEN_API_SPEC_HOST}/services/va_facilities/docs/v0/api`,
      },
    ],
    enabledByDefault: true,
    name: 'VA Facilities API',
    releaseNotes: FacilitiesReleaseNotes,
    trustedPartnerOnly: false,
    urlFragment: 'facilities',
    vaInternalOnly: false,
  },
];

export default facilitiesApis;
