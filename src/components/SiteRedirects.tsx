/* eslint-disable max-lines */
interface RedirectData {
  new: string;
  old: string;
}

const SiteRedirects = (): null => {
  const redirects: RedirectData[] = [
    {
      new: '/explore/api/appealable-issues/docs',
      old: '/explore/appeals/docs/appealable-issues',
    },
    {
      new: '/explore/api/appeals-status/docs',
      old: '/explore/appeals/docs/appeals',
    },
    {
      new: '/explore/api/decision-reviews/docs',
      old: '/explore/appeals/docs/decision_reviews',
    },
    {
      new: '/explore/api/higher-level-reviews/docs',
      old: '/explore/appeals/docs/higher-level-reviews',
    },
    {
      new: '/explore/api/legacy-appeals/docs',
      old: '/explore/appeals/docs/legacy-appeals',
    },
    {
      new: '/explore/api/notice-of-disagreements/docs',
      old: '/explore/benefits/docs/notice_of_disagreements',
    },
    {
      new: '/explore/api/benefits-claims/docs',
      old: '/explore/benefits/docs/claims',
    },
    {
      new: '/explore/api/benefits-documents/docs',
      old: '/explore/benefits/docs/benefits-documents',
    },
    {
      new: '/explore/api/benefits-intake/docs',
      old: '/explore/benefits/docs/benefits',
    },
    {
      new: '/explore/api/benefits-reference-data/docs',
      old: '/explore/benefits/docs/benefits_reference_data',
    },
    {
      new: '/explore/api/direct-deposit-management/docs',
      old: '/explore/benefits/docs/direct-deposit-management',
    },
    {
      new: '/explore/api/education-benefits/docs',
      old: '/explore/appeals/docs/education-benefits',
    },
    {
      new: '/explore/api/supplemental-claims/docs',
      old: '/explore/benefits/docs/supplemental-claims',
    },
    {
      new: '/explore/api/va-facilities/docs',
      old: '/explore/facilities/docs/facilities',
    },
    {
      new: '/explore/api/va-forms/docs',
      old: '/explore/vaForms/docs/vaForms',
    },
    {
      new: '/explore/api/clinical-health/docs',
      old: '/explore/health/docs/clinical_health',
    },
    {
      new: '/explore/api/community-care-eligibility/docs',
      old: '/explore/health/docs/community_care',
    },
    {
      new: '/explore/api/patient-health/docs',
      old: '/explore/health/docs/fhir',
    },
    {
      new: '/explore/api/patient-health/docs?version=current',
      old: '/explore/api/patient-health/docs?version=v0-argonaut',
    },
    {
      new: '/explore/api/provider-directory/docs',
      old: '/explore/health/docs/provider_directory',
    },
    {
      new: '/explore/api/urgent-care-eligibility/docs',
      old: '/explore/health/docs/urgent_care',
    },
    {
      new: '/explore/api/guaranty-remittance/docs',
      old: '/explore/loanGuaranty/docs/lgy_guaranty_remittance',
    },
    {
      new: '/explore/api/loan-guaranty/docs',
      old: '/explore/loanGuaranty/docs/loan_guaranty',
    },
    {
      new: '/explore/api/loan-review/docs',
      old: '/explore/loanGuaranty/docs/loan-review',
    },
    {
      new: '/explore/api/address-validation/docs',
      old: '/explore/verification/docs/address_validation',
    },
    {
      new: '/explore/api/contact-information/docs',
      old: '/explore/verification/docs/contact_information',
    },
    {
      new: '/explore/api/va-letter-generator/docs',
      old: '/explore/verification/docs/va_letter_generator',
    },
    {
      new: '/explore/api/veteran-confirmation/docs',
      old: '/explore/verification/docs/veteran_confirmation',
    },
    {
      new: '/explore/api/veteran-service-history-and-eligibility/docs',
      old: '/explore/verification/docs/veteran_verification',
    },
    {
      new: '/explore/va-benefits',
      old: '/explore/appeals',
    },
    {
      new: '/explore/va-benefits',
      old: '/explore/benefits',
    },
    {
      new: '/explore/forms',
      old: '/explore/vaForms',
    },
    {
      new: '/explore/loan-guaranty',
      old: '/explore/loanGuaranty',
    },
    {
      new: '/explore/api/appealable-issues/authorization-code',
      old: '/explore/authorization/docs/authorization-code?api=appealable-issues',
    },
    {
      new: '/explore/api/appeals-status/authorization-code',
      old: '/explore/authorization/docs/authorization-code?api=appeals',
    },
    {
      new: '/explore/api/benefits-claims/authorization-code',
      old: '/explore/authorization/docs/authorization-code?api=claims',
    },
    {
      new: '/explore/api/clinical-health/authorization-code',
      old: '/explore/authorization/docs/authorization-code?api=clinical_health',
    },
    {
      new: '/explore/api/community-care-eligibility/authorization-code',
      old: '/explore/authorization/docs/authorization-code?api=community_care',
    },
    {
      new: '/explore/api/higher-level-reviews/authorization-code',
      old: '/explore/authorization/docs/authorization-code?api=higher-level-reviews',
    },
    {
      new: '/explore/api/legacy-appeals/authorization-code',
      old: '/explore/authorization/docs/authorization-code?api=legacy-appeals',
    },
    {
      new: '/explore/api/notice-of-disagreements/authorization-code',
      old: '/explore/authorization/docs/authorization-code?api=notice_of_disagreements',
    },
    {
      new: '/explore/api/patient-health/authorization-code',
      old: '/explore/authorization/docs/authorization-code?api=fhir',
    },
    {
      new: '/explore/api/supplemental-claims/authorization-code',
      old: '/explore/authorization/docs/authorization-code?api=supplemental-claims',
    },
    {
      new: '/explore/api/veteran-service-history-and-eligibility/authorization-code',
      old: '/explore/authorization/docs/authorization-code?api=veteran_verification',
    },
    {
      new: 'https://developer.va.gov/explore?auth=acg',
      old: 'https://developer.va.gov/explore/authorization/docs/authorization-code',
    },
    {
      new: '/explore/api/address-validation/client-credentials',
      old: '/explore/authorization/docs/client-credentials?api=address_validation',
    },
    {
      new: '/explore/api/appealable-issues/client-credentials',
      old: '/explore/authorization/docs/client-credentials?api=appealable-issues',
    },
    {
      new: '/explore/api/appeals-status/client-credentials',
      old: '/explore/authorization/docs/client-credentials?api=appeals',
    },
    {
      new: '/explore/api/benefits-claims/client-credentials',
      old: '/explore/authorization/docs/client-credentials?api=claims',
    },
    {
      new: '/explore/api/benefits-documents/client-credentials',
      old: '/explore/authorization/docs/client-credentials?api=benefits-documents',
    },
    {
      new: '/explore/api/community-care-eligibility/client-credentials',
      old: '/explore/authorization/docs/client-credentials?api=community_care',
    },
    {
      new: '/explore/api/contact-information/client-credentials',
      old: '/explore/authorization/docs/client-credentials?api=contact_information',
    },
    {
      new: '/explore/api/direct-deposit-management/client-credentials',
      old: '/explore/authorization/docs/client-credentials?api=direct-deposit-management',
    },
    {
      new: '/explore/api/education-benefits/client-credentials',
      old: '/explore/authorization/docs/client-credentials?api=education-benefits',
    },
    {
      new: '/explore/api/guaranty-remittance/client-credentials',
      old: '/explore/authorization/docs/client-credentials?api=lgy_guaranty_remittance',
    },
    {
      new: '/explore/api/higher-level-reviews/client-credentials',
      old: '/explore/authorization/docs/client-credentials?api=higher-level-reviews',
    },
    {
      new: '/explore/api/legacy-appeals/client-credentials',
      old: '/explore/authorization/docs/client-credentials?api=legacy-appeals',
    },
    {
      new: '/explore/api/loan-review/client-credentials',
      old: '/explore/authorization/docs/client-credentials?api=loan-review',
    },
    {
      new: '/explore/api/notice-of-disagreements/client-credentials',
      old: '/explore/authorization/docs/client-credentials?api=notice_of_disagreements',
    },
    {
      new: '/explore/api/patient-health/client-credentials',
      old: '/explore/authorization/docs/client-credentials?api=fhir',
    },
    {
      new: '/explore/api/supplemental-claims/client-credentials',
      old: '/explore/authorization/docs/client-credentials?api=supplemental-claims',
    },
    {
      new: '/explore/api/va-letter-generator/client-credentials',
      old: '/explore/authorization/docs/client-credentials?api=va_letter_generator',
    },
    {
      new: '/explore/api/veteran-service-history-and-eligibility/client-credentials',
      old: '/explore/authorization/docs/client-credentials?api=veteran_verification',
    },
    {
      new: '/explore?auth=ccg',
      old: '/explore/authorization/docs/client-credentials',
    },
    {
      new: '/explore/va-benefits',
      old: '/release-notes/appeals',
    },
    {
      new: '/explore/va-benefits',
      old: '/release-notes/benefits',
    },
    {
      new: '/explore/api/va-facilities/release-notes',
      old: '/release-notes/facilities',
    },
    {
      new: '/explore/api/va-forms/release-notes',
      old: '/release-notes/vaForms',
    },
    {
      new: '/explore/health',
      old: '/release-notes/health',
    },
    {
      new: '/explore/loan-guaranty',
      old: '/release-notes/loanGuaranty',
    },
    {
      new: '/explore/verification',
      old: '/release-notes/verification',
    },
    {
      new: '/explore/health',
      old: '/explore/health/docs/quickstart',
    },
    {
      new: '/explore',
      old: '/release-notes',
    },
    {
      new: '/explore',
      old: '/apply',
    },
    {
      new: '/explore',
      old: '/onboarding/request-sandbox-access',
    },
    {
      new: '/explore',
      old: '/explore/authorization',
    },
    {
      new: '/explore',
      old: '/release-notes/deactivated',
    },
    {
      new: '/onboarding/request-prod-access',
      old: '/go-live',
    },
    {
      new: '/explore',
      old: '/oauth',
    },
    {
      new: '/explore/api/loan-guaranty',
      old: '/explore/api/loan-guaranty/sandbox-access',
    },
    {
      new: '/explore/api/clinical-health',
      old: '/explore/api/clinical-health/sandbox-access',
    },
    {
      new: '/explore/api/decision-reviews',
      old: '/explore/api/decision-reviews/sandbox-access',
    },
    {
      new: '/explore/api/appeals-status',
      old: '/explore/api/appeals-status/sandbox-access',
    },
    {
      new: '/platform-backend/sitemap.xml',
      old: '/sitemap.xml',
    },
  ];
  redirects.some((item: RedirectData): boolean => {
    const testFullPath = window.location.pathname + window.location.search;
    if (window.location.pathname === item.old || testFullPath === item.old) {
      window.location.href = item.new;
      return true;
    }
    return false;
  });

  return null;
};

export { SiteRedirects };
