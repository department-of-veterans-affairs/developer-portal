export const VersionActions = (handler: any) => {
  return {
    actions: {
      setApiMetadata: (metadata: object) => {
        return {
          payload: metadata,
          type: "API_METADATA_SET",
        };
      },
      setApiVersion: (version: string) => {
        return {
          payload: version,
          type: "API_VERSION_SET",
        };
      },
      updateVersion: (url: string, version: string) => {
        handler(url, version);
        return {
          type: "VERSION_SWITCHED",
        };
      },
    },
  };
};
