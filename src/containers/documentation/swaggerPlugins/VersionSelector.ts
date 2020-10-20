import { Map } from 'immutable';
import { createSelector } from 'reselect';
import { APIMetadata } from '../../../types';

const apiVersion = (state: Map<string, unknown>): string => state.get('apiVersion') as string;
export const VersionSelector = {
  selectors: {
    apiMetadata: (state: Map<string, unknown>): APIMetadata =>
      state.get('apiMetadata') as APIMetadata,
    apiName: (state: Map<string, unknown>): string => state.get('apiName') as string,
    apiVersion: (state: Map<string, unknown>): string => state.get('apiVersion') as string,
    majorVersion: createSelector(
      apiVersion,
      (version: string): string => (version ? version.substring(0, 1) : '0'),
    ),
  },
};
