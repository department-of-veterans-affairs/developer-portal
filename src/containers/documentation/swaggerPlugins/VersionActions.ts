import { VersionMetadata } from '../../../types';
import { SwaggerVersionActions } from './types';

export const VersionActions = (
  updateVersionHandler: (newVersion: string) => void,
): SwaggerVersionActions => ({
  actions: {
    setApiVersion: (version: string) => ({
      payload: version,
      type: 'API_VERSION_SET',
    }),
    setVersionMetadata: (metadata: VersionMetadata[]) => ({
      payload: metadata,
      type: 'VERSION_METADATA_SET',
    }),
    updateVersion: (version: string) => {
      updateVersionHandler(version);
      return {
        type: 'API_VERSION_UPDATED',
      };
    },
  },
});
