import { RouterState } from 'react-router-redux';

export interface IApiNameParam {
  apiName?: string;
  apiCategoryKey: string;
}

export interface IErrorableInput {
  dirty: boolean;
  value: string;
  validation?: string;
}

export interface IApiList {
  appeals: boolean;
  benefits: boolean;
  claims: boolean;
  facilities: boolean;
  health: boolean;
  vaForms: boolean;
  verification: boolean;
  communityCare: boolean;
}

export interface IApplicationInputs {
  apis: IApiList;
  description: IErrorableInput;
  email: IErrorableInput;
  firstName: IErrorableInput;
  lastName: IErrorableInput;
  oAuthRedirectURI: IErrorableInput;
  organization: IErrorableInput;
  termsOfService: boolean;
}

export interface IApplication {
  inputs: IApplicationInputs;
  sending: boolean;
  errorStatus?: string;
  token: string;
  clientID: string;
  clientSecret: string;
}

export interface IApiVersioning {
  docUrl: string;
  metadata: any;
  requestedApiVersion: string;
}

export interface IRootState {
  apiVersioning: IApiVersioning;
  application: IApplication;
  routing: RouterState;
}
