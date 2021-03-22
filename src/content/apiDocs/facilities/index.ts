import { APICategoryContent } from '../../../apiDefs/schema';
import FacilitiesIntro from './facilitiesIntro.mdx';
import FacilitiesOverview from './facilitiesOverview.mdx';
import FacilitiesReleaseNotes from './facilitiesReleaseNotes.mdx';

const facilitiesContent: APICategoryContent = {
  intro: FacilitiesIntro,
  overview: FacilitiesOverview,
  placardText: 'Access information about VA facilities',
  shortDescription:
    'Use the VA Facility API to find relevant information about a specific VA facility.',
  veteranRedirect: {
    linkText: "Find the facility that's right for you",
    linkUrl: 'https://www.va.gov/find-locations/',
    message: 'Are you a Veteran?',
  },
};

export { facilitiesContent, FacilitiesReleaseNotes };
