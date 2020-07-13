import { IApiCategoryContent } from '../../../apiDefs/schema';
import BenefitsIntakeReleaseNotes from './benefitsIntakeReleaseNotes.mdx';
import BenefitsIntro from './benefitsIntro.mdx';
import BenefitsOverview from './benefitsOverview.mdx';
import ClaimsReleaseNotes from './claimsReleaseNotes.mdx';
import LoanGuarantyReleaseNotes from './loanGuarantyReleaseNotes.mdx';

const benefitsContent: IApiCategoryContent = {
  intro: BenefitsIntro,
  overview: BenefitsOverview,
  placardText: 'Submit benefits-related PDFs',
  shortDescription:
    'Enables approved organizations to submit benefits-related PDFs and access information on a Veteran’s behalf.',
};

export {
  benefitsContent,
  BenefitsIntakeReleaseNotes,
  ClaimsReleaseNotes,
  LoanGuarantyReleaseNotes,
};
