import { curlify } from './curlify';
import ExtendedLayout from './ExtendedLayout';
import OperationTag from './OperationTag';
import './StyleOverride.scss';
import { VersionActions } from './VersionActions';
import { VersionReducers } from './VersionReducers';
import { VersionSelector } from './VersionSelector';
import { WrapHighlightCode } from './WrapHighlightCode';
import { WrapParameters } from './WrapParameters';

export * from './types';
export function SwaggerPlugins(versionHandler: any) {
  return {
    components: {
      ExtendedLayout,
      OperationTag,
      ServersContainer: () => null,
      authorizeBtn: () => null,
    },
    fn: {
      curlify,
    },
    statePlugins: {
      spec: {
        wrapSelectors: {
          allowTryItOutFor: () => () => false,
        },
      },
      version: {
        ...VersionActions(versionHandler),
        ...VersionReducers,
        ...VersionSelector,
      },
    },
    wrapComponents: {
      ...WrapHighlightCode,
      ...WrapParameters,
    },
  };
}
