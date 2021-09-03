import {
  benefitsContent,
  BenefitsIntakeReleaseNotes,
  ClaimsReleaseNotes,
  LoanGuarantyReleaseNotes,
  ClaimsAttributesReleaseNotes,
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
        metadataUrl: `${OPEN_API_SPEC_HOST}/services/claims/metadata`,
        openApiUrl: `${OPEN_API_SPEC_HOST}/services/claims/docs/v0/api`,
      },
    ],
    enabledByDefault: true,
    lastProdAccessStep: ProdAccessFormSteps.Four,
    name: 'Benefits Claims API',
    oAuth: true,
    oAuthInfo: {
      baseAuthPath: '/oauth2/claims/v1',
      scopes: ['profile', 'openid', 'offline_access', 'claim.read', 'claim.write'],
    },
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
        metadataUrl: `${OPEN_API_SPEC_HOST}/services/vba_documents/metadata`,
        openApiUrl: `${OPEN_API_SPEC_HOST}/services/vba_documents/docs/v2/api`,
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
  {
    altID: 'claimsAttributes',
    description: 'Improve claim routing',
    docSources: [
      {
        openApiUrl: `${OPEN_API_SPEC_HOST}/internal/docs/claims-attributes/v1/openapi.json`,
      },
    ],
    enabledByDefault: false,
    lastProdAccessStep: ProdAccessFormSteps.Three,
    name: 'Claims Attributes API',
    openData: false,
    releaseNotes: ClaimsAttributesReleaseNotes,
    urlFragment: 'claims_attributes',
    vaInternalOnly: false,
  },
];

export default benefitsApis;
