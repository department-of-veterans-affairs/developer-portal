import {
  benefitsContent,
  BenefitsIntakeReleaseNotes,
  ClaimsReleaseNotes,
  LoanGuarantyReleaseNotes,
  ClaimsAttributesReleaseNotes,
} from '../../content/apiDocs/benefits';
import { OPEN_API_SPEC_HOST } from '../../types/constants';
import { APIDescription } from '../schema';

const benefitsApis: APIDescription[] = [
  {
    description: 'Submit and track claims',
    docSources: [
      {
        metadataUrl: `${OPEN_API_SPEC_HOST}/services/claims/metadata`,
        openApiUrl: `${OPEN_API_SPEC_HOST}/services/claims/docs/v0/api`,
      },
    ],
    enabledByDefault: true,
    name: 'Benefits Claims',
    oAuth: true,
    oAuthInfo: {
      baseAuthPath: '/oauth2/claims/v1',
      scopes: ['profile', 'openid', 'offline_access', 'claim.read', 'claim.write'],
    },
    releaseNotes: ClaimsReleaseNotes,
    trustedPartnerOnly: false,
    urlFragment: 'claims',
    vaInternalOnly: false,
    veteranRedirect: benefitsContent.veteranRedirect,
  },
  {
    description: 'Submit PDF claims',
    docSources: [
      {
        metadataUrl: `${OPEN_API_SPEC_HOST}/services/vba_documents/metadata`,
        openApiUrl: `${OPEN_API_SPEC_HOST}/services/vba_documents/docs/v0/api`,
      },
    ],
    enabledByDefault: true,
    name: 'Benefits Intake',
    releaseNotes: BenefitsIntakeReleaseNotes,
    trustedPartnerOnly: false,
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
    name: 'Loan Guaranty',
    releaseNotes: LoanGuarantyReleaseNotes,
    trustedPartnerOnly: true,
    urlFragment: 'loan_guaranty',
    vaInternalOnly: false,
  },
  {
    description: 'Improve claim routing',
    docSources: [
      {
        openApiUrl: `${OPEN_API_SPEC_HOST}/internal/docs/claims-attributes/v1/oas.json`,
      },
    ],
    enabledByDefault: true,
    name: 'Claims Attributes',
    releaseNotes: ClaimsAttributesReleaseNotes,
    trustedPartnerOnly: false,
    urlFragment: 'claims_attributes',
    vaInternalOnly: false,
  },
];

export default benefitsApis;
