import { IErrorableInput } from './form';

export interface IApiList {
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

export interface IApplyInputs {
  apis: IApiList;
  description: IErrorableInput;
  email: IErrorableInput;
  firstName: IErrorableInput;
  lastName: IErrorableInput;
  oAuthApplicationType: IErrorableInput;
  oAuthRedirectURI: IErrorableInput;
  organization: IErrorableInput;
  termsOfService: boolean;
}

export interface IApplySuccessResult {
  email: string;
  token: string;
  clientID: string;
  clientSecret: string;
  apis: IApiList;
}

export interface IApplication {
  inputs: IApplyInputs;
  sending: boolean;
  errorStatus?: string;
  result?: IApplySuccessResult;
}