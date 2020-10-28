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

export const resetVersioning: ActionCreator<ResetVersioning> = () => ({
  type: constants.RESET_VERSIONING,
});

export const setRequestedApiVersion: ActionCreator<SetRequestedAPIVersion> = (version: string) => ({
  type: constants.SET_REQUESTED_API_VERSION,
  version,
});

export const setVersioning: ActionCreator<SetVersioning> = (
  defaultUrl: string,
  versions: VersionMetadata[] | null,
  version: string = '',
) => ({
  defaultUrl,
  type: constants.SET_VERSIONING,
  version,
  versions,
});
