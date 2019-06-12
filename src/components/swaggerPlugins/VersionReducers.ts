export const VersionReducers = {
  reducers: {
    "API_NAME_SET": (state:any, action:any) => {
      return state.set("apiName", action.payload)
    },
  },
}
