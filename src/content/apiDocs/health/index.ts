import { APICategoryContent } from '../../../apiDefs/schema';
import HealthArgonautDeactivationNotice from './argonautDeactivationNotice.mdx';
import HealthArgonautDeprecationNotice from './argonautDeprecationNotice.mdx';
import ArgonautReleaseNotes from './argonautReleaseNotes.mdx';
import ClinicalHealthReleaseNotes from './clinicalHealthReleaseNotes.mdx';
import CommunityCareReleaseNotes from './communityCareReleaseNotes.mdx';
import FhirApiReleaseNotes from './fhirAPIReleaseNotes.mdx';
import HealthOverview from './healthOverview.mdx';
import HealthQuickstart from './healthQuickstart.mdx';
import PgdReleaseNotes from './pgdReleaseNotes.mdx';
import UrgentCareApiIntro from './urgentCareApiIntro.mdx';
import UrgentCareDeactivationNotice from './urgentCareDeactivationNotice.mdx';
import UrgentCareDeprecationNotice from './urgentCareDeprecationNotice.mdx';
import UrgentCareReleaseNotes from './urgentCareReleaseNotes.mdx';
import ProviderDirectoryReleaseNotes from './providerDirectoryReleaseNotes.mdx';

const healthContent: APICategoryContent = {
  consumerDocsLinkText: 'Read the consumer onboarding guide for getting production access',
  overview: HealthOverview,
  quickstart: HealthQuickstart,
  shortDescription:
    'Use our APIs to build tools that help Veterans and VA patients manage their health.',
};

export {
  healthContent,
  ArgonautReleaseNotes,
  ClinicalHealthReleaseNotes,
  CommunityCareReleaseNotes,
  FhirApiReleaseNotes,
  HealthArgonautDeprecationNotice,
  HealthArgonautDeactivationNotice,
  PgdReleaseNotes,
  UrgentCareApiIntro,
  UrgentCareDeprecationNotice,
  UrgentCareReleaseNotes,
  UrgentCareDeactivationNotice,
  ProviderDirectoryReleaseNotes,
};
