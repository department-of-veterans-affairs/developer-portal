import { IApiCategoryContent } from '../../../apiDefs/schema';
import HealthArgonautPostDeprecation from './argonautDeprecatedNotice.mdx';
import HealthArgonautPreDeprecation from './argonautDeprecationNotice.mdx';
import ArgonautReleaseNotes from './argonautReleaseNotes.mdx';
import CommunityCareApiIntro from './communityCareApiIntro.mdx';
import CommunityCareReleaseNotes from './communityCareReleaseNotes.mdx';
import FhirApiReleaseNotes from './fhirAPIReleaseNotes.mdx';
import FhirArgonautApiIntro from './fhirArgonautApiIntro.mdx';
import FhirDSTU2ApiIntro from './fhirDSTU2ApiIntro.mdx';
import FhirR4ApiIntro from './fhirR4ApiIntro.mdx';
import HealthIntro from './healthIntro.mdx';
import HealthOverview from './healthOverview.mdx';
import HealthQuickstart from './healthQuickstart.mdx';
import UrgentCareApiIntro from './urgentCareApiIntro.mdx';
import UrgentCareReleaseNotes from './urgentCareReleaseNotes.mdx';

const healthContent: IApiCategoryContent = {
  intro: HealthIntro,
  overview: HealthOverview,
  placardText: "View medical records and manage Veteran's health",
  quickstart: HealthQuickstart,
  shortDescription: 'Use our APIs to build tools that help Veterans manage their health.',
};

export {
  healthContent,
  ArgonautReleaseNotes,
  CommunityCareApiIntro,
  CommunityCareReleaseNotes,
  FhirApiReleaseNotes,
  FhirArgonautApiIntro,
  FhirDSTU2ApiIntro,
  FhirR4ApiIntro,
  HealthArgonautPostDeprecation,
  HealthArgonautPreDeprecation,
  UrgentCareApiIntro,
  UrgentCareReleaseNotes,
};