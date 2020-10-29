import { VersionMetadata } from '../../../types';
import {
  SetAPIVersionAction,
  SetVersionMetadataAction,
  SwaggerVersionActions,
  UpdateVersionAction,
} from './types';

export const VersionActions = (
  updateVersionHandler: (newVersion: string) => void,
): SwaggerVersionActions => ({
  actions: {
    setApiVersion: (version: string): SetAPIVersionAction => ({
      payload: version,
      type: 'API_VERSION_SET',
    }),
    setVersionMetadata: (metadata: VersionMetadata[] | null): SetVersionMetadataAction => ({
      payload: metadata,
      type: 'VERSION_METADATA_SET',
    }),
    updateVersion: (version: string): UpdateVersionAction => {
      updateVersionHandler(version);
      return {
        type: 'API_VERSION_UPDATED',
      };
    },
  },
});
