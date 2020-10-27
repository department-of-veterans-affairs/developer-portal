import { Action, ActionCreator } from 'redux';
import { VersionMetadata } from '../types';
import * as constants from '../types/constants';

export * from './apply';

export interface SetRequestedAPIVersion extends Action {
  type: constants.SET_REQUESTED_API_VERSION;
  version: string;
}

export interface SetVersioning extends Action {
  docUrl: string;
  type: constants.SET_VERSIONING;
  version?: string;
  versions: VersionMetadata[] | null;
}

export const setRequstedApiVersion: ActionCreator<SetRequestedAPIVersion> = (version: string) => ({
  type: constants.SET_REQUESTED_API_VERSION,
  version,
});

export const setVersioning: ActionCreator<SetVersioning> = (
  docUrl: string,
  version: string,
  versions: VersionMetadata[] | null,
) => ({
  docUrl,
  type: constants.SET_VERSIONING,
  version,
  versions,
});
