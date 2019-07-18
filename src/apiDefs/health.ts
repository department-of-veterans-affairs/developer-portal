import { IApiDescription } from ".";
import {
  CommunityCareApiIntro,
  FhirArgonautApiIntro,
  FhirDSTU2ApiIntro,
  FhirR4ApiIntro,
  HealthArgonautDeprecation,
  UrgentCareApiIntro,
} from "../content/apiDocs";

const isNewFhirApiEnabled =  process.env.REACT_APP_FHIR_API_ENABLED === 'true';
const argonautDeprecatedDesc = 'Both the legacy API endpoints and this legacy documentation will no longer be accessible beginning Oct 1, 2019.';
const argonautDesc = "VA's Argonaut resources";
const healthApis : IApiDescription[] = [
  {
    description: "VA's Community Care Eligibility API utilizes VA's Facility API, VA's Enrollment & Eligibility system and others to satisfy requirements found in the VA's MISSION Act of 2018.",
    docSources: [
      {
        apiIntro: CommunityCareApiIntro,
        openApiUrl: 'https://api.va.gov/services/community-care/v0/eligibility/openapi.json',
      },
    ],
    name: 'Community Care Eligibility API',
    urlFragment: 'community_care',
    vaInternalOnly: false,
  },
  {
    description: "The VA's Health Urgent Care Eligibility API supports industry standars (e.g., Fast Healthcare Interoperability Resources [FHIR]) and provides access to a Veteran's urgent care eligibility status.",
    docSources: [
      {
        apiIntro: UrgentCareApiIntro,
        openApiUrl: 'https://api.va.gov/services/fhir/v0/r4/openapi.json',
      },
    ],
    name: 'Urgent Care Eligibility API (FHIR)',
    urlFragment: 'urgent_care',
    vaInternalOnly: false,
  },
  {
    description: 'Use the OpenID Connect and SMART on FHIR standards to allow Veterans to authorize third-party applications to access data on their behalf.',
    docSources: [
      {
        apiIntro: FhirArgonautApiIntro,
        key: 'argonaut',
        label: 'Argonaut',
        openApiUrl: 'https://api.va.gov/services/fhir/v0/argonaut/data-query/openapi.json',
      },
      {
        apiIntro: FhirR4ApiIntro,
        key: 'r4',
        label: 'R4',
        openApiUrl: 'https://api.va.gov/services/fhir/v0/r4/openapi.json',
      },
      {
        apiIntro: FhirDSTU2ApiIntro,
        key: 'dstu2',
        label: 'DSTU2',
        openApiUrl: 'https://api.va.gov/services/fhir/v0/dstu2/openapi.json',
      },
    ],
    name: 'Veterans Health API (FHIR)',
    urlFragment: 'fhir',
    vaInternalOnly: false,
  },
  {
    deprecationContent: isNewFhirApiEnabled ? HealthArgonautDeprecation : undefined,
    description: isNewFhirApiEnabled ? argonautDeprecatedDesc : argonautDesc,
    docSources: [
      {
        openApiUrl: 'https://api.va.gov/services/argonaut/v0/openapi.json',
      },
    ],
    name: `Veterans Health API${isNewFhirApiEnabled ? ' (Legacy)' : ''}`,
    urlFragment: 'argonaut',
    vaInternalOnly: false,
  },
];

export default healthApis;
