/**
 * Note the use of the secondary swagger api instead of the primary for openApiUrl. Health APIs do not have a
 * staging environment setup, as such we can only use `sandbox-api.va.gov` or `api.va.gov` for the openApiUrl host.
 * The primary swagger api is tied to the environment. The secondary swagger api always points to production.
 * Using the primary swagger api would break staging. The swagger url is shown in the UI. In order to avoid the
 * confusion of having a `sandbox-api.va.gov` url shown in production `api.va.gov` (the secondary swagger api) is
 * used in all developer portal environments for health documentation.
 */

import moment from 'moment';
import { OPEN_API_SPEC_HOST } from '../../types/constants';
import {
  ArgonautReleaseNotes,
  CommunityCareReleaseNotes,
  FhirApiReleaseNotes,
  FhirArgonautApiIntro,
  FhirDSTU2ApiIntro,
  FHIRMultiOpenAPIIntro,
  HealthArgonautDeactivationNotice,
  HealthArgonautDeprecationNotice,
  UrgentCareApiIntro,
  UrgentCareDeactivationNotice,
  UrgentCareDeprecationNotice,
  UrgentCareReleaseNotes,
} from '../../content/apiDocs/health';
import { APIDescription } from '../schema';

const swaggerHost: string = process.env.REACT_APP_VETSGOV_SECONDARY_SWAGGER_API ?? '';
const healthApis: APIDescription[] = [
  {
    // adding an altID to match keys need on the backend for signup
    altID: 'communityCare',
    description:
      "VA's Community Care Eligibility API utilizes VA's Facility API, VA's Enrollment & Eligibility system and others to satisfy requirements found in the VA's MISSION Act of 2018.",
    docSources: [
      {
        openApiUrl: `${swaggerHost}/services/community-care/v0/eligibility/openapi.json`,
      },
    ],
    enabledByDefault: true,
    name: 'Community Care Eligibility API',
    oAuth: true,
    oAuthInfo: {
      baseAuthPath: '/oauth2/community-care/v1',
      scopes: [
        'profile',
        'openid',
        'offline_access',
        'launch/patient',
        'patient/CommunityCareEligibility.read',
      ],
    },
    releaseNotes: CommunityCareReleaseNotes,
    trustedPartnerOnly: false,
    urlFragment: 'community_care',
    vaInternalOnly: false,
  },
  {
    deactivationInfo: {
      deactivationContent: UrgentCareDeactivationNotice,
      deactivationDate: moment('20 Jul 2020 00:00 EDT'),
      deprecationContent: UrgentCareDeprecationNotice,
      deprecationDate: moment('13 Jul 2020 00:00 EDT'),
    },
    description:
      "The VA's Health Urgent Care Eligibility API supports industry standards (e.g., Fast Healthcare Interoperability Resources [FHIR]) and provides access to a Veteran's urgent care eligibility status.",
    docSources: [
      {
        apiIntro: UrgentCareApiIntro,
        openApiUrl: `${swaggerHost}/services/fhir/v0/r4/openapi.json`,
      },
    ],
    enabledByDefault: true,
    name: 'Urgent Care Eligibility API (FHIR)',
    oAuth: true,
    releaseNotes: UrgentCareReleaseNotes,
    trustedPartnerOnly: false,
    urlFragment: 'urgent_care',
    vaInternalOnly: false,
  },
  {
    altID: 'health',
    description:
      'Use the OpenID Connect and SMART on FHIR standards to allow Veterans to authorize third-party applications to access data on their behalf.',
    docSources: [
      {
        key: 'r4',
        label: 'R4',
        openApiUrl: `${OPEN_API_SPEC_HOST}/internal/docs/fhir-r4/v0/openapi.json`,
      },
      {
        apiIntro: FhirArgonautApiIntro,
        key: 'argonaut',
        label: 'Argonaut',
        openApiUrl: `${OPEN_API_SPEC_HOST}/internal/docs/fhir-argonaut/v0/openapi.json`,
      },
      {
        apiIntro: FhirDSTU2ApiIntro,
        key: 'dstu2',
        label: 'DSTU2',
        openApiUrl: `${OPEN_API_SPEC_HOST}/internal/docs/fhir-dstu2/v0/openapi.json`,
      },
    ],
    enabledByDefault: true,
    multiOpenAPIIntro: FHIRMultiOpenAPIIntro,
    name: 'Veterans Health API (FHIR)',
    oAuth: true,
    oAuthInfo: {
      baseAuthPath: '/oauth2/health/v1',
      scopes: [
        'profile',
        'openid',
        'offline_access',
        'launch/patient',
        'patient/AllergyIntolerance.read',
        'patient/Appointment.read',
        'patient/Condition.read',
        'patient/Device.read',
        'patient/DiagnosticReport.read',
        'patient/Immunization.read',
        'patient/Location.read',
        'patient/Medication.read',
        'patient/MedicationOrder.read',
        'patient/MedicationRequest.read',
        'patient/MedicationStatement.read',
        'patient/Observation.read',
        'patient/Organization.read',
        'patient/Patient.read',
        'patient/Practitioner.read',
        'patient/PractitionerRole.read',
        'patient/Procedure.read',
      ],
    },
    releaseNotes: FhirApiReleaseNotes,
    trustedPartnerOnly: false,
    urlFragment: 'fhir',
    vaInternalOnly: false,
  },
  {
    deactivationInfo: {
      deactivationContent: HealthArgonautDeactivationNotice,
      // see the RFC 2822 date format section here: https://momentjs.com/docs/#/parsing/string-format/
      deactivationDate: moment('01 Oct 2019 00:00 EDT'),
      deprecationContent: HealthArgonautDeprecationNotice,
      deprecationDate: moment('15 Sep 2019 00:00 EDT'),
    },
    description:
      'Both the legacy API endpoints and this legacy documentation will no longer be accessible beginning Oct 1, 2019.',
    docSources: [
      {
        openApiUrl: `${swaggerHost}/services/argonaut/v0/openapi.json`,
      },
    ],
    enabledByDefault: true,
    name: 'Veterans Health API (Legacy)',
    oAuth: true,
    releaseNotes: ArgonautReleaseNotes,
    trustedPartnerOnly: false,
    urlFragment: 'argonaut',
    vaInternalOnly: false,
  },
];

export default healthApis;
