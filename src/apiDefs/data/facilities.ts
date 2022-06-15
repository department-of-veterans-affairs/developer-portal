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
        metadataUrl: `${OPEN_API_SPEC_HOST}/internal/docs/facilities/metadata.json`,
        openApiUrl: `${OPEN_API_SPEC_HOST}/internal/docs/facilities/v0/openapi.json`,
      },
    ],
    enabledByDefault: true,
    lastProdAccessStep: ProdAccessFormSteps.Two,
    name: 'VA Facilities API',
    openData: true,
    releaseNotes: FacilitiesReleaseNotes,
    urlFragment: 'facilities',
    veteranRedirect: facilitiesContent.veteranRedirect,
  },
];

export default facilitiesApis;
