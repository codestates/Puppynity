import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IModalState {
  isModalOpen: boolean;
  isSuccessModalOpen: boolean;
}

const initialState = { isModalOpen: false, isSuccessModalOpen: false } as IModalState;

const signupSlice = createSlice({
  // something that comprises of my state, reducers, and actions in the reducers!
  name: 'signup',
  initialState,
  reducers: {
    OPEN_MODAL: (state, action) => {
      const open = state;
      open.isModalOpen = true;
    },
    CLOSE_MODAL: (state, action) => {
      const close = state;
      close.isModalOpen = false;
    },
    OPEN_SUCCESS_MODAL: (state, action) => {
      const successOpen = state;
      successOpen.isSuccessModalOpen = true;
    },
    CLOSE_SUCCESS_MODAL: (state, action) => {
      const successClose = state;
      successClose.isSuccessModalOpen = false;
    },
  },
});

export const { OPEN_MODAL, CLOSE_MODAL, OPEN_SUCCESS_MODAL, CLOSE_SUCCESS_MODAL } = signupSlice.actions;
// u need to export all your actions so that u can call them in your application

export default signupSlice.reducer;
