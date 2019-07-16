import BenefitsIntro from './benefits/benefitsIntro.mdx';
import BenefitsOverview from './benefits/benefitsOverview.mdx';
import FacilitiesIntro from './facilities/facilitiesIntro.mdx';
import FacilitiesOverview from './facilities/facilitiesOverview.mdx';
import HealthArgonautDeprecation from './health/argonautDeprecationNotice.mdx';
import CommunityCareApiIntro from './health/communityCareApiIntro.mdx';
import FhirArgonautApiIntro from './health/fhirArgonautApiIntro.mdx';
import FhirDSTU2ApiIntro from './health/fhirDSTU2ApiIntro.mdx'
import FhirR4ApiIntro from './health/fhirR4ApiIntro.mdx';
import HealthIntro from './health/healthIntro.mdx';
import HealthOverview from './health/healthOverview.mdx';
import HealthQuickstart from './health/healthQuickstart.mdx';
import LegacyHealthIntro from './health/legacyHealthIntro.mdx';
import UrgentCareApiIntro from './health/urgentCareApiIntro.mdx';
import VerificationIntro from './verification/verificationIntro.mdx';
import VerificationOverview from './verification/verificationOverview.mdx';

const isNewFhirApiEnabled = process.env.REACT_APP_FHIR_API_ENABLED === 'true';

const benefitsContent = {
  intro: BenefitsIntro,
  overview: BenefitsOverview,
}

const facilitiesContent = {
  intro: FacilitiesIntro,
  overview: FacilitiesOverview,
}

const healthContent = {
  intro: isNewFhirApiEnabled ? HealthIntro : LegacyHealthIntro,
  overview: HealthOverview,
  quickstart: isNewFhirApiEnabled ? HealthQuickstart : undefined,
}

const verificationContent = {
  intro: VerificationIntro,
  overview: VerificationOverview,
}

export {
  benefitsContent,
  facilitiesContent,
  healthContent,
  verificationContent,
  CommunityCareApiIntro,
  FhirArgonautApiIntro,
  FhirDSTU2ApiIntro,
  FhirR4ApiIntro,
  HealthArgonautDeprecation,
  UrgentCareApiIntro }
