import { createSlice } from '@reduxjs/toolkit';

interface IModalState {
  isModalOpen: boolean;
  isDeleteUserModalOpen: boolean;
}

const initialState = { isModalOpen: false, isDeleteUserModalOpen: false } as IModalState;

const mypageSlice = createSlice({
  // something that comprises of my state, reducers, and actions in the reducers!
  name: 'mypage',
  initialState,
  reducers: {
    OPEN_MODAL: (state, action) => {
      const open = state;
      open.isModalOpen = action.payload;
      console.log(action);
    },
    DELETE_USER_MODAL_OPEN: (state, action) => {
      const open = state;
      open.isDeleteUserModalOpen = true;
    },
    DELETE_USER_MODAL_CLOSE: (state, action) => {
      const close = state;
      close.isDeleteUserModalOpen = false;
    },
  },
});

export const { OPEN_MODAL, DELETE_USER_MODAL_CLOSE, DELETE_USER_MODAL_OPEN } = mypageSlice.actions;
// u need to export all your actions so that u can call them in your application

export default mypageSlice.reducer;
