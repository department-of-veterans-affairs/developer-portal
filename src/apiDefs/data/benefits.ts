import {
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
    releaseNotes: ClaimsReleaseNotes,
    trustedPartnerOnly: false,
    urlFragment: 'claims',
    vaInternalOnly: false,
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
    description: 'Identify special attributes of claims',
    docSources: [
      {
        openApiUrl:
          'https://gist.githubusercontent.com/rtravitz/599f6d35e4a763d85e2a1f49f8d031a3/raw/e0470da0ef1b6cb1e5d3a99f09c9d60638f29211/claims-attributes.json',
      },
    ],
    enabledByDefault: false,
    name: 'Claims Attributes',
    releaseNotes: ClaimsAttributesReleaseNotes,
    trustedPartnerOnly: false,
    urlFragment: 'claims_attributes',
    vaInternalOnly: false,
  },
];

export default benefitsApis;
