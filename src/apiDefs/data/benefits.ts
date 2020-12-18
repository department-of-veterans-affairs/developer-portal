import {
  BenefitsIntakeReleaseNotes,
  ClaimsReleaseNotes,
  LoanGuarantyReleaseNotes,
  ClaimsAttributesReleaseNotes,
} from '../../content/apiDocs/benefits';
import { OPEN_API_SPEC_HOST } from '../../types/constants';
import { APIDescription } from '../schema';

const benefitsApis: APIDescription[] = [
  {
    description: 'Submit and track claims',
    docSources: [
      {
        metadataUrl: `${OPEN_API_SPEC_HOST}/services/claims/metadata`,
        openApiUrl: `${OPEN_API_SPEC_HOST}/services/claims/docs/v0/api`,
      },
    ],
    enabledByDefault: true,
    name: 'Benefits Claims',
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
        'https://sandbox-api.va.gov/oauth2/authorization?\n  client_id=0oa1c01m77heEXUZt2p7\n  &redirect_uri=<yourRedirectURL>\n  &response_type=code\n  &scope=profile openid offline_access launch/patient claim.read claim.write\n  &state=1AOQK33KIfH2g0ADHvU1oWAb7xQY7p6qWnUFiG1ffcUdrbCY1DBAZ3NffrjaoBGQ\n  &nonce=o5jYpLSe29RBHBsn5iAnMKYpYw2Iw9XRBweacc001hRo5xxJEbHuniEbhuxHfVZy',
    },
    pkceDocs: {
      authPostToken:
        'POST /oauth2/token HTTP/1.1\nHost: sandbox-api.va.gov\nContent-Type: application/x-www-form-urlencoded\n\ngrant_type=authorization_code\n&code=z92dapo5\n&state=af0ifjsldkj\n&redirect_uri=<yourRedirectURL>\n&code_verifier=ccec_bace_d453_e31c_eb86_2ad1_9a1b_0a89_a584_c068_2c96',
      authUrl:
        'https://sandbox-api.va.gov/oauth2/authorization?\n  client_id=0oa1c01m77heEXUZt2p7\n  &redirect_uri=<yourRedirectURL>\n  &response_type=code\n  &scope=profile openid offline_access launch/patient claim.read claim.write\n  &state=1AOQK33KIfH2g0ADHvU1oWAb7xQY7p6qWnUFiG1ffcUdrbCY1DBAZ3NffrjaoBGQ\n  &code_challenge_method=S256\n  &code_challenge=gNL3Mve3EVRsiFq0H6gfCz8z8IUANboT-eQZgEkXzKw',
    },
    releaseNotes: ClaimsReleaseNotes,
    scopes: ['profile', 'openid', 'offline_access', 'claim.read', 'claim.write'],
    trustedPartnerOnly: false,
    urlFragment: 'claims',
    vaInternalOnly: false,
  },
  {
    description: 'Submit PDF claims',
    docSources: [
      {
        metadataUrl: `${OPEN_API_SPEC_HOST}/services/vba_documents/metadata`,
        openApiUrl: `${OPEN_API_SPEC_HOST}/services/vba_documents/docs/v0/api`,
      },
    ],
    enabledByDefault: true,
    name: 'Benefits Intake',
    releaseNotes: BenefitsIntakeReleaseNotes,
    trustedPartnerOnly: false,
    urlFragment: 'benefits',
    vaInternalOnly: false,
  },
  {
    description: 'Manage VA Home Loans',
    docSources: [
      {
        openApiUrl: `${OPEN_API_SPEC_HOST}/services/loan_guaranty/docs/v1/api`,
      },
    ],
    enabledByDefault: true,
    name: 'Loan Guaranty',
    releaseNotes: LoanGuarantyReleaseNotes,
    trustedPartnerOnly: true,
    urlFragment: 'loan_guaranty',
    vaInternalOnly: false,
  },
  {
    description: 'Improve claim routing',
    docSources: [
      {
        openApiUrl: `${OPEN_API_SPEC_HOST}/services/claims-attributes/v1/docs/openapi.json`,
      },
    ],
    enabledByDefault: false,
    name: 'Claims Attributes',
    releaseNotes: ClaimsAttributesReleaseNotes,
    trustedPartnerOnly: false,
    urlFragment: 'claims_attributes',
    vaInternalOnly: false,
  },
];

export default benefitsApis;
