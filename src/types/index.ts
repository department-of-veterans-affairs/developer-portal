import { RouterState } from 'connected-react-router';
import { IApplication } from './apply';

export * from './apply';
export * from './form';

export interface IApiNameParam {
  apiName?: string;
  apiCategoryKey: string;
}

export interface IApiVersioning {
  docUrl: string;
  metadata: any;
  requestedApiVersion: string;
}

export interface IRootState {
  apiVersioning: IApiVersioning;
  application: IApplication;
  router: RouterState;
}
