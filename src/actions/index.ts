import { Action, ActionCreator } from 'redux';
import { APIMetadata } from '../types';
import * as constants from '../types/constants';

export * from './apply';

export interface ISetRequestedApiVersion extends Action {
  type: constants.SET_REQUESTED_API_VERSION;
  version: string;
}

export interface ISetInitialVersioning extends Action {
  docUrl: string;
  metadata: APIMetadata;
  type: constants.SET_INITIAL_VERSIONING;
}

export const setRequstedApiVersion: ActionCreator<ISetRequestedApiVersion> = (version: string) => {
  return {
    type: constants.SET_REQUESTED_API_VERSION,
    version,
  };
};

export const setInitialVersioning: ActionCreator<ISetInitialVersioning> = (
  docUrl: string,
  metadata: any,
) => {
  return {
    docUrl,
    metadata,
    type: constants.SET_INITIAL_VERSIONING,
  };
};
