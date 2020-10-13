import { System as BaseSystem } from 'swagger-ui';
import { APIMetadata } from '../../../types';

/**
 * SYSTEM WITH PLUGINS
 */
export interface System extends BaseSystem {
  versionActions: {
    setApiVersion: (version: string) => void;
    setApiMetadata: (meta: APIMetadata) => void;
    updateVersion: (version: string) => void;
  };

  versionSelectors: {
    majorVersion: () => string;
    apiMetadata: () => APIMetadata;
    apiVersion: () => string;
  };
}
