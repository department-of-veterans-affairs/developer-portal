import {
  LoanGuarantyReleaseNotes,
  GuarantyRemittanceReleaseNotes,
} from '../../content/apiDocs/loanGuaranty';
import { OPEN_API_SPEC_HOST } from '../../types/constants';
import { APIDescription, ProdAccessFormSteps, VaInternalOnly } from '../schema';

const loanGuarantyApis: APIDescription[] = [
  {
    altID: 'lgyGuarantyRemittance',
    description: 'Lets lenders automate parts of the mortgage post-closing process.',
    docSources: [
      {
        metadataUrl: `${OPEN_API_SPEC_HOST}/internal/docs/lgy-remittance/metadata.json`,
        openApiUrl: `${OPEN_API_SPEC_HOST}/internal/docs/lgy-remittance/v0/openapi.json`,
      },
    ],
    enabledByDefault: true,
    lastProdAccessStep: ProdAccessFormSteps.Four,
    name: 'Guaranty Remittance API',
    oAuth: true,
    oAuthInfo: {
      ccgInfo: {
        baseAuthPath: '/oauth2/loan-guaranty/system/v1',
        productionAud: 'ausbts6ndxFQDyeBM297',
        sandboxAud: 'auseavl6o5AjGZr2n2p7',
        scopes: [
          'system.loan-remittance.read',
          'system.loan-remittance.write',
          'system.remediation-evidence.write',
        ],
      },
    },
    oAuthTypes: ['ClientCredentialsGrant'],
    openData: false,
    releaseNotes: GuarantyRemittanceReleaseNotes,
    urlFragment: 'lgy_guaranty_remittance',
    vaInternalOnly: VaInternalOnly.FlagOnly,
  },
  {
    description: 'Use the Loan Guaranty API to Manage VA Home Loans.',
    docSources: [
      {
        openApiUrl: `${OPEN_API_SPEC_HOST}/internal/docs/loan_guaranty_property/v1/openapi.json`,
      },
    ],
    enabledByDefault: true,
    lastProdAccessStep: ProdAccessFormSteps.Three,
    name: 'Loan Guaranty API',
    oAuth: false,
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
    vaInternalOnly: VaInternalOnly.StrictlyInternal,
  },
];

export default loanGuarantyApis;
