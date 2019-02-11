import { RouterState  } from 'react-router-redux'

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
  facilities: boolean;
  health: boolean;
  verification: boolean;
}

export interface IExternalSwagger {
  fetched: boolean;
  loading: boolean;
  error?: string;
  swagger: object;
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
  inputs: IApplicationInputs,
  sending: boolean;
  errorStatus?: string;
  token: string;
  clientID: string;
  clientSecret: string;
}

export interface IRootState {
  application: IApplication;
  routing: RouterState;
}
