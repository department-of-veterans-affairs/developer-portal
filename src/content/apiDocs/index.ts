import BenefitsOverview from './benefits/benefitsOverview.mdx';
import FacilitiesOverview from './facilities/facilitiesOverview.mdx';
import CommunityCareApiIntro from './health/communityCareApiIntro.mdx';
import FhirArgonautApiIntro from './health/fhirArgonautApiIntro.mdx';
import FhirDSTU2ApiIntro from './health/fhirDSTU2ApiIntro.mdx'
import FhirR4ApiIntro from './health/fhirR4ApiIntro.mdx';
import HealthOverview from './health/healthOverview.mdx';
import UrgentCareApiIntro from './health/urgentCareApiIntro.mdx';
import VerificationOverview from './verification/verificationOverview.mdx';

const benefitsContent = {
  overview: BenefitsOverview,
}

const facilitiesContent = {
  overview: FacilitiesOverview,
}

const healthContent = {
  overview: HealthOverview,
}

const verificationContent = {
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
  UrgentCareApiIntro }
