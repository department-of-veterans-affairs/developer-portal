import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { UserStore } from '../../types';

const initialState: UserStore = {
  id: 0,
  testUserHash: '',
};

const userStoreSlice = createSlice({
  initialState,
  name: 'userStore',
  reducers: {
    resetUserStore: state => {
      state.id = initialState.id;
      state.testUserHash = initialState.testUserHash;
    },
    setUserStore: (state, action: PayloadAction<UserStore>) => {
      const { id, testUserHash } = action.payload;
      state.id = id;
      state.testUserHash = testUserHash;
    },
  },
});

export const { resetUserStore, setUserStore } = userStoreSlice.actions;
export default userStoreSlice.reducer;
