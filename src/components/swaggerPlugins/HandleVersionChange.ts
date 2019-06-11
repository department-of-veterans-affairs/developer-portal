export const HandleVersionChange = (handler:any) => {
  return {
    actions: {
      updateVersion: (version:string) => {
        handler(version)
        return {
          type: 'VERSION_SWITCHED',
        }
      },
    },
  };
};
