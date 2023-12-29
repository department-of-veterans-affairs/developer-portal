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
      state.vaNetworkConnected = initialState.vaNetworkConnected;
      state.vaNetworkModal = initialState.vaNetworkModal;
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
