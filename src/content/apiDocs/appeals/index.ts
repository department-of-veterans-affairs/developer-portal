import { APICategoryContent } from '../../../apiDefs/schema';
import AppealsOverview from './appealsOverview.mdx';
import AppealsStatusReleaseNotes from './appealsStatusReleaseNotes.mdx';
import DecisionReviewReleaseNotes from './decisionReviewReleaseNotes.mdx';

const appealsContent: APICategoryContent = {
  overview: AppealsOverview,
  placardText: 'Build tools to help Veterans electronically manage, submit, and track appeals.',
  shortDescription: 'Enables managing benefit decision appeals on behalf of a Veteran.',
};

export { appealsContent, AppealsStatusReleaseNotes, DecisionReviewReleaseNotes };
