import { IApiDescription } from '../schema';

// const swaggerHost : string = process.env.REACT_APP_VETSGOV_SWAGGER_API!;
const appealsApis : IApiDescription[] = [
  {
    description: 'The Decision Reviews API allows you to interact with a Veteran’s Decision Review requests, also known as benefit appeals.',
    docSources: [
      {
        // metadataUrl: ,// metadata endpoint is not yet exposed
        // openApiUrl: `${swaggerHost}/services/appeals/docs/v3/decision_reviews`,
        openApiUrl: "https://raw.githubusercontent.com/department-of-veterans-affairs/caseflow/838d3c242128d966f6e27d5536db4791a033e1c1/app/controllers/api/docs/v3/decision_reviews.yaml",
      },
    ],
    enabledByDefault: false,
    name: 'Decision Reviews API',
    urlFragment: 'decision_reviews',
    vaInternalOnly: true,
  },
];

export default appealsApis;
