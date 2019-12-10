/*
  Note the use of the secondary swagger api instead of the primary for openApiUrl. Health APIs do not have a
  staging environment setup, as such we can only use `dev-api.va.gov` or `api.va.gov` for the openApiUrl host.
  The primary swagger api is tied to the environment. The secondary swagger api always points to production.
  Using the primary swagger api would break staging. The swagger url is shown in the UI. In order to avoid the
  confusion of having a `dev-api.va.gov` url shown in production `api.va.gov` (the secondary swagger api) is
  used in all developer portal environments for health documentation.
*/

import * as moment from 'moment';

import {
  CommunityCareApiIntro,
  FhirArgonautApiIntro,
  FhirDSTU2ApiIntro,
  FhirR4ApiIntro,
  HealthArgonautPostDeprecation,
  HealthArgonautPreDeprecation,
  UrgentCareApiIntro,
} from '../../content/apiDocs';
import { IApiDescription } from "../schema";

const swaggerHost : string = process.env.REACT_APP_VETSGOV_SECONDARY_SWAGGER_API!;
const argonautDeprecatedDesc = 'Both the legacy API endpoints and this legacy documentation will no longer be accessible beginning Oct 1, 2019.';
const argonautDeprecationDate = moment('01 Oct 2019 00:00 EDT');
const isArgonautDeprecated = moment().isAfter(argonautDeprecationDate);

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
    urlFragment: 'community_care',
    vaInternalOnly: false,
  },
  {
    description: "The VA's Health Urgent Care Eligibility API supports industry standards (e.g., Fast Healthcare Interoperability Resources [FHIR]) and provides access to a Veteran's urgent care eligibility status.",
    docSources: [
      {
        apiIntro: UrgentCareApiIntro,
        openApiUrl: `${swaggerHost}/services/fhir/v0/r4/openapi.json`,
      },
    ],
    enabledByDefault: true,
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
        openApiUrl: `${swaggerHost}/services/fhir/v0/argonaut/data-query/openapi.json`,
      },
      {
        apiIntro: FhirR4ApiIntro,
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
    urlFragment: 'fhir',
    vaInternalOnly: false,
  },
  {
    // see the RFC 2822 date format section here: https://momentjs.com/docs/#/parsing/string-format/
    deprecated: argonautDeprecationDate,
    deprecationContent: isArgonautDeprecated ? HealthArgonautPostDeprecation : HealthArgonautPreDeprecation,
    description: isArgonautDeprecated ? '' : argonautDeprecatedDesc,
    docSources: [
      {
        openApiUrl: `${swaggerHost}/services/argonaut/v0/openapi.json`,
      },
    ],
    enabledByDefault: true,
    name: 'Veterans Health API (Legacy)',
    urlFragment: 'argonaut',
    vaInternalOnly: false,
  },
];

export default healthApis;
