export const VersionActions = (handler: any) => {
  return {
    actions: {
      setApiMetadata: (metadata: object) => {
        return {
          payload: metadata,
          type: 'API_METADATA_SET',
        };
      },
      setApiVersion: (version: string) => {
        return {
          payload: version,
          type: 'API_VERSION_SET',
        };
      },
      updateUrl: (url: string, version: string) => {
        handler(url, version);
        return {
          type: 'API_URL_UPDATED',
        };
      },
      updateVersion: (version: string) => {
        return {
          payload: version,
          type: 'API_VERSION_UPDATED',
        };
      },
    },
  };
};
