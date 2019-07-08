import { IApiDescription } from '.';

const swaggerHost : string = process.env.REACT_APP_VETSGOV_SWAGGER_API!;

const benefitsApis : IApiDescription[] = [
  {
    docSources: [
      {
        metadataUrl: `${swaggerHost}/services/vba_documents/metadata`,
        openApiUrl: `${swaggerHost}/services/vba_documents/docs/v0/api`,
      },
    ],
    name: 'Benefits Intake',
    shortDescription: 'Submit PDF claims',
    urlFragment: 'benefits',
    vaInternalOnly: false,
  },
  {
    docSources: [
      {
        openApiUrl: `${swaggerHost}/services/appeals/docs/v0/api`,
      },
    ],
    name: 'Appeals Status',
    shortDescription: 'Track appeals',
    urlFragment: 'appeals',
    vaInternalOnly: true,
  },
  {
    docSources: [
      {
        metadataUrl: `${swaggerHost}/services/claims/metadata`,
        openApiUrl: `${swaggerHost}/services/claims/docs/v0/api`,
      },
    ],
    name: 'Benefits Claims',
    shortDescription: 'Submit and track claims',
    urlFragment: 'claims',
    vaInternalOnly: true,
  },
  {
    docSources: [
      {
        openApiUrl: `${swaggerHost}/services/loan_guaranty/docs/v1/api`,
      },
    ],
    name: 'Loan Guaranty',
    shortDescription: 'Manage VA Home Loans',
    urlFragment: 'loan_guaranty',
    vaInternalOnly: false,
  },
];

export default benefitsApis;
