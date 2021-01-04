import { DevApplication } from './apply';

export * from './apply';
export * from './form';

export interface APINameParam {
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

export interface APIVersioning {
  defaultUrl: string;
  versions: VersionMetadata[] | null;
  requestedApiVersion: string;
}

export interface OAuthAPISelection {
  selectedOAuthApi: string;
}

export interface RootState {
  oAuthApiSelection: OAuthAPISelection;
  apiVersioning: APIVersioning;
  application: DevApplication;
}

export interface SerializedState {
  application: Pick<DevApplication, 'inputs'>;
}
