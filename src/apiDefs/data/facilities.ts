import { facilitiesContent, FacilitiesReleaseNotes } from '../../content/apiDocs/facilities';
import { OPEN_API_SPEC_HOST } from '../../types/constants';
import { APIDescription, ProdAccessFormSteps } from '../schema';

const facilitiesApis: APIDescription[] = [
  {
    // adding an altID to match keys need on the backend for signup
    altID: 'facilities',
    description: 'VA Facilities',
    docSources: [
      {
        openApiUrl: `${OPEN_API_SPEC_HOST}/internal/docs/facilities/v0/openapi.json`,
      },
    ],
    enabledByDefault: true,
    name: 'VA Facilities API',
    openData: true,
    prodAccessSteps: ProdAccessFormSteps.BasicInformation,
    releaseNotes: FacilitiesReleaseNotes,
    urlFragment: 'facilities',
    vaInternalOnly: false,
    veteranRedirect: facilitiesContent.veteranRedirect,
  },
];

export default facilitiesApis;
