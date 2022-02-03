import {
  LoanGuarantyReleaseNotes,
} from '../../content/apiDocs/loanGuaranty';
import { OPEN_API_SPEC_HOST } from '../../types/constants';
import { APIDescription, ProdAccessFormSteps } from '../schema';

const loanGuarantyApis: APIDescription[] = [
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

export default loanGuarantyApis;
