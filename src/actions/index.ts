import { Action, ActionCreator } from 'redux';
import { APIMetadata } from '../types';
import * as constants from '../types/constants';

export * from './apply';

export interface SetRequestedAPIVersion extends Action {
  type: constants.SET_REQUESTED_API_VERSION;
  version: string;
}

export interface SetInitialVersioning extends Action {
  docUrl: string;
  metadata: APIMetadata;
  type: constants.SET_INITIAL_VERSIONING;
  version?: string;
}

export const setRequstedApiVersion: ActionCreator<SetRequestedAPIVersion> = (version: string) => ({
  type: constants.SET_REQUESTED_API_VERSION,
  version,
});

export const setInitialVersioning: ActionCreator<SetInitialVersioning> = (
  docUrl: string,
  metadata: APIMetadata,
  version: string,
) => ({
  docUrl,
  metadata,
  type: constants.SET_INITIAL_VERSIONING,
  version,
});
