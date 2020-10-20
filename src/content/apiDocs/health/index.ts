import { APICategoryContent } from '../../../apiDefs/schema';
import HealthArgonautDeactivationNotice from './argonautDeactivationNotice.mdx';
import HealthArgonautDeprecationNotice from './argonautDeprecationNotice.mdx';
import ArgonautReleaseNotes from './argonautReleaseNotes.mdx';
import CommunityCareReleaseNotes from './communityCareReleaseNotes.mdx';
import FhirApiReleaseNotes from './fhirAPIReleaseNotes.mdx';
import FhirArgonautApiIntro from './fhirArgonautApiIntro.mdx';
import FhirDSTU2ApiIntro from './fhirDSTU2ApiIntro.mdx';
import FHIRMultiOpenAPIIntro from './FHIRMultiOpenAPIIntro.mdx';
import HealthIntro from './healthIntro.mdx';
import HealthOverview from './healthOverview.mdx';
import HealthQuickstart from './healthQuickstart.mdx';
import UrgentCareApiIntro from './urgentCareApiIntro.mdx';
import UrgentCareDeactivationNotice from './urgentCareDeactivationNotice.mdx';
import UrgentCareDeprecationNotice from './urgentCareDeprecationNotice.mdx';
import UrgentCareReleaseNotes from './urgentCareReleaseNotes.mdx';

const healthContent: APICategoryContent = {
  intro: HealthIntro,
  overview: HealthOverview,
  placardText: "View medical records and manage Veteran's health",
  quickstart: HealthQuickstart,
  shortDescription: 'Use our APIs to build tools that help Veterans manage their health.',
};

export {
  healthContent,
  ArgonautReleaseNotes,
  CommunityCareReleaseNotes,
  FhirApiReleaseNotes,
  FhirArgonautApiIntro,
  FhirDSTU2ApiIntro,
  FHIRMultiOpenAPIIntro,
  HealthArgonautDeprecationNotice,
  HealthArgonautDeactivationNotice,
  UrgentCareApiIntro,
  UrgentCareDeprecationNotice,
  UrgentCareReleaseNotes,
  UrgentCareDeactivationNotice,
};
