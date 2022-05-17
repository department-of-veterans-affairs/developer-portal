export * from './forms/apply';

export interface APINameParam {
  apiName?: string;
  apiCategoryKey: string;
}

export interface VersionMetadata {
  healthcheck: string;
  internal_only: boolean;
  label?: string;
  path: string;
  status: string;
  version: string;
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
}
