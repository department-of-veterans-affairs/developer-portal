import PropTypes from 'prop-types';

export const enum FormType {
  DEFAULT = 'DEFAULT',
  PUBLISHING = 'PUBLISHING',
}

export const SupportContactUsFormPropTypes = {
  defaultType: PropTypes.oneOf([FormType.DEFAULT, FormType.PUBLISHING]).isRequired,
  onSuccess: PropTypes.func.isRequired,
};

export type SupportContactUsFormProps = PropTypes.InferProps<typeof SupportContactUsFormPropTypes>;

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
  type: FormType.DEFAULT;
  description: string;
} & ContactDetailsFormData;

type PublishingFormData = {
  type: FormType.PUBLISHING;
  apiDetails: string;
  apiDescription: string;
  apiInternalOnly: boolean;
  apiOtherInfo: string;
} & ContactDetailsFormData;

export type FormData = DefaultFormData | PublishingFormData;
