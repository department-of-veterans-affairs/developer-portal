import { curlify } from './curlify';
import DisableTryItOut from './DisableTryItOut';
import ExtendedLayout from './ExtendedLayout';
import OperationTag from './OperationTag';
import Servers from './Servers';
import ServersContainer from './ServersContainer';
import './StyleOverride.scss';
import { VersionActions } from './VersionActions';
import { VersionReducers } from './VersionReducers';
import { VersionSelector } from './VersionSelector';
import { WrapParameters } from './WrapParameters';

export function SwaggerPlugins(versionHandler: any) {
  return {
    components: {
      ExtendedLayout,
      OperationTag,
      Servers,
      ServersContainer,
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
      ...WrapParameters,
    },
  };
}
