export const testUsersGitHubUrl = (urlSlug: string | undefined): string => {
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
