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
  apis: APIList;
  clientID: string;
  clientSecret: string;
  email: string;
  kongUsername: string;
  token: string;
  redirectURI: string;
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
  token: string;
  clientID: string;
  clientSecret: string;
  redirectURI: string;
  kongUsername: string;
  errors?: string[];
}
