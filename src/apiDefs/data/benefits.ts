import {
  benefitsContent,
  BenefitsIntakeReleaseNotes,
  BenefitsRefDataReleaseNotes,
  ClaimsReleaseNotes,
} from '../../content/apiDocs/benefits';
import { OPEN_API_SPEC_HOST } from '../../types/constants';
import { APIDescription, ProdAccessFormSteps } from '../schema';

const benefitsApis: APIDescription[] = [
  {
    // adding an altID to match keys need on the backend for signup
    altID: 'claims',
    description: 'Submit and track claims',
    docSources: [
      {
        metadataUrl: `${OPEN_API_SPEC_HOST}/internal/docs/benefits-claims/metadata.json`,
        openApiUrl: `${OPEN_API_SPEC_HOST}/internal/docs/benefits-claims/v0/openapi.json`,
      },
    ],
    enabledByDefault: true,
    lastProdAccessStep: ProdAccessFormSteps.Four,
    name: 'Benefits Claims API',
    oAuth: true,
    oAuthInfo: {
      acgInfo: {
        baseAuthPath: '/oauth2/claims/v1',
        scopes: ['profile', 'openid', 'offline_access', 'claim.read', 'claim.write'],
      },
      ccgInfo: {
        baseAuthPath: '/oauth2/claims/system/v1',
        productionAud: 'ausajojxqhTsDSVlA297',
        sandboxAud: 'ausdg7guis2TYDlFe2p7',
        scopes: ['claim.read', 'claim.write'],
      },
    },
    oAuthTypes: ['AuthorizationCodeGrant', 'ClientCredentialsGrant'],
    openData: false,
    releaseNotes: ClaimsReleaseNotes,
    urlFragment: 'claims',
    vaInternalOnly: false,
    veteranRedirect: benefitsContent.veteranRedirect,
  },
  {
    altID: 'benefits',
    description: 'Submit PDF claims',
    docSources: [
      {
        metadataUrl: `${OPEN_API_SPEC_HOST}/internal/docs/benefits-intake/metadata.json`,
        openApiUrl: `${OPEN_API_SPEC_HOST}/internal/docs/benefits-intake/v1/openapi.json`,
      },
    ],
    enabledByDefault: true,
    lastProdAccessStep: ProdAccessFormSteps.Three,
    name: 'Benefits Intake API',
    openData: false,
    releaseNotes: BenefitsIntakeReleaseNotes,
    urlFragment: 'benefits',
    vaInternalOnly: false,
    veteranRedirect: benefitsContent.veteranRedirect,
  },
  {
    altID: 'benefitsReferenceData',
    description: 'Look up data and codes for VA benefits claims',
    docSources: [
      {
        metadataUrl: `${OPEN_API_SPEC_HOST}/internal/docs/benefits-reference-data/metadata.json`,
        openApiUrl: `${OPEN_API_SPEC_HOST}/internal/docs/benefits-reference-data/v1/openapi.json`,
      },
    ],
    enabledByDefault: true,
    lastProdAccessStep: ProdAccessFormSteps.Two,
    name: 'Benefits Reference Data API',
    openData: true,
    releaseNotes: BenefitsRefDataReleaseNotes,
    urlFragment: 'benefits_reference_data',
    vaInternalOnly: false,
    veteranRedirect: benefitsContent.veteranRedirect,
  },
];

export default benefitsApis;
