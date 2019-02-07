import { OperationTag } from './OperationTag'
import { SchemesContainer } from './SchemesContainer'
import { Servers } from './Servers'
import { ServersContainer } from './ServersContainer'
import { TryItOut } from './TryItOut'

export const SwaggerPlugins = {
    components: {
        OperationTag,
        SchemesContainer,
        Servers,
        ServersContainer,
    },
    statePlugins: {
        ...TryItOut.toggle(),
    },
};
