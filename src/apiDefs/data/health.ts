/**
 * Note the use of the secondary swagger api instead of the primary for openApiUrl. Health APIs do not have a
 * staging environment setup, as such we can only use `sandbox-api.va.gov` or `api.va.gov` for the openApiUrl host.
 * The primary swagger api is tied to the environment. The secondary swagger api always points to production.
 * Using the primary swagger api would break staging. The swagger url is shown in the UI. In order to avoid the
 * confusion of having a `sandbox-api.va.gov` url shown in production `api.va.gov` (the secondary swagger api) is
 * used in all developer portal environments for health documentation.
 */

import moment from 'moment';
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
    openidDocs: {
      authManageAccount: 'POST /oauth2/token HTTP/1.1\nHost: sandbox-api.va.gov',
      authPostTokenRefresh:
        "POST /oauth2/token HTTP/1.1\nHost: sandbox-api.va.gov\nContent-Type: application/x-www-form-urlencoded\nAuthorization: Basic {base64 encoded *client id* + ':' + *client secret*}\n\ngrant_type=refresh_token&refresh_token={your refresh_token}&scope={space separated scopes}",
      authPostTokenResponse200:
        'HTTP/1.1 200 OK\nContent-Type: application/json\nCache-Control: no-store\nPragma: no-cache\n\n{\n  "access_token": "SlAV32hkKG",\n  "expires_in": 3600,\n  "refresh_token": "8xLOxBtZp8",\n  "scope": "openid profile offline_access",\n  "patient": "1558538470",\n  "state": "af0ifjsldkj",\n  "token_type": "Bearer",\n}',
      authRevokeGrant:
        'DELETE /oauth2/grants HTTP/1.1\nHost: sandbox-api.va.gov\nContent-Type: application/x-www-form-urlencoded\n\n{\n  "client_id": {client_id},\n  "email": {test account email}\n}',
      authRevokeGrantError:
        'HTTP/1.1 400 Bad Request\nContent-Type: application/json\nCache-Control: no-store\nPragma: no-cache\n\n{\n  "error": "invalid_request",\n  "error_description": "Invalid email address."\n}',
      authRevokeTokenAccess:
        "POST /oauth2/revoke HTTP/1.1\nHost: sandbox-api.va.gov\nContent-Type: application/x-www-form-urlencoded\nAuthorization: Basic {base64 encoded *client id* + ':' + *client secret*}\ntoken={your access token}&token_type_hint=access_token",
      authRevokeTokenRefresh:
        "POST /oauth2/revoke HTTP/1.1\nHost: sandbox-api.va.gov\nContent-Type: application/x-www-form-urlencoded\nAuthorization: Basic {base64 encoded *client id* + ':' + *client secret*}\n\ntoken={your refresh token}&token_type_hint=refresh_token",
      authUrl:
        'https://sandbox-api.va.gov/oauth2/authorization?\n  client_id=0oa1c01m77heEXUZt2p7\n  &redirect_uri=<yourRedirectURL>\n  &response_type=code\n  &scope=profile openid offline_access launch/patient patient/CommunityCareEligibility.read\n  &state=1AOQK33KIfH2g0ADHvU1oWAb7xQY7p6qWnUFiG1ffcUdrbCY1DBAZ3NffrjaoBGQ\n  &nonce=o5jYpLSe29RBHBsn5iAnMKYpYw2Iw9XRBweacc001hRo5xxJEbHuniEbhuxHfVZy',
    },
    pkceDocs: {
      authPostToken:
      'POST /oauth2/token HTTP/1.1\nHost: sandbox-api.va.gov\nContent-Type: application/x-www-form-urlencoded\n\ngrant_type=authorization_code\n&code=z92dapo5\n&state=af0ifjsldkj\n&redirect_uri=<yourRedirectURL>\n&code_verifier=ccec_bace_d453_e31c_eb86_2ad1_9a1b_0a89_a584_c068_2c96',
      authUrl:
        'https://sandbox-api.va.gov/oauth2/authorization?\n  client_id=0oa1c01m77heEXUZt2p7\n  &redirect_uri=<yourRedirectURL>\n  &response_type=code\n  &scope=profile openid offline_access launch/patient patient/CommunityCareEligibility.read\n  &state=1AOQK33KIfH2g0ADHvU1oWAb7xQY7p6qWnUFiG1ffcUdrbCY1DBAZ3NffrjaoBGQ\n  &code_challenge_method=S256\n  &code_challenge=gNL3Mve3EVRsiFq0H6gfCz8z8IUANboT-eQZgEkXzKw',
    },
    releaseNotes: CommunityCareReleaseNotes,
    scopes: [
      'profile',
      'openid',
      'offline_access',
      'launch/patient',
      'patient/CommunityCareEligibility.read',
    ],
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
    description:
      'Use the OpenID Connect and SMART on FHIR standards to allow Veterans to authorize third-party applications to access data on their behalf.',
    docSources: [
      {
        apiIntro: FhirArgonautApiIntro,
        key: 'argonaut',
        label: 'Argonaut',
        openApiUrl: `${swaggerHost}/services/fhir/v0/argonaut/data-query/openapi.json`,
      },
      {
        apiIntro: FhirDSTU2ApiIntro,
        key: 'dstu2',
        label: 'DSTU2',
        openApiUrl: `${swaggerHost}/services/fhir/v0/dstu2/openapi.json`,
      },
      {
        key: 'r4',
        label: 'R4',
        openApiUrl: `${swaggerHost}/services/fhir/v0/r4/openapi.json`,
      },
    ],
    enabledByDefault: true,
    multiOpenAPIIntro: FHIRMultiOpenAPIIntro,
    name: 'Veterans Health API (FHIR)',
    oAuth: true,
    openidDocs: {
      authManageAccount: 'POST /oauth2/token HTTP/1.1\nHost: sandbox-api.va.gov',
      authPostTokenRefresh:
        "POST /oauth2/token HTTP/1.1\nHost: sandbox-api.va.gov\nContent-Type: application/x-www-form-urlencoded\nAuthorization: Basic {base64 encoded *client id* + ':' + *client secret*}\n\ngrant_type=refresh_token&refresh_token={your refresh_token}&scope={space separated scopes}",
      authPostTokenResponse200:
        'HTTP/1.1 200 OK\nContent-Type: application/json\nCache-Control: no-store\nPragma: no-cache\n\n{\n  "access_token": "SlAV32hkKG",\n  "expires_in": 3600,\n  "refresh_token": "8xLOxBtZp8",\n  "scope": "openid profile offline_access",\n  "patient": "1558538470",\n  "state": "af0ifjsldkj",\n  "token_type": "Bearer",\n}',
      authRevokeGrant:
        'DELETE /oauth2/grants HTTP/1.1\nHost: sandbox-api.va.gov\nContent-Type: application/x-www-form-urlencoded\n\n{\n  "client_id": {client_id},\n  "email": {test account email}\n}',
      authRevokeGrantError:
        'HTTP/1.1 400 Bad Request\nContent-Type: application/json\nCache-Control: no-store\nPragma: no-cache\n\n{\n  "error": "invalid_request",\n  "error_description": "Invalid email address."\n}',
      authRevokeTokenAccess:
        "POST /oauth2/revoke HTTP/1.1\nHost: sandbox-api.va.gov\nContent-Type: application/x-www-form-urlencoded\nAuthorization: Basic {base64 encoded *client id* + ':' + *client secret*}\ntoken={your access token}&token_type_hint=access_token",
      authRevokeTokenRefresh:
        "POST /oauth2/revoke HTTP/1.1\nHost: sandbox-api.va.gov\nContent-Type: application/x-www-form-urlencoded\nAuthorization: Basic {base64 encoded *client id* + ':' + *client secret*}\n\ntoken={your refresh token}&token_type_hint=refresh_token",
      authUrl:
        'https://sandbox-api.va.gov/oauth2/authorization?\n  client_id=0oa1c01m77heEXUZt2p7\n  &redirect_uri=<yourRedirectURL>\n  &response_type=code\n  &scope=profile openid offline_access launch/patient patient/AllergyIntolerance.read patient/Condition.read patient/DiagnosticReport.read patient/Immunization.read patient/Medication.read patient/MedicationOrder.read patient/MedicationRequest.read patient/MedicationStatement.read patient/Observation.read patient/Patient.read patient/Procedure.read\n  &state=1AOQK33KIfH2g0ADHvU1oWAb7xQY7p6qWnUFiG1ffcUdrbCY1DBAZ3NffrjaoBGQ\n  &nonce=o5jYpLSe29RBHBsn5iAnMKYpYw2Iw9XRBweacc001hRo5xxJEbHuniEbhuxHfVZy',
    },
    pkceDocs: {
      authPostToken:
      'POST /oauth2/token HTTP/1.1\nHost: sandbox-api.va.gov\nContent-Type: application/x-www-form-urlencoded\n\ngrant_type=authorization_code\n&code=z92dapo5\n&state=af0ifjsldkj\n&redirect_uri=<yourRedirectURL>\n&code_verifier=ccec_bace_d453_e31c_eb86_2ad1_9a1b_0a89_a584_c068_2c96',
      authUrl:
        'https://sandbox-api.va.gov/oauth2/authorization?\n  client_id=0oa1c01m77heEXUZt2p7\n  &redirect_uri=<yourRedirectURL>\n  &response_type=code\n  &scope=profile openid offline_access launch/patient patient/AllergyIntolerance.read patient/Condition.read patient/DiagnosticReport.read patient/Immunization.read patient/Medication.read patient/MedicationOrder.read patient/MedicationRequest.read patient/MedicationStatement.read patient/Observation.read patient/Patient.read patient/Procedure.read\n  &state=1AOQK33KIfH2g0ADHvU1oWAb7xQY7p6qWnUFiG1ffcUdrbCY1DBAZ3NffrjaoBGQ\n  &code_challenge_method=S256\n  &code_challenge=gNL3Mve3EVRsiFq0H6gfCz8z8IUANboT-eQZgEkXzKw',
    },
    releaseNotes: FhirApiReleaseNotes,
    scopes: [
      'profile',
      'openid',
      'offline_access',
      'launch/patient',
      'patient/AllergyIntolerance.read',
      'patient/Condition.read',
      'patient/DiagnosticReport.read',
      'patient/Immunization.read',
      'patient/Medication.read',
      'patient/MedicationOrder.read',
      'patient/MedicationRequest.read',
      'patient/MedicationStatement.read',
      'patient/Observation.read',
      'patient/Patient.read',
      'patient/Procedure.read',
    ],
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
