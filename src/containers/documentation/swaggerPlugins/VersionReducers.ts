import { Map } from 'immutable';
import { SetVersionMetadataAction, SetAPIVersionAction, SwaggerVersionReducers } from './types';

export const VersionReducers: SwaggerVersionReducers = {
  reducers: {
    API_VERSION_SET: (
      state: Map<string, unknown>,
      action: SetAPIVersionAction,
    ): Map<string, unknown> => state.set('apiVersion', action.payload),
    VERSION_METADATA_SET: (
      state: Map<string, unknown>,
      action: SetVersionMetadataAction,
    ): Map<string, unknown> => state.set('versionMetadata', action.payload),
  },
};
