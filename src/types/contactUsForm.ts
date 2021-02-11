export const enum FormType {
  CONSUMER = 'DEFAULT',
  PUBLISHING = 'PUBLISHING',
}

export interface ContactUsFormState {
  firstName: string;
  lastName: string;
  email: string;
  organization?: string;
  description: string;
  type: FormType;
  apiDetails: string;
  apiDescription?: string;
  apiInternalOnly: 'yes' | 'no';
  apiInternalOnlyDetails: string;
  apiOtherInfo?: string;
}

interface ContactDetailsFormData {
  email: string;
  firstName: string;
  lastName: string;
  organization: string;
}

/*
 * These SubmissionData types are for the data being submitted to the backend by the form, as such
 * they are stricter than the form data types and enforce that we only submit data for the version
 * of the form being submitted (so that you're not submitting api details with the consumer version and such)
 */
type ConsumerSubmissionData = {
  type: FormType.CONSUMER;
  description: string;
} & ContactDetailsFormData;

type PublishingSubmissionData = {
  type: FormType.PUBLISHING;
  apiDetails: string;
  apiDescription: string;
  apiInternalOnly: boolean;
  apiInternalOnlyDetails: string;
  apiOtherInfo: string;
} & ContactDetailsFormData;

export type SubmissionData = ConsumerSubmissionData | PublishingSubmissionData;
