import { ResetUserStore, SetUserStore } from '../actions';
import { UserStore } from '../types';
import * as constants from '../types/constants';

const defaultValues = {
  id: 0,
  testUserHash: '',
};

export const userStore = (
  state = defaultValues,
  action: ResetUserStore | SetUserStore,
): UserStore => {
  switch (action.type) {
    case constants.RESET_USER_STORE_VALUE:
      return defaultValues;
    case constants.SET_USER_STORE_VALUE:
      const { id, testUserHash } = action;
      return { id, testUserHash };
    default:
      return state;
  }
};
