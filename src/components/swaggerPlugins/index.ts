import { DisableTryItOut } from "./DisableTryItOut";
import { ExtendedLayout } from "./ExtendedLayout";
import { OperationTag } from "./OperationTag";
import { SchemesContainer } from "./SchemesContainer";
import { Servers } from "./Servers";
import { ServersContainer } from "./ServersContainer";
import { VersionActions } from "./VersionActions";
import { VersionReducers } from "./VersionReducers";
import { VersionSelector } from "./VersionSelector";

export function SwaggerPlugins(versionHandler: any) {
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
        ...VersionActions(versionHandler),
        ...VersionReducers,
        ...VersionSelector,
      },
    },
    wrapComponents: {
      ...DisableTryItOut.toggleAuthorize(),
    },
  };
}
