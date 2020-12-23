import { ResetAPISelection, SetAPISelection } from '../actions';
import { APISelection } from '../types';
import * as constants from '../types/constants';

const defaultApiSelectionState = {
  selectedApi: constants.DEFAULT_API_SELECTION,
};

export const apiSelection = (
  state = defaultApiSelectionState,
  action: ResetAPISelection | SetAPISelection,
): APISelection => {
  switch (action.type) {
    case constants.RESET_API_SELECTION_VALUE:
      return defaultApiSelectionState;
    case constants.SET_API_SELECTION_VALUE:
      const { selectedApi } = action;
      return { selectedApi };
    default:
      return state;
  }
};
