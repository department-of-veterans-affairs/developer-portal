import { IApiCategoryContent } from '../../../apiDefs/schema';
import AppealsIntro from './appealsIntro.mdx';
import AppealsOverview from './appealsOverview.mdx';
import AppealsQuickstart from './appealsQuickstart.mdx';
import AppealsReleaseNotes from './appealsReleaseNotes.mdx';

const appealsContent: IApiCategoryContent = {
  intro: AppealsIntro,
  overview: AppealsOverview,
  placardText: 'Build tools to help Veterans electronically manage, submit, and track appeals.',
  quickstart: AppealsQuickstart,
  shortDescription:
    'Enables managing benefit decision appeals on behalf of a Veteran.',
};

export {
  appealsContent,
  AppealsReleaseNotes,
};