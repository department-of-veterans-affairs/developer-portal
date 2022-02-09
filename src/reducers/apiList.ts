import { ResetAPIs, SetAPIs } from '../actions';
import { ApiList } from '../types';
import * as constants from '../types/constants';

const defaultApis = {
  apis: {},
  loaded: false,
};

export const apiList = (state = defaultApis, action: ResetAPIs | SetAPIs): ApiList => {
  switch (action.type) {
    case constants.RESET_APIS_VALUE:
      return defaultApis;
    case constants.SET_APIS_VALUE:
      const { apis } = action;
      return { apis, loaded: true };
    default:
      return state;
  }
};
