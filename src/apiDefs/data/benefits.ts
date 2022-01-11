import {
  benefitsContent,
  BenefitsIntakeReleaseNotes,
  BenefitsRefDataReleaseNotes,
  ClaimsReleaseNotes,
  LoanGuarantyReleaseNotes,
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
        productionAud: '',
        sandboxAud: '',
        scopes: ['profile', 'openid', 'offline_access', 'claim.read', 'claim.write'],
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
  {
    description: 'Manage VA Home Loans',
    docSources: [
      {
        openApiUrl: `${OPEN_API_SPEC_HOST}/services/loan_guaranty/docs/v1/api`,
      },
    ],
    enabledByDefault: true,
    lastProdAccessStep: ProdAccessFormSteps.Three,
    name: 'Loan Guaranty API',
    openData: false,
    releaseNotes: LoanGuarantyReleaseNotes,
    urlFragment: 'loan_guaranty',
    /**
     * technically Loan Guaranty is what's known as "trusted partner only", but the business case
     * + UI for trusted partner only APIs is currently not developed and has the same functionality
     * as internal only APIs, so we use the same property.
     *
     * see this commit for when trusted partner only was represented in the source code:
     * https://github.com/department-of-veterans-affairs/developer-portal/tree/742c629534dc9ee17bb9ba73a20406a3a05cd59d
     */
    vaInternalOnly: true,
  },
];

export default benefitsApis;
