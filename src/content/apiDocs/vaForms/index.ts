import { IApiCategoryContent } from '../../../apiDefs/schema';
import VAFormsIntro from './vaFormsIntro.mdx';
import VAFormsOverview from './vaFormsOverview.mdx';
import VAFormsReleaseNotes from './vaFormsReleaseNotes.mdx';

const vaFormsContent: IApiCategoryContent = {
  intro: VAFormsIntro,
  overview: VAFormsOverview,
  placardText: 'Look up VA forms and check for new versions',
  shortDescription: 'Look up VA forms and check for new versions.',
};

export {
  vaFormsContent,
  VAFormsReleaseNotes,
};