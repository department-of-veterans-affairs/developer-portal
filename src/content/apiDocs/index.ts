import { IApiCategoryContent } from '../../apiDefs/schema';
import AppealsIntro from './appeals/appealsIntro.mdx';
import AppealsOverview from './appeals/appealsOverview.mdx';
import AppealsQuickstart from './appeals/appealsQuickstart.mdx';
import AppealsReleaseNotes from './appeals/appealsReleaseNotes.mdx';
import BenefitsIntro from './benefits/benefitsIntro.mdx';
import BenefitsOverview from './benefits/benefitsOverview.mdx';
import BenefitsReleaseNotes from './benefits/benefitsReleaseNotes.mdx';
import FacilitiesIntro from './facilities/facilitiesIntro.mdx';
import FacilitiesOverview from './facilities/facilitiesOverview.mdx';
import FacilitiesReleaseNotes from './facilities/facilitiesReleaseNotes.mdx';
import HealthArgonautPostDeprecation from './health/argonautDeprecatedNotice.mdx';
import HealthArgonautPreDeprecation from './health/argonautDeprecationNotice.mdx';
import CommunityCareApiIntro from './health/communityCareApiIntro.mdx';
import FhirArgonautApiIntro from './health/fhirArgonautApiIntro.mdx';
import FhirDSTU2ApiIntro from './health/fhirDSTU2ApiIntro.mdx';
import FhirR4ApiIntro from './health/fhirR4ApiIntro.mdx';
import HealthIntro from './health/healthIntro.mdx';
import HealthOverview from './health/healthOverview.mdx';
import HealthQuickstart from './health/healthQuickstart.mdx';
import HealthReleaseNotes from './health/healthReleaseNotes.mdx';
import UrgentCareApiIntro from './health/urgentCareApiIntro.mdx';
import vaFormsIntro from './vaForms/vaFormsIntro.mdx';
import vaFormsOverview from './vaForms/vaFormsOverview.mdx';
import vaFormsReleaseNotes from './vaForms/vaFormsReleaseNotes.mdx';
import VerificationIntro from './verification/verificationIntro.mdx';
import VerificationOverview from './verification/verificationOverview.mdx';
import VerificationReleaseNotes from './verification/verificationReleaseNotes.mdx';

const appealsContent: IApiCategoryContent = {
  intro: AppealsIntro,
  overview: AppealsOverview,
  placardText: 'Build tools to help Veterans electronically manage, submit, and track appeals.',
  quickstart: AppealsQuickstart,
  releaseNotes: AppealsReleaseNotes,
  shortDescription:
    'Enables managing benefit decision appeals on behalf of a Veteran.',
};

const benefitsContent: IApiCategoryContent = {
  intro: BenefitsIntro,
  overview: BenefitsOverview,
  placardText: 'Submit benefits-related PDFs',
  releaseNotes: BenefitsReleaseNotes,
  shortDescription:
    'Enables approved organizations to submit benefits-related PDFs and access information on a Veteran’s behalf.',
};

const facilitiesContent: IApiCategoryContent = {
  intro: FacilitiesIntro,
  overview: FacilitiesOverview,
  placardText: 'Access information about VA facilities',
  releaseNotes: FacilitiesReleaseNotes,
  shortDescription:
    'Use the VA Facility API to find relevant information about a specific VA facility.',
};

const healthContent: IApiCategoryContent = {
  intro: HealthIntro,
  overview: HealthOverview,
  placardText: "View medical records and manage Veteran's health",
  quickstart: HealthQuickstart,
  releaseNotes: HealthReleaseNotes,
  shortDescription: 'Use our APIs to build tools that help Veterans manage their health.',
};

const vaFormsContent: IApiCategoryContent = {
  intro: vaFormsIntro,
  overview: vaFormsOverview,
  placardText: 'Look up VA forms and check for new versions.',
  releaseNotes: vaFormsReleaseNotes,
  shortDescription: 'Look up VA forms and check for new versions.',
};

const verificationContent: IApiCategoryContent = {
  intro: VerificationIntro,
  overview: VerificationOverview,
  placardText: 'Verify Veteran status for job sites, e-commerce sites, and third-party benefit sites',
  releaseNotes: VerificationReleaseNotes,
  shortDescription: 'Empowering Veterans to take control of their data and put it to work.',
};

export {
  appealsContent,
  benefitsContent,
  facilitiesContent,
  healthContent,
  vaFormsContent,
  verificationContent,
  CommunityCareApiIntro,
  FhirArgonautApiIntro,
  FhirDSTU2ApiIntro,
  FhirR4ApiIntro,
  HealthArgonautPostDeprecation,
  HealthArgonautPreDeprecation,
  UrgentCareApiIntro };
