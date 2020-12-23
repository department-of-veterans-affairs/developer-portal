import { Action, ActionCreator } from 'redux';
import { VersionMetadata } from '../types';
import * as constants from '../types/constants';

export * from './apply';

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

export interface ResetAPISelection extends Action {
  type: constants.RESET_API_SELECTION;
}

export interface SetAPISelection extends Action {
  type: constants.SET_API_SELECTION;
  selectedApi: string;
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

export const resetApiSelection: ActionCreator<ResetAPISelection> = () => ({
  type: constants.RESET_API_SELECTION_VALUE,
});

export const setApiSelection: ActionCreator<SetAPISelection> = (selectedApi: string) => ({
  selectedApi,
  type: constants.SET_API_SELECTION_VALUE,
});
