import { APICategoryContent } from '../../../apiDefs/schema';
import AddressValidationReleaseNotes from './addressValidationReleaseNotes.mdx';
import VerificationIntro from './verificationIntro.mdx';
import VerificationOverview from './verificationOverview.mdx';
import VeteranConfirmationReleaseNotes from './veteranConfirmationReleaseNotes.mdx';
import VeteranVerificationReleaseNotes from './veteranVerificationReleaseNotes.mdx';

const verificationContent: APICategoryContent = {
  intro: VerificationIntro,
  overview: VerificationOverview,
  placardText: 'Empowering Veterans to take control of their data and put it to work.',
  shortDescription: 'Empowering Veterans to take control of their data and put it to work.',
};

export {
  verificationContent,
  AddressValidationReleaseNotes,
  VeteranConfirmationReleaseNotes,
  VeteranVerificationReleaseNotes,
};
