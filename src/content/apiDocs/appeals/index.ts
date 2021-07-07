import { APICategoryContent } from '../../../apiDefs/schema';
import AppealsOverview from './appealsOverview.mdx';
import AppealsStatusReleaseNotes from './appealsStatusReleaseNotes.mdx';
import DecisionReviewReleaseNotes from './decisionReviewReleaseNotes.mdx';

const appealsContent: APICategoryContent = {
  consumerDocsLinkText: 'Read the consumer onboarding guide for getting production access',
  overview: AppealsOverview,
  shortDescription: 'Enables managing benefit decision appeals on behalf of a Veteran.',
};

export { appealsContent, AppealsStatusReleaseNotes, DecisionReviewReleaseNotes };
