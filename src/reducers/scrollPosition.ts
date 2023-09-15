import { createSelector } from 'reselect';
import { ResetScrollPosition, SetScrollPosition } from '../actions';
import { ScrollPosition } from '../types';
import * as constants from '../types/constants';

const getScrollValue = (state: ScrollPosition): number => state.position;

export const getScrollPosition = createSelector(getScrollValue, (position: number) => position);

const initialState = {
  position: 0,
};

export const scrollPosition = (
  state = initialState,
  action: ResetScrollPosition | SetScrollPosition,
): ScrollPosition => {
  switch (action.type) {
    case constants.RESET_SCROLL_POSITION_VALUE:
      return initialState;
    case constants.SET_SCROLL_POSITION_VALUE:
      const { position } = action;
      return { ...state, position };
    default:
      return state;
  }
};
