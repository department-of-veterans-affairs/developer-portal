import { IApiDescription } from '.';

const isNewFhirApiEnabled =  process.env.REACT_APP_FHIR_API_ENABLED === 'true';

const healthApis : IApiDescription[] = [
  {
    docSources: [
      {
        openApiUrl: '',
      },
    ],
    name: 'Community Care Eligibility API',
    shortDescription: '',
    urlFragment: 'community_care',
    vaInternalOnly: false,
  },
  {
    docSources: [],
    isViewOnly: true,
    name: 'Urgent Care Eligibility API (FHIR)',
    shortDescription: 'Determine whether veterans can get urgent care, I guess???',
    urlFragment: 'urgent_care',
    vaInternalOnly: false,
  },
  {
    docSources: [
      {
        key: 'argonaut',
        label: 'Argonaut',
        openApiUrl: 'https://dev-api.va.gov/services/fhir/v0/argonaut/data-query/openapi.json',
      },
      {
        key: 'r4',
        label: 'R4',
        openApiUrl: 'https://dev-api.va.gov/services/fhir/v0/r4/openapi.json',
      },
      {
        key: 'dstu2',
        label: 'DSTU2',
        openApiUrl: 'https://dev-api.va.gov/services/fhir/v0/dstu2/openapi.json',
      },
    ],
    name: `Veterans Health API${isNewFhirApiEnabled ? '' : ' (Not Enabled)'}`,
    shortDescription: "VA's Argonaut resources",
    urlFragment: 'fhir',
    vaInternalOnly: false,
  },
  {
    docSources: [
      {
        openApiUrl: 'https://api.va.gov/services/argonaut/v0/openapi.json',
      },
    ],
    name: `${isNewFhirApiEnabled ? 'Legacy ' : ''}Veterans Health API`,
    shortDescription: "VA's Argonaut resources",
    urlFragment: 'argonaut',
    vaInternalOnly: false,
  },
];

export default healthApis;