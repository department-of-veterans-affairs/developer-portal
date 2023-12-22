import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { GeneralStore } from '../../types';

const initialState: GeneralStore = {
  vaNetworkConnected: false,
  vaNetworkModal: false,
};

const generalStoreSlice = createSlice({
  initialState,
  name: 'generalStore',
  reducers: {
    resetGeneralStore: state => {
      // eslint-disable-next-line no-param-reassign, @typescript-eslint/no-unused-vars
      state = {
        ...initialState,
      };
    },
    setGeneralStore: (state, action: PayloadAction<GeneralStore>) => {
      const { vaNetworkConnected, vaNetworkModal } = action.payload;
      state.vaNetworkConnected = vaNetworkConnected;
      state.vaNetworkModal = vaNetworkModal;
    },
  },
});

export const { resetGeneralStore, setGeneralStore } = generalStoreSlice.actions;
export default generalStoreSlice.reducer;
