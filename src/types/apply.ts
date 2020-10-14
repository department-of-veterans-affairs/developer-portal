import { ErrorableInput } from './form';

export interface APIList {
  appeals: boolean;
  benefits: boolean;
  claims: boolean;
  confirmation: boolean;
  facilities: boolean;
  health: boolean;
  vaForms: boolean;
  verification: boolean;
  communityCare: boolean;
}

export interface ApplyInputs {
  apis: APIList;
  description: ErrorableInput;
  email: ErrorableInput;
  firstName: ErrorableInput;
  lastName: ErrorableInput;
  oAuthApplicationType: ErrorableInput;
  oAuthRedirectURI: ErrorableInput;
  organization: ErrorableInput;
  termsOfService: boolean;
}

export interface ApplySuccessResult {
  email: string;
  token: string;
  clientID: string;
  clientSecret: string;
  apis: APIList;
}

export interface DevApplication {
  inputs: ApplyInputs;
  sending: boolean;
  errorStatus?: string;
  result?: ApplySuccessResult;
}

export interface DevApplicationRequest {
  email: string;
  firstName: string;
  lastName: string;
  organization: string;
  description: string;
  apis: string;
  oAuthApplicationType: string;
  oAuthRedirectURI: string;
  termsOfService: boolean;
}

export interface DevApplicationResponse {
  token?: string;
  clientID?: string;
  clientSecret?: string;
  errors?: string[];
}
