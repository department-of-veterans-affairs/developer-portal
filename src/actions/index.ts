import { Action, ActionCreator } from 'redux';
import { VersionMetadata } from '../types';
import * as constants from '../types/constants';
import { APICategories, APICategory } from '../apiDefs/schema';

export interface ResetVersioning extends Action {
  type: constants.RESET_VERSIONING;
}

export interface SetRequestedAPIVersion extends Action {
  type: constants.SET_REQUESTED_API_VERSION;
  version: string;
}

export interface SetVersioning extends Action {
  defaultUrl: string;
  type: constants.SET_VERSIONING;
  version: string;
  versions: VersionMetadata[] | null;
}

export interface ResetAPIs extends Action {
  type: constants.RESET_APIS;
}

export interface SetAPIs extends Action {
  type: constants.SET_APIS;
  apis: APICategories;
  loaded: boolean;
  error: boolean;
}

export interface ResetGeneralStore extends Action {
  type: constants.RESET_GENERAL_STORE;
}

export interface SetGeneralStore extends Action {
  type: constants.SET_GENERAL_STORE;
  vaNetworkConnected: boolean;
  vaNetworkModal: boolean;
}

export const resetVersioning: ActionCreator<ResetVersioning> = () => ({
  type: constants.RESET_VERSIONING_VALUE,
});

export const setRequestedApiVersion: ActionCreator<SetRequestedAPIVersion> = (version: string) => ({
  type: constants.SET_REQUESTED_API_VERSION_VALUE,
  version,
});

export const setVersioning: ActionCreator<SetVersioning> = (
  defaultUrl: string,
  versions: VersionMetadata[] | null,
  version: string = '',
) => ({
  defaultUrl,
  type: constants.SET_VERSIONING_VALUE,
  version,
  versions,
});

export const setApis: ActionCreator<SetAPIs> = (apis: APICategories) => {
  const vaBenefitsCategory: APICategory = {
    ...apis.benefits,
    apis: apis.appeals.apis.concat(apis.benefits.apis),
    name: 'VA Benefits',
    properName: 'VA Benefits',
    urlSlug: 'va-benefits',
  };
  delete apis.appeals;
  delete apis.benefits;
  apis['va-benefits'] = vaBenefitsCategory;

  return {
    apis,
    error: false,
    loaded: true,
    type: constants.SET_APIS_VALUE,
  };
};

export const setApiLoadingError: ActionCreator<SetAPIs> = () => ({
  apis: {},
  error: true,
  loaded: false,
  type: constants.SET_APIS_VALUE,
});

export const setGeneralStore: ActionCreator<SetGeneralStore> = (
  vaNetworkModal: boolean,
  vaNetworkConnected: boolean,
) => ({
  type: constants.SET_GENERAL_STORE_VALUE,
  vaNetworkConnected,
  vaNetworkModal,
});
