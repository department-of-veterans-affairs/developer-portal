import { Action, ActionCreator } from 'redux';
import { VersionMetadata } from '../types';
import * as constants from '../types/constants';

export * from './apply';

export interface SetRequestedAPIVersion extends Action {
  type: constants.SET_REQUESTED_API_VERSION;
  version: string;
}

export interface SetInitialVersioning extends Action {
  docUrl: string;
  versions: VersionMetadata[];
  type: constants.SET_INITIAL_VERSIONING;
}

export const setRequstedApiVersion: ActionCreator<SetRequestedAPIVersion> = (version: string) => ({
  type: constants.SET_REQUESTED_API_VERSION,
  version,
});

export const setInitialVersioning: ActionCreator<SetInitialVersioning> = (
  docUrl: string,
  versions: VersionMetadata[],
) => ({
  docUrl,
  type: constants.SET_INITIAL_VERSIONING,
  versions,
});
