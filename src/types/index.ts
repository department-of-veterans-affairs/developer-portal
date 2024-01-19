import axe from 'axe-core';
import { compose } from 'redux';
import { APICategories } from '../apiDefs/schema';

declare global {
  interface Window {
    axe: typeof axe;
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

export interface APIUrlSlug {
  urlSlug: string;
}

export interface APINameParam {
  apiName?: string;
  apiCategoryKey: string;
  urlFragment?: string;
}

export interface VersionMetadata {
  healthcheck: string;
  internal_only: boolean;
  label?: string;
  path: string;
  sf_path: string;
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

export interface GeneralStore {
  vaNetworkModal: boolean;
  vaNetworkConnected: boolean;
}

export interface ScrollPosition {
  position: number;
}

export interface UserStore {
  id: number;
  testUserHash: string;
}

export interface RootState {
  apiVersioning: APIVersioning;
  apiList: ApiList;
  generalStore: GeneralStore;
  scrollPosition: ScrollPosition;
  userStore: UserStore;
}
