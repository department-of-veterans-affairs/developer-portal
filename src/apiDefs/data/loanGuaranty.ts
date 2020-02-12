import { IApiDescription } from '../schema';

const swaggerHost : string = process.env.REACT_APP_VETSGOV_SWAGGER_API!;
const loanGuarantyApis : IApiDescription[] = [
  {
    description: 'Manage VA Home Loans',
    docSources: [
      {
        openApiUrl: `${swaggerHost}/services/loan_guaranty/docs/v1/api`,
      },
    ],
    enabledByDefault: false,
    name: 'Loan Guaranty',
    urlFragment: 'loan_guaranty',
    vaInternalOnly: false,
    trustedPartnerOnly: true,
  },
];

export default loanGuarantyApis;
