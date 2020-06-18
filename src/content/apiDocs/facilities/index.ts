import { IApiCategoryContent } from '../../../apiDefs/schema';
import FacilitiesIntro from './facilitiesIntro.mdx';
import FacilitiesOverview from './facilitiesOverview.mdx';
import FacilitiesReleaseNotes from './facilitiesReleaseNotes.mdx';

const facilitiesContent: IApiCategoryContent = {
  intro: FacilitiesIntro,
  overview: FacilitiesOverview,
  placardText: 'Access information about VA facilities',
  shortDescription:
    'Use the VA Facility API to find relevant information about a specific VA facility.',
};

export { 
  facilitiesContent,
  FacilitiesReleaseNotes, 
};