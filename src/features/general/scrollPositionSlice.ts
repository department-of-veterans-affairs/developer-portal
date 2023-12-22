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
      // eslint-disable-next-line no-param-reassign, @typescript-eslint/no-unused-vars
      state = {
        ...initialState,
      };
    },
    setScrollPosition: (state, action: PayloadAction<ScrollPosition>) => {
      const { position } = action.payload;
      state.position = position;
    },
  },
});

export const { resetScrollPosition, setScrollPosition } = scrollPositionSlice.actions;
export default scrollPositionSlice.reducer;
