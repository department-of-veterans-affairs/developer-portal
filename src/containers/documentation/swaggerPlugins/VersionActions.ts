import { APIMetadata } from '../../../types';
import { SwaggerVersionActions } from './types';

export const VersionActions = (
  updateVersionHandler: (newVersion: string) => void,
): SwaggerVersionActions => ({
  actions: {
    setApiMetadata: (metadata: APIMetadata) => ({
      payload: metadata,
      type: 'API_METADATA_SET',
    }),
    setApiVersion: (version: string) => ({
      payload: version,
      type: 'API_VERSION_SET',
    }),
    updateVersion: (version: string) => {
      updateVersionHandler(version);
      return {
        type: 'API_VERSION_UPDATED',
      };
    },
  },
});
