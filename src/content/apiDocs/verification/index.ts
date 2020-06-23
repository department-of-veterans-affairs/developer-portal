import { IApiCategoryContent } from '../../../apiDefs/schema';
import AddressValidationReleaseNotes from './addressValidationReleaseNotes.mdx';
import VerificationIntro from './verificationIntro.mdx';
import VerificationOverview from './verificationOverview.mdx';
import VeteranConfirmationReleaseNotes from './veteranConfirmationReleaseNotes.mdx';
import VeteranVerificationReleaseNotes from './veteranVerificationReleaseNotes.mdx';

const verificationContent: IApiCategoryContent = {
  intro: VerificationIntro,
  overview: VerificationOverview,
  placardText: 'Verify Veteran status for job sites, e-commerce sites, and third-party benefit sites',
  shortDescription: 'Empowering Veterans to take control of their data and put it to work.',
};

export {
  verificationContent,
  AddressValidationReleaseNotes,
  VeteranConfirmationReleaseNotes,
  VeteranVerificationReleaseNotes,
};
