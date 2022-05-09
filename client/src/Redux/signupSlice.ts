import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IModalState {
  isModalOpen: boolean;
  isSuccessModalOpen: boolean;
  inputDisable: boolean;
}

const initialState = { isModalOpen: false, isSuccessModalOpen: false, inputDisable: false } as IModalState;

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
    TRUE_INPUT_DISABLE: (state, action) => {
      const trueInputDisable = state;
      trueInputDisable.inputDisable = true;
    },
    FALSE_INPUT_DISABLE: (state, action) => {
      const falseInputDisable = state;
      falseInputDisable.inputDisable = false;
    },
  },
});

export const {
  OPEN_MODAL,
  CLOSE_MODAL,
  OPEN_SUCCESS_MODAL,
  CLOSE_SUCCESS_MODAL,
  TRUE_INPUT_DISABLE,
  FALSE_INPUT_DISABLE,
} = signupSlice.actions;
// u need to export all your actions so that u can call them in your application

export default signupSlice.reducer;
