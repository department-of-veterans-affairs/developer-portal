import axe from 'axe-core';
import { compose } from 'redux';
import { APICategories } from '../apiDefs/schema';

declare global {
  interface Window {
    axe: typeof axe;
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

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

export interface ApiList {
  apis: APICategories;
  error: boolean;
  loaded: boolean;
}

export interface RootState {
  oAuthApiSelection: OAuthAPISelection;
  apiVersioning: APIVersioning;
  apiList: ApiList;
}
