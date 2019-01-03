import { RouterState  } from 'react-router-redux'

export interface IApiNameParam {
  apiName?: string;
  apiCategory: string;
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

export interface IApplication {
  description: IErrorableInput;
  email: IErrorableInput;
  firstName: IErrorableInput;
  lastName: IErrorableInput;
  organization: IErrorableInput;
  apis: IApiList;
  sending: boolean;
  errorStatus?: string;
  token: string;
}

export interface IRootState {
  application: IApplication;
  routing: RouterState;
}
