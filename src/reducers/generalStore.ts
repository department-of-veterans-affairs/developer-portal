/* eslint-disable no-console */
import { ResetGeneralStore, SetGeneralStore } from '../actions';
import { GeneralStore } from '../types';
import * as constants from '../types/constants';

const defaultValues = {
  vaNetworkConnected: false,
  vaNetworkModal: false,
};

export const generalStore = (
  state = defaultValues,
  action: ResetGeneralStore | SetGeneralStore,
): GeneralStore => {
  switch (action.type) {
    case constants.RESET_GENERAL_STORE_VALUE:
      return defaultValues;
    case constants.SET_GENERAL_STORE_VALUE:
      console.log(state);
      console.log('reducer running');
      const { vaNetworkConnected, vaNetworkModal } = action;
      console.log(action);
      return { vaNetworkConnected, vaNetworkModal };
    default:
      return state;
  }
};
