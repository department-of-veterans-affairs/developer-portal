import { Map } from 'immutable';
import { createSelector } from 'reselect';
import { VersionMetadata } from '../../../types';

const apiVersion = (state: Map<string, unknown>): string => state.get('apiVersion') as string;
export const VersionSelector = {
  selectors: {
    apiName: (state: Map<string, unknown>): string => state.get('apiName') as string,
    apiVersion: (state: Map<string, unknown>): string => state.get('apiVersion') as string,
    majorVersion: createSelector(apiVersion, (version: string | undefined): string => {
      const unPrefixedVersion = version?.split('-').pop() ?? '';
      return version ? unPrefixedVersion.substring(0, 1) : '';
    }),
    versionMetadata: (state: Map<string, unknown>): VersionMetadata[] | null =>
      state.get('versionMetadata') as VersionMetadata[] | null,
  },
};
