/*
  Note the use of the secondary swagger api instead of the primary for openApiUrl. Health APIs do not have a
  staging environment setup, as such we can only use `sandbox-api.va.gov` or `api.va.gov` for the openApiUrl host.
  The primary swagger api is tied to the environment. The secondary swagger api always points to production.
  Using the primary swagger api would break staging. The swagger url is shown in the UI. In order to avoid the
  confusion of having a `sandbox-api.va.gov` url shown in production `api.va.gov` (the secondary swagger api) is
  used in all developer portal environments for health documentation.
*/

// import * as moment from 'moment';
import {
  // ArgonautReleaseNotes,
  CommunityCareApiIntro,
  CommunityCareReleaseNotes,
  FhirApiReleaseNotes,
  FhirArgonautApiIntro,
  FhirDSTU2ApiIntro,
  // HealthArgonautDeactivationNotice,
  // HealthArgonautDeprecationNotice,
  // UrgentCareApiIntro,
  // UrgentCareDeactivationNotice,
  // UrgentCareDeprecationNotice,
  // UrgentCareReleaseNotes,
} from '../../content/apiDocs/health';
import { IApiDescription } from "../schema";

const swaggerHost : string = process.env.REACT_APP_VETSGOV_SECONDARY_SWAGGER_API!;
const healthApis : IApiDescription[] = [
  {
    description: "VA's Community Care Eligibility API utilizes VA's Facility API, VA's Enrollment & Eligibility system and others to satisfy requirements found in the VA's MISSION Act of 2018.",
    docSources: [
      {
        apiIntro: CommunityCareApiIntro,
        openApiUrl: `${swaggerHost}/services/community-care/v0/eligibility/openapi.json`,
      },
    ],
    enabledByDefault: true,
    name: 'Community Care Eligibility API',
    oAuth: true,
    releaseNotes: CommunityCareReleaseNotes,
    trustedPartnerOnly: false,
    urlFragment: 'community_care',
    vaInternalOnly: false,
  },
  {
    description: 'Use the OpenID Connect and SMART on FHIR standards to allow Veterans to authorize third-party applications to access data on their behalf.',
    docSources: [
      {
        apiIntro: FhirArgonautApiIntro,
        key: 'argonaut',
        label: 'Argonaut',
        openApiUrl: `${swaggerHost}/services/fhir/v0/argonaut/data-query/openapi.json`,
      },
      {
        key: 'r4',
        label: 'R4',
        openApiUrl: `${swaggerHost}/services/fhir/v0/r4/openapi.json`,
      },
      {
        apiIntro: FhirDSTU2ApiIntro,
        key: 'dstu2',
        label: 'DSTU2',
        openApiUrl: `${swaggerHost}/services/fhir/v0/dstu2/openapi.json`,
      },
    ],
    enabledByDefault: true,
    name: 'Veterans Health API (FHIR)',
    oAuth: true,
    releaseNotes: FhirApiReleaseNotes,
    tabBlurb:
      "The VA's FHIR Health APIs allow consumers to develop applications using Veteran data. Please see the tabs below for the specific FHIR implementations.",
    trustedPartnerOnly: false,
    urlFragment: 'fhir',
    vaInternalOnly: false,
  },
];

export default healthApis;
