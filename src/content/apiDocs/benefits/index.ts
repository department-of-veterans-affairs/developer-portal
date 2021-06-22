import { APICategoryContent } from '../../../apiDefs/schema';
import BenefitsIntakeReleaseNotes from './benefitsIntakeReleaseNotes.mdx';
import BenefitsOverview from './benefitsOverview.mdx';
import ClaimsReleaseNotes from './claimsReleaseNotes.mdx';
import LoanGuarantyReleaseNotes from './loanGuarantyReleaseNotes.mdx';
import ClaimsAttributesReleaseNotes from './claimsAttributesReleaseNotes.mdx';

const benefitsContent: APICategoryContent = {
  consumerDocsLinkText: 'Read the consumer onboarding guide for getting production access',
  overview: BenefitsOverview,
  placardText: 'Build tools to electronically submit and track the status of benefit claims.',
  shortDescription:
    'Enables electronic submission and status tracking of non-medical, VA-related benefit claims.',
  veteranRedirect: {
    linkText: 'benefits or appeals claim status',
    linkUrl: 'https://www.va.gov/claim-or-appeal-status/',
    message: 'Are you a Veteran? Check your',
  },
};

export {
  benefitsContent,
  BenefitsIntakeReleaseNotes,
  ClaimsReleaseNotes,
  LoanGuarantyReleaseNotes,
  ClaimsAttributesReleaseNotes,
};
