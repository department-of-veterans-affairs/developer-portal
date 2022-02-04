import { APICategoryContent } from '../../../apiDefs/schema';
import loanGuarantyOverview from './loanGuarantyOverview.mdx';
import LoanGuarantyReleaseNotes from './loanGuarantyReleaseNotes.mdx';
import GuarantyRemittanceReleaseNotes from './guarantyRemittanceReleaseNotes.mdx';

const loanGuarantyContent: APICategoryContent = {
  consumerDocsLinkText: 'Read the consumer onboarding guide for getting production access',
  overview: loanGuarantyOverview,
  shortDescription: 'Enables electronic submission and status tracking of non-medical, VA-related benefit claims.',
};

export {
  loanGuarantyContent,
  LoanGuarantyReleaseNotes,
  GuarantyRemittanceReleaseNotes,
};
