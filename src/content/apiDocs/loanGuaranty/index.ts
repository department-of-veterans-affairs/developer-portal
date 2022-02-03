import { APICategoryContent } from '../../../apiDefs/schema';
import loanGuarantyOverview from './loanGuarantyOverview.mdx';
import LoanGuarantyReleaseNotes from './loanGuarantyReleaseNotes.mdx';

const loanGuarantyContent: APICategoryContent = {
  consumerDocsLinkText: 'Read the consumer onboarding guide for getting production access',
  overview: loanGuarantyOverview,
  shortDescription: '',
};

export {
  loanGuarantyContent,
  LoanGuarantyReleaseNotes,
};
