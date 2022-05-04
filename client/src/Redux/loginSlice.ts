import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootStateOrAny } from 'react-redux';
import axios from 'axios';
import authService from './authService';

// const user = JSON.parse(localStorage.getItem('user'));

export interface loginReqType {
  authorizationCode: string | null;
  email: string | null;
}
export interface loginResDataType {
  accessToken: string;
  email: string;
}
export interface loginDataType {
  isSuccess: boolean;
  data: loginResDataType;
}

export interface IUserData {
  email: string;
  password: string;
}

// const loginRequest = async (userData: IUserData) => {
//   const response = await axios.post('https://localhost4000/auth/login', userData);
//   if (response.data) {
//     localStorage.setItem('user', JSON.stringify(response.data));
//   }
//   return response.data;
// };

export const loginReq = createAsyncThunk('loginRequest', async ({ data }: { data: loginReqType }) => {
  const res = await axios.post(`https://localhost4000/auth/login`, data);
  return res.data;
});

const initialState: loginDataType = {
  isSuccess: false,
  data: {
    accessToken: '',
    email: '',
  },
};

export const loginSlice = createSlice({
  name: 'loginSlice',
  initialState,
  reducers: {},
  extraReducers: {
    [loginReq.pending.type]: (state) => {
      /* eslint-disable */
      state.isSuccess = false;
    },
    // 로그인 성공 시
    [loginReq.fulfilled.type]: (state, { payload }: PayloadAction<loginResDataType>) => {
      state.isSuccess = true;
      state.data = payload;
    },
  },
});

export const loginSelector = (state: RootStateOrAny): loginDataType => state.loginSlice;

export default loginSlice.reducer;
