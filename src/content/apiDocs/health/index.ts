import { APICategoryContent } from '../../../apiDefs/schema';
import HealthArgonautDeactivationNotice from './argonautDeactivationNotice.mdx';
import HealthArgonautDeprecationNotice from './argonautDeprecationNotice.mdx';
import ArgonautReleaseNotes from './argonautReleaseNotes.mdx';
import ClinicalHealthReleaseNotes from './clinicalHealthReleaseNotes.mdx';
import CommunityCareReleaseNotes from './communityCareReleaseNotes.mdx';
import FhirApiReleaseNotes from './fhirAPIReleaseNotes.mdx';
import FhirArgonautApiIntro from './fhirArgonautApiIntro.mdx';
import FhirDSTU2ApiIntro from './fhirDSTU2ApiIntro.mdx';
import FHIRMultiOpenAPIIntro from './FHIRMultiOpenAPIIntro.mdx';
import HealthOverview from './healthOverview.mdx';
import HealthQuickstart from './healthQuickstart.mdx';
import UrgentCareApiIntro from './urgentCareApiIntro.mdx';
import UrgentCareDeactivationNotice from './urgentCareDeactivationNotice.mdx';
import UrgentCareDeprecationNotice from './urgentCareDeprecationNotice.mdx';
import UrgentCareReleaseNotes from './urgentCareReleaseNotes.mdx';

const healthContent: APICategoryContent = {
  consumerDocsLinkText: 'Read the consumer onboarding guide for getting production access',
  overview: HealthOverview,
  quickstart: HealthQuickstart,
  shortDescription: 'Empowering Veterans to take control of their data and put it to work.',
};

export {
  healthContent,
  ArgonautReleaseNotes,
  ClinicalHealthReleaseNotes,
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
