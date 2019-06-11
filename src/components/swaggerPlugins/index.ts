import { DisableTryItOut } from './DisableTryItOut'
import { ExtendedLayout } from './ExtendedLayout'
import { HandleVersionChange } from './HandleVersionChange'
import { OperationTag } from './OperationTag'
import { SchemesContainer } from './SchemesContainer'
import { Servers } from './Servers'
import { ServersContainer } from './ServersContainer'

export function SwaggerPlugins(versionHandler:any) {
  return {
    components: {
        ExtendedLayout,
        OperationTag,
        SchemesContainer,
        Servers,
        ServersContainer,
    },
    statePlugins: {
        spec: {
            ...DisableTryItOut.toggleTryItOut(),
        },
        version: {
          ...HandleVersionChange(versionHandler),
        },
    },
    wrapComponents: {
        ...DisableTryItOut.toggleAuthorize(),
    },
  }
};
