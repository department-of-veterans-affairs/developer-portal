export const ABOUT_OVERVIEW_PATH = '/about';
export const ABOUT_NEWS_PATH = '/about/news';

export const VETERAN_BANNER_APPROVED_ROUTES: string[] = [
  '/explore/benefits',
  '/explore/facilities',
  '/explore/vaForms',
];

export const CONSUMER_PATH = '/onboarding';
export const CONSUMER_SANDBOX_PATH = `${CONSUMER_PATH}/request-sandbox-access`;
export const CONSUMER_PROD_PATH = `${CONSUMER_PATH}/request-prod-access`;
export const CONSUMER_DEMO_PATH = `${CONSUMER_PATH}/prepare-for-and-complete-a-demo`;
export const CONSUMER_APIS_PATH = `${CONSUMER_PATH}/working-with-lighthouse-apis`;
export const CONSUMER_APPLICATION_PATH = `${CONSUMER_PATH}/production-access-application`;
export const CONSUMER_RATE_LIMIT_PATH = `${CONSUMER_APIS_PATH}#rate-limiting`;
export const CONSUMER_ROUTER_PATHS: string[] = [
  CONSUMER_PATH,
  CONSUMER_PROD_PATH,
  CONSUMER_DEMO_PATH,
  CONSUMER_APIS_PATH,
];

export const PUBLISHING_PATH = '/api-publishing';
export const PUBLISHING_ONBOARDING_PATH = `${PUBLISHING_PATH}/process`;
export const PUBLISHING_REQUIREMENTS_URL =
  'https://hub.lighthouse.va.gov/docs/default/component/lighthouse-api-standards/';
export const PUBLISHING_ROUTER_PATHS: string[] = [
  PUBLISHING_PATH,
  PUBLISHING_ONBOARDING_PATH,
  PUBLISHING_REQUIREMENTS_URL,
];
export const PUBLISHING_STANDARDS_URL =
  'https://department-of-veterans-affairs.github.io/va-api-standards/';
// For legacy links
export const PUBLISHING_EXPECTATIONS_PATH = `${PUBLISHING_PATH}/expectations`;

export const RELEASE_NOTES_PATH = '/release-notes';
export const RELEASE_NOTES_DEACTIVATED_PATH = `${RELEASE_NOTES_PATH}/deactivated`;
export const RELEASE_NOTES_CATEGORY_PATH = `${RELEASE_NOTES_PATH}/:apiCategoryKey`;

export const SUPPORT_PATH = '/support';
export const SUPPORT_CONTACT_PATH = '/support/contact-us';

export const TERMS_OF_SERVICE_PATH = '/terms-of-service';
