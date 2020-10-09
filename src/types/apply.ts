import { IErrorableInput } from './form';

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
  description: IErrorableInput;
  email: IErrorableInput;
  firstName: IErrorableInput;
  lastName: IErrorableInput;
  oAuthApplicationType: IErrorableInput;
  oAuthRedirectURI: IErrorableInput;
  organization: IErrorableInput;
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
