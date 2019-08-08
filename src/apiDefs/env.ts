export function isHostedApiEnabled(shortName: string, defaultValue: boolean): boolean {
  const envValue = process.env[`REACT_APP_${shortName.toUpperCase()}_API_ENABLED`];
  if (envValue == null) {
    return defaultValue;
  } else {
    return envValue === 'true';
  }
}

export const apiEnvFlags = {
  address_validation: isHostedApiEnabled('address_validation', true),
  appeals: isHostedApiEnabled('appeals', true),
  argonaut: isHostedApiEnabled('argonaut', true),
  benefits: isHostedApiEnabled('benefits', true),
  claims: isHostedApiEnabled('claims', true),
  community_care: isHostedApiEnabled('community_care', true),
  disability_rating: isHostedApiEnabled('disability_rating', true),
  facilities: isHostedApiEnabled('facilities', true),
  fhir: isHostedApiEnabled('fhir', true),
  loan_guaranty: isHostedApiEnabled('loan_guaranty', false),
  service_history: isHostedApiEnabled('service_history', true),
  urgent_care: isHostedApiEnabled('fhir', true),
  veteran_confirmation: isHostedApiEnabled('veteran_confirmation', true),
};
