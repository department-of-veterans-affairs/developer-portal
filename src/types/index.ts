import { RouterState } from 'connected-react-router';
import { IApplication } from './apply';

export * from './apply';
export * from './form';

export interface IApiNameParam {
  apiName?: string;
  apiCategoryKey: string;
}

export interface VersionMetadata {
  version: string;
  path: string;
  status: string;
  internal_only: boolean;
  healthcheck: string;
}

export interface APIMetadata {
  meta: {
    versions: VersionMetadata[];
  };
}

export interface IApiVersioning {
  docUrl: string;
  metadata: APIMetadata | null;
  requestedApiVersion: string;
}

export interface IRootState {
  apiVersioning: IApiVersioning;
  application: IApplication;
  router: RouterState;
}
