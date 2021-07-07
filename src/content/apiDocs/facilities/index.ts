import { APICategoryContent } from '../../../apiDefs/schema';
import FacilitiesOverview from './facilitiesOverview.mdx';
import FacilitiesReleaseNotes from './facilitiesReleaseNotes.mdx';

const facilitiesContent: APICategoryContent = {
  consumerDocsLinkText: 'Learn about getting production access using open data APIs',
  overview: FacilitiesOverview,
  shortDescription:
    'Use the VA Facility API to find relevant information about a specific VA facility.',
  veteranRedirect: {
    linkText: "Find the facility that's right for you",
    linkUrl: 'https://www.va.gov/find-locations/',
    message: 'Are you a Veteran?',
  },
};

export { facilitiesContent, FacilitiesReleaseNotes };
