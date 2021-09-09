import { vaFormsContent, VAFormsReleaseNotes } from '../../content/apiDocs/vaForms';
import { OPEN_API_SPEC_HOST } from '../../types/constants';
import { APIDescription, ProdAccessFormSteps } from '../schema';

const vaFormsApis: APIDescription[] = [
  {
    // adding an altID to match keys need on the backend for signup
    altID: 'vaForms',
    description: 'Look up VA forms and check for new versions.',
    docSources: [
      {
        metadataUrl: `${OPEN_API_SPEC_HOST}/internal/docs/forms/metadata.json`,
        openApiUrl: `${OPEN_API_SPEC_HOST}/internal/docs/forms/v0/openapi.json`,
      },
    ],
    enabledByDefault: true,
    lastProdAccessStep: ProdAccessFormSteps.Two,
    name: 'VA Forms API',
    openData: true,
    releaseNotes: VAFormsReleaseNotes,
    urlFragment: 'vaForms',
    vaInternalOnly: false,
    veteranRedirect: vaFormsContent.veteranRedirect,
  },
];

export default vaFormsApis;
