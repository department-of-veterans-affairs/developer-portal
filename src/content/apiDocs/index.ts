import { IApiCategoryContent } from '../../apiDefs/schema';
import AppealsIntro from './appeals/appealsIntro.mdx';
import AppealsOverview from './appeals/appealsOverview.mdx';
import AppealsQuickstart from './appeals/appealsQuickstart.mdx';
import BenefitsIntro from './benefits/benefitsIntro.mdx';
import BenefitsOverview from './benefits/benefitsOverview.mdx';
import FacilitiesIntro from './facilities/facilitiesIntro.mdx';
import FacilitiesOverview from './facilities/facilitiesOverview.mdx';
import HealthArgonautPostDeprecation from './health/argonautDeprecatedNotice.mdx';
import HealthArgonautPreDeprecation from './health/argonautDeprecationNotice.mdx';
import CommunityCareApiIntro from './health/communityCareApiIntro.mdx';
import FhirArgonautApiIntro from './health/fhirArgonautApiIntro.mdx';
import FhirDSTU2ApiIntro from './health/fhirDSTU2ApiIntro.mdx';
import FhirR4ApiIntro from './health/fhirR4ApiIntro.mdx';
import HealthIntro from './health/healthIntro.mdx';
import HealthOverview from './health/healthOverview.mdx';
import HealthQuickstart from './health/healthQuickstart.mdx';
import UrgentCareApiIntro from './health/urgentCareApiIntro.mdx';
import VerificationIntro from './verification/verificationIntro.mdx';
import VerificationOverview from './verification/verificationOverview.mdx';

const appealsContent: IApiCategoryContent = {
  intro: AppealsIntro,
  overview: AppealsOverview,
  quickstart: AppealsQuickstart,
};

const benefitsContent: IApiCategoryContent = {
  intro: BenefitsIntro,
  overview: BenefitsOverview,
};

const facilitiesContent: IApiCategoryContent = {
  intro: FacilitiesIntro,
  overview: FacilitiesOverview,
};

const healthContent: IApiCategoryContent = {
  intro: HealthIntro,
  overview: HealthOverview,
  quickstart: HealthQuickstart,
};

const verificationContent: IApiCategoryContent = {
  intro: VerificationIntro,
  overview: VerificationOverview,
};

export {
  appealsContent,
  benefitsContent,
  facilitiesContent,
  healthContent,
  verificationContent,
  CommunityCareApiIntro,
  FhirArgonautApiIntro,
  FhirDSTU2ApiIntro,
  FhirR4ApiIntro,
  HealthArgonautPostDeprecation,
  HealthArgonautPreDeprecation,
  UrgentCareApiIntro };