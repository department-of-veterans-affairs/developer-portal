import { APICategoryContent } from '../../../apiDefs/schema';
import BenefitsIntakeReleaseNotes from './benefitsIntakeReleaseNotes.mdx';
import BenefitsOverview from './benefitsOverview.mdx';
// Benefits Reference Data name abbreviated due to linter rules
import BenefitsRefDataReleaseNotes from './benefitsReferenceDataReleaseNotes.mdx';
import ClaimsReleaseNotes from './claimsReleaseNotes.mdx';
import LoanGuarantyReleaseNotes from './loanGuarantyReleaseNotes.mdx';

const benefitsContent: APICategoryContent = {
  consumerDocsLinkText: 'Read the consumer onboarding guide for getting production access',
  overview: BenefitsOverview,
  shortDescription:
    'Enables approved organizations to submit benefits-related PDFs and access information on a Veteran’s behalf.',
  veteranRedirect: {
    linkText: 'benefits or appeals claim status',
    linkUrl: 'https://www.va.gov/claim-or-appeal-status/',
    message: 'Are you a Veteran or a Veteran representative? Check your',
  },
};

export {
  benefitsContent,
  BenefitsIntakeReleaseNotes,
  // Same as comment above
  BenefitsRefDataReleaseNotes,
  ClaimsReleaseNotes,
  LoanGuarantyReleaseNotes,
};
