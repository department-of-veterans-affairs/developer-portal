export const VersionActions = (handler:any) => {
  return {
    actions: {
      setApiName: (name:string) => {
        return {
          payload: name,
          type: 'API_NAME_SET',
        }
      },
      updateVersion: (version:string) => {
        handler(version)
        return {
          type: 'VERSION_SWITCHED',
        }
      },
    },
  };
};
