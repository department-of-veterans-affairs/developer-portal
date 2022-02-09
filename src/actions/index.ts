import { Action, ActionCreator } from 'redux';
import { VersionMetadata } from '../types';
import * as constants from '../types/constants';
import { APICategories } from '../apiDefs/schema';

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

export interface ResetOAuthAPISelection extends Action {
  type: constants.RESET_OAUTH_API_SELECTION;
}

export interface SetOAuthAPISelection extends Action {
  type: constants.SET_OAUTH_API_SELECTION;
  selectedOAuthApi: string;
}

export interface ResetAPIs extends Action {
  type: constants.RESET_APIS;
}

export interface SetAPIs extends Action {
  type: constants.SET_APIS;
  apis: APICategories;
  loaded: true;
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

export const resetOAuthApiSelection: ActionCreator<ResetOAuthAPISelection> = () => ({
  type: constants.RESET_OAUTH_API_SELECTION_VALUE,
});

export const setOAuthApiSelection: ActionCreator<SetOAuthAPISelection> = (
  selectedOAuthApi: string,
) => ({
  selectedOAuthApi,
  type: constants.SET_OAUTH_API_SELECTION_VALUE,
});

export const setApis: ActionCreator<SetAPIs> = (apis: APICategories) => ({
  apis,
  loaded: true,
  type: constants.SET_APIS_VALUE,
});
