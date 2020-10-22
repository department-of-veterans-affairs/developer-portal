export * from './actions/apply';
export * from './actions/version';

export const CURRENT_VERSION_IDENTIFIER = 'current';
export const OPEN_API_SPEC_HOST: string = process.env.REACT_APP_VETSGOV_SWAGGER_API || '';

export const APPLY_URL = `${process.env.REACT_APP_DEVELOPER_PORTAL_SELF_SERVICE_URL ||
  ''}/internal/developer-portal-backend/developer_application`;
export const CONTACT_US_URL = `${process.env.REACT_APP_DEVELOPER_PORTAL_SELF_SERVICE_URL ||
  ''}/internal/developer-portal-backend/contact-us`;

export const APPLY_FIELDS_TO_URL_FRAGMENTS = {
  benefits: 'benefits',
  claims: 'claims',
  communityCare: 'community_care',
  confirmation: 'veteran_confirmation',
  facilities: 'facilities',
  health: 'fhir',
  vaForms: 'vaForms',
  verification: 'veteran_verification',
} as Record<string, string>;

export const APPLY_STANDARD_APIS = ['benefits', 'facilities', 'vaForms', 'confirmation'];
export const APPLY_OAUTH_APIS = ['claims', 'communityCare', 'health', 'verification'];
export const PAGE_HEADER_ID = 'page-header';
