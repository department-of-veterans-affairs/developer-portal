import { FacilitiesReleaseNotes } from '../../content/apiDocs/facilities';
import { IApiDescription } from '../schema';

const swaggerHost : string = process.env.REACT_APP_VETSGOV_SWAGGER_API!;
const facilitiesApis : IApiDescription[] = [
  {
    description: "VA Facilities",
    docSources: [
      {
        openApiUrl: `${swaggerHost}/services/va_facilities/docs/v0/api`,
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
