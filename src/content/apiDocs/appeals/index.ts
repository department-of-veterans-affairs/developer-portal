import { APICategoryContent } from '../../../apiDefs/schema';
import AppealsOverview from './appealsOverview.mdx';
import AppealsStatusReleaseNotes from './appealsStatusReleaseNotes.mdx';
import DecisionReviewReleaseNotes from './decisionReviewReleaseNotes.mdx';

const appealsContent: APICategoryContent = {
  consumerDocsLinkText: 'Read the consumer onboarding guide for getting production access',
  overview: AppealsOverview,
  placardText: 'Build tools to help Veterans electronically manage, submit, and track appeals.',
  shortDescription: 'Enables managing benefit decision appeals on behalf of a Veteran.',
};

export { appealsContent, AppealsStatusReleaseNotes, DecisionReviewReleaseNotes };
