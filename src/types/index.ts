import { RouterState } from 'connected-react-router';
import { DevApplication } from './apply';

export * from './apply';
export * from './form';

export interface APINameParam {
  apiName?: string;
  apiCategoryKey: string;
}

export interface APIVersioning {
  docUrl: string;
  metadata: any;
  requestedApiVersion: string;
}

export interface RootState {
  apiVersioning: APIVersioning;
  application: DevApplication;
  router: RouterState;
}
