import { VAFormsReleaseNotes } from '../../content/apiDocs/vaForms';
import { OPEN_API_SPEC_HOST } from '../../types/constants';
import { APIDescription } from '../schema';

const vaFormsApis: APIDescription[] = [
  {
    description: 'Look up VA forms and check for new versions.',
    docSources: [
      {
        metadataUrl: `${OPEN_API_SPEC_HOST}/services/va_forms/metadata`,
        openApiUrl: `${OPEN_API_SPEC_HOST}/services/va_forms/docs/v0/api`,
      },
    ],
    enabledByDefault: true,
    name: 'VA Forms API',
    releaseNotes: VAFormsReleaseNotes,
    trustedPartnerOnly: false,
    urlFragment: 'vaForms',
    vaInternalOnly: false,
  },
];

export default vaFormsApis;
