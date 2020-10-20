import { Map, OrderedMap } from 'immutable';
import { RequestOptions, SwaggerMapValues } from 'swagger-client';
import { System as BaseSystem } from 'swagger-ui';
import { OutputSelector } from 'reselect';
import { APIMetadata } from '../../../types';

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
export interface SetAPIMetadataAction {
  payload: APIMetadata;
  type: string;
}

export interface SetAPIVersionAction {
  payload: string;
  type: string;
}

interface UpdateVersionAction {
  type: string;
}

export interface SwaggerVersionActions {
  actions: {
    setApiMetadata: (metadata: APIMetadata) => SetAPIMetadataAction;
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

    API_METADATA_SET: (
      state: Map<string, unknown>,
      action: SetAPIMetadataAction,
    ) => Map<string, unknown>;
  };
}

/**
 * SELECTOR PLUGINS
 */
export interface SwaggerVersionSelectors {
  selectors: {
    apiMetadata: (state: Map<string, unknown>) => APIMetadata;
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
    setApiMetadata: (meta: APIMetadata) => void;
    updateVersion: (version: string) => void;
  };

  versionSelectors: {
    majorVersion: () => string;
    apiMetadata: () => APIMetadata;
    apiVersion: () => string;
  };
}
