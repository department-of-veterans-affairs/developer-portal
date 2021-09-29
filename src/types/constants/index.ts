export * from './actions/apply';
export * from './actions/oauthApiSelection';
export * from './actions/version';

export const CURRENT_VERSION_IDENTIFIER = 'current';
export const DEFAULT_OAUTH_API_SELECTION = 'claims';
export const OPEN_API_SPEC_HOST: string = process.env.REACT_APP_VETSGOV_SWAGGER_API ?? '';

const BACKEND_BASE_URL = `${process.env.REACT_APP_DEVELOPER_PORTAL_SELF_SERVICE_URL ?? ''
  }/internal/developer-portal/public`;
export const APPLY_URL = `${BACKEND_BASE_URL}/developer_application`;
export const PRODUCTION_ACCESS_URL = `${BACKEND_BASE_URL}/production_request`;
export const CONTACT_US_URL = `${BACKEND_BASE_URL}/contact-us`;

export const APPLY_STANDARD_APIS = [
  'claimsAttributes',
  'benefits',
  'facilities',
  'vaForms',
  'confirmation',
];
export const APPLY_OAUTH_APIS = ['claims', 'communityCare', 'health', 'verification'];
export const PAGE_HEADER_ID = 'page-header';
export const PAGE_HEADER_AND_HALO_ID = 'header-halo';
export const APPLY_INTERNAL_APIS = ['address_validation'];
export const FLAG_API_ENABLED_PROPERTY = 'enabled';
export const FLAG_CATEGORIES = 'categories';
export const FLAG_CONSUMER_DOCS = 'consumer_docs';
export const FLAG_DEACTIVATED_APIS = 'deactivated_apis';
export const FLAG_ENABLED_APIS = 'enabled';
export const FLAG_HOSTED_APIS = 'hosted_apis';
export const FLAG_SHOW_TESTING_NOTICE = 'show_testing_notice';
export const FLAG_SIGNUPS_ENABLED = 'signups_enabled';
export const FLAG_PLATFORM_OUTAGE = 'platform_outage';
export enum yesOrNoValues {
  Yes = 'yes',
  No = 'no',
}
