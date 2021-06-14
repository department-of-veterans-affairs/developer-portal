import { APICategoryContent } from '../../../apiDefs/schema';
import VAFormsOverview from './vaFormsOverview.mdx';
import VAFormsReleaseNotes from './vaFormsReleaseNotes.mdx';

const vaFormsContent: APICategoryContent = {
  overview: VAFormsOverview,
  placardText: 'Look up VA forms and check for new versions',
  shortDescription: 'Look up VA forms and check for new versions.',
  veteranRedirect: {
    linkText: 'Find the forms you need',
    linkUrl: 'https://www.va.gov/find-forms/',
    message: 'Are you a Veteran?',
  },
};

export { vaFormsContent, VAFormsReleaseNotes };
