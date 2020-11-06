import { Map, OrderedMap } from 'immutable';
import { RequestOptions, SwaggerMapValues } from 'swagger-client';
import { System as BaseSystem } from 'swagger-ui';
import { OutputSelector } from 'reselect';
import { VersionMetadata } from '../../../types';

/**
 * COMPONENT PLUGINS
 */
export interface ParametersProps {
  system: System;
  operation: OrderedMap<string, SwaggerMapValues>;
}

/**
 * ACTION PLUGINS
 */
export interface SetVersionMetadataAction {
  payload: VersionMetadata[] | null;
  type: string;
}

export interface SetAPIVersionAction {
  payload: string;
  type: string;
}

export interface UpdateVersionAction {
  type: string;
}

export interface SwaggerVersionActions {
  actions: {
    setVersionMetadata: (metadata: VersionMetadata[] | null) => SetVersionMetadataAction;
    setApiVersion: (version: string) => SetAPIVersionAction;
    updateVersion: (version: string) => UpdateVersionAction;
  };
}

/**
 * REDUCER PLUGINS
 */
export interface SwaggerVersionReducers {
  reducers: {
    API_VERSION_SET: (
      state: Map<string, unknown>,
      action: SetAPIVersionAction,
    ) => Map<string, unknown>;

    VERSION_METADATA_SET: (
      state: Map<string, unknown>,
      action: SetVersionMetadataAction,
    ) => Map<string, unknown>;
  };
}

/**
 * SELECTOR PLUGINS
 */
export interface SwaggerVersionSelectors {
  selectors: {
    versionMetadata: (state: Map<string, unknown>) => VersionMetadata[] | null;
    apiName: (state: Map<string, unknown>) => string;
    apiVersion: (state: Map<string, unknown>) => string;
    majorVersion: OutputSelector<Map<string, unknown>, string, (result: string) => string>;
  };
}

/**
 * PLUGINS
 */
export interface SwaggerPlugins {
  components: { [name: string]: React.ComponentType };
  wrapComponents: {
    parameters: (
      Original: React.ComponentType<ParametersProps>,
      system: System,
    ) => React.ComponentType<ParametersProps>;
  };

  fn: {
    curlify: (options: RequestOptions) => string;
  };

  statePlugins: {
    version: SwaggerVersionActions & SwaggerVersionReducers & SwaggerVersionSelectors;
    spec: {
      wrapSelectors: {
        allowTryItOutFor: () => () => boolean;
      };
    };
  };
}

/**
 * SYSTEM WITH PLUGINS
 */
export interface System extends BaseSystem {
  versionActions: {
    setApiVersion: (version: string) => void;
    setVersionMetadata: (meta: VersionMetadata[] | null) => void;
    updateVersion: (version: string) => void;
  };

  versionSelectors: {
    majorVersion: () => string;
    versionMetadata: () => VersionMetadata[] | null;
    apiVersion: () => string;
  };
}
