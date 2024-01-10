import { PayloadAction, createSelector, createSlice } from '@reduxjs/toolkit';
import { ScrollPosition } from '../../types';

const getScrollValue = (state: ScrollPosition): number => state.position;

export const getScrollPosition = createSelector(getScrollValue, (position: number) => position);

const initialState: ScrollPosition = {
  position: 0,
};

const scrollPositionSlice = createSlice({
  initialState,
  name: 'scrollPosition',
  reducers: {
    resetScrollPosition: state => {
      state.position = initialState.position;
    },
    setScrollPosition: (state, action: PayloadAction<number>) => {
      state.position = action.payload;
    },
  },
});

export const { resetScrollPosition, setScrollPosition } = scrollPositionSlice.actions;
export default scrollPositionSlice.reducer;
