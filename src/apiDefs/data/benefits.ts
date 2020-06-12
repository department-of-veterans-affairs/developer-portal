import {
  AppealsReleaseNotes,
  BenefitsIntakeReleaseNotes,
  ClaimsReleaseNotes,
  LoanGuarantyReleaseNotes,
} from '../../content/apiDocs';
import { IApiDescription } from '../schema';

const swaggerHost : string = process.env.REACT_APP_VETSGOV_SWAGGER_API!;
const benefitsApis : IApiDescription[] = [
  {
    description: 'Track appeals',
    docSources: [
      {
        openApiUrl: `${swaggerHost}/services/appeals/docs/v0/api`,
      },
    ],
    enabledByDefault: true,
    name: 'Appeals Status',
    releaseNotes: AppealsReleaseNotes,
    trustedPartnerOnly: false,
    urlFragment: 'appeals',
    vaInternalOnly: true,
  },
  {
    description: 'Submit and track claims',
    docSources: [
      {
        metadataUrl: `${swaggerHost}/services/claims/metadata`,
        openApiUrl: `${swaggerHost}/services/claims/docs/v0/api`,
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
        metadataUrl: `${swaggerHost}/services/vba_documents/metadata`,
        openApiUrl: `${swaggerHost}/services/vba_documents/docs/v0/api`,
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
        openApiUrl: `${swaggerHost}/services/loan_guaranty/docs/v1/api`,
      },
    ],
    enabledByDefault: true,
    name: 'Loan Guaranty',
    releaseNotes: LoanGuarantyReleaseNotes,
    trustedPartnerOnly: true,
    urlFragment: 'loan_guaranty',
    vaInternalOnly: false,
  },
];

export default benefitsApis;
