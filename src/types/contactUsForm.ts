export const enum FormType {
  CONSUMER = 'DEFAULT',
  PUBLISHING = 'PUBLISHING',
}

export interface SupportContactUsFormState {
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

type DefaultFormData = {
  type: FormType.CONSUMER;
  description: string;
} & ContactDetailsFormData;

type PublishingFormData = {
  type: FormType.PUBLISHING;
  apiDetails: string;
  apiDescription: string;
  apiInternalOnly: boolean;
  apiInternalOnlyDetails: string;
  apiOtherInfo: string;
} & ContactDetailsFormData;

export type FormData = DefaultFormData | PublishingFormData;
