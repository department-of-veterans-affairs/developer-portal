import { curlify } from './curlify';
import DisableTryItOut from './DisableTryItOut';
import ExtendedLayout from './ExtendedLayout';
import OperationTag from './OperationTag';
import './StyleOverride.scss';
import { VersionActions } from './VersionActions';
import { VersionReducers } from './VersionReducers';
import { VersionSelector } from './VersionSelector';
import { WrapHighlightCode } from './WrapHighlightCode';
import { WrapParameters } from './WrapParameters';

export function SwaggerPlugins(versionHandler: any) {
  return {
    components: {
      ExtendedLayout,
      OperationTag,
      ServersContainer: () => null,
    },
    fn: {
      curlify,
    },
    statePlugins: {
      spec: {
        ...DisableTryItOut.toggleTryItOut(),
      },
      version: {
        ...VersionActions(versionHandler),
        ...VersionReducers,
        ...VersionSelector,
      },
    },
    wrapComponents: {
      ...DisableTryItOut.toggleAuthorize(),
      ...WrapHighlightCode,
      ...WrapParameters,
    },
  };
}
