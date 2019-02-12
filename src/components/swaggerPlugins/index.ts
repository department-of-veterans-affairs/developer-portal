import { DisableTryItOut } from './DisableTryItOut'
import { OperationTag } from './OperationTag'
import { SchemesContainer } from './SchemesContainer'
import { Servers } from './Servers'
import { ServersContainer } from './ServersContainer'

export const SwaggerPlugins = {
    components: {
        OperationTag,
        SchemesContainer,
        Servers,
        ServersContainer,
    },
    statePlugins: {
        spec: {
            ...DisableTryItOut.toggleTryItOut(),
        },
    },
    wrapComponents: {
        ...DisableTryItOut.toggleAuthorize(),
    },
};
