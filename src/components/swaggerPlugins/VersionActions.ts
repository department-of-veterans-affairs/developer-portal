export const VersionActions = (updateVersionHandler: any) => {
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
      updateVersion: (version: string) => {
        updateVersionHandler(version);
        return {
          type: 'API_VERSION_UPDATED',
        };
      },
    },
  };
};
