import { APICategoryContent } from '../../../apiDefs/schema';
import BenefitsIntakeReleaseNotes from './benefitsIntakeReleaseNotes.mdx';
import BenefitsIntro from './benefitsIntro.mdx';
import BenefitsOverview from './benefitsOverview.mdx';
import ClaimsReleaseNotes from './claimsReleaseNotes.mdx';
import LoanGuarantyReleaseNotes from './loanGuarantyReleaseNotes.mdx';
import ClaimsAttributesReleaseNotes from './claimsAttributesReleaseNotes.mdx';

const benefitsContent: APICategoryContent = {
  intro: BenefitsIntro,
  overview: BenefitsOverview,
  placardText: 'Build tools to electronically submit and track the status of benefit claims.',
  shortDescription:
    'Enables Veterans and approved organizations to electronically submit and track the status of benefit claims.',
};

export {
  benefitsContent,
  BenefitsIntakeReleaseNotes,
  ClaimsReleaseNotes,
  LoanGuarantyReleaseNotes,
  ClaimsAttributesReleaseNotes,
};
