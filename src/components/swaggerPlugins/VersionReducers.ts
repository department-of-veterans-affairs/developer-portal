export const VersionReducers = {
  reducers: {
    API_METADATA_SET: (state: any, action: any) => {
      return state.set('apiMetadata', action.payload);
    },
    API_VERSION_SET: (state: any, action: any) => {
      return state.set('apiVersion', action.payload);
    },
  },
};
