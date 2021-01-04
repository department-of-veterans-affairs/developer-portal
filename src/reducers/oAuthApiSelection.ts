import { ResetOAuthAPISelection, SetOAuthAPISelection } from '../actions';
import { OAuthAPISelection } from '../types';
import * as constants from '../types/constants';

const defaultOAuthApiSelectionState = {
  selectedOAuthApi: constants.DEFAULT_OAUTH_API_SELECTION,
};

export const oAuthApiSelection = (
  state = defaultOAuthApiSelectionState,
  action: ResetOAuthAPISelection | SetOAuthAPISelection,
): OAuthAPISelection => {
  switch (action.type) {
    case constants.RESET_OAUTH_API_SELECTION_VALUE:
      return defaultOAuthApiSelectionState;
    case constants.SET_OAUTH_API_SELECTION_VALUE:
      const { selectedOAuthApi } = action;
      return { selectedOAuthApi };
    default:
      return state;
  }
};
