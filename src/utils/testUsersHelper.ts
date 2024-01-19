/* eslint-disable no-console */
export interface TestUserResponse {
  ok: boolean;
  status: number;
  body: TestUser[];
}
export interface TestUserRequest {
  body?: TestUser[];
  ok?: boolean;
  hash: string;
  status?: number;
  urlSlug: string;
  userId: string;
}

export interface TestUser {
  credentials: TestUserCredentials;
  icn: string;
  id: string;
  name_family: string;
  name_given: string;
  ssn: string;
}
interface TestUserCredentials {
  [key: string]: TestUserCredential;
  idme: TestUserCredential;
  logingov: TestUserCredential;
}
interface TestUserCredential {
  username: string;
  password: string;
  seed?: string;
}

export const isPasswordUniform = (key: string, data: TestUser[]): boolean => {
  const firstPassword = data[0].credentials[key].password;
  // some returns true if there is a non-uniform password, return the reverse of that
  return !data.some((user: TestUser): boolean => firstPassword !== user.credentials[key].password);
};

export const testUserGitHubUrl = (urlSlug: string | undefined): string => {
  let filename = 'https://github.com/department-of-veterans-affairs/vets-api-clients/blob/master/';
  switch (urlSlug) {
    case 'benefits-claims':
      filename += 'test_accounts/benefits_test_accounts.md';
      break;
    case 'clinical-health':
      filename += 'test_accounts/clinical_health_test_accounts.md';
      break;
    case 'community-care-eligibility':
      filename += 'test_accounts/community_care_test_accounts.md';
      break;
    case 'patient-health':
      filename += 'test_accounts/health_test_accounts.md';
      break;
    case 'veteran-service-history-and-eligibility':
      filename += 'test_accounts/verification_test_accounts.md';
      break;
    default:
      filename += 'test_accounts.md';
  }

  return filename;
};
