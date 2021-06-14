import { APICategoryContent } from '../../../apiDefs/schema';
import AppealsIntro from './appealsIntro.mdx';
import AppealsOverview from './appealsOverview.mdx';
import AppealsStatusReleaseNotes from './appealsStatusReleaseNotes.mdx';
import DecisionReviewReleaseNotes from './decisionReviewReleaseNotes.mdx';

const appealsContent: APICategoryContent = {
  intro: AppealsIntro,
  overview: AppealsOverview,
  placardText: 'Enables managing benefit decision appeals on behalf of a Veteran',
  shortDescription: 'Enables managing benefit decision appeals on behalf of a Veteran.',
};

export { appealsContent, AppealsStatusReleaseNotes, DecisionReviewReleaseNotes };
