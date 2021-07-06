import { vaFormsContent, VAFormsReleaseNotes } from '../../content/apiDocs/vaForms';
import { OPEN_API_SPEC_HOST } from '../../types/constants';
import { APIDescription } from '../schema';

const vaFormsApis: APIDescription[] = [
  {
    description: 'Look up VA forms and check for new versions.',
    docSources: [
      {
        openApiUrl: `${OPEN_API_SPEC_HOST}/internal/docs/forms/v0/openapi.json`,
      },
    ],
    enabledByDefault: true,
    name: 'VA Forms API',
    releaseNotes: VAFormsReleaseNotes,
    trustedPartnerOnly: false,
    urlFragment: 'vaForms',
    vaInternalOnly: false,
    veteranRedirect: vaFormsContent.veteranRedirect,
  },
];

export default vaFormsApis;
