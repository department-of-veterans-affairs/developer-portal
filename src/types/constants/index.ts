export * from './actions/apply';
export * from './actions/oauthApiSelection';
export * from './actions/version';

export const CURRENT_VERSION_IDENTIFIER = 'current';
export const DEFAULT_OAUTH_API_SELECTION = 'claims';
export const DEFAULT_OAUTH_CCG_API_SELECTION = 'claims';
export const OPEN_API_SPEC_HOST: string = process.env.REACT_APP_VETSGOV_SWAGGER_API ?? '';

const BACKEND_BASE_URL = `${
  process.env.REACT_APP_DEVELOPER_PORTAL_SELF_SERVICE_URL ?? ''
}/internal/developer-portal/public`;
export const APPLY_URL = `${BACKEND_BASE_URL}/developer_application`;
export const PRODUCTION_ACCESS_URL = `${BACKEND_BASE_URL}/production_request`;
export const CONTACT_US_URL = `${BACKEND_BASE_URL}/contact-us`;

export const FLAG_POST_TO_LPB = 'post_to_lpb';
const LPB_BACKEND_BASE_URL = '/platform-backend';
export const LPB_APPLY_URL = `${LPB_BACKEND_BASE_URL}/v0/consumers/applications`;
export const LPB_PRODUCTION_ACCESS_URL = `${LPB_BACKEND_BASE_URL}/v0/consumers/production-requests`;
export const LPB_CONTACT_US_URL = `${LPB_BACKEND_BASE_URL}/v0/support/contact-us/requests`;

export const APPLY_OAUTH_APIS = ['claims', 'communityCare', 'health', 'verification'];
export const PAGE_HEADER_ID = 'page-header';
export const PAGE_HEADER_AND_HALO_ID = 'header-halo';
export const APPLY_INTERNAL_APIS = ['address_validation'];
export const FLAG_API_ENABLED_PROPERTY = 'enabled';
export const FLAG_CATEGORIES = 'categories';
export const FLAG_DEACTIVATED_APIS = 'deactivated_apis';
export const FLAG_ENABLED_APIS = 'enabled';
export const FLAG_HOSTED_APIS = 'hosted_apis';
export const FLAG_SHOW_TESTING_NOTICE = 'show_testing_notice';
export const FLAG_PLATFORM_OUTAGE = 'platform_outage';
export enum yesOrNoValues {
  Yes = 'yes',
  No = 'no',
}
