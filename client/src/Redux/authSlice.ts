import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

// const user = JSON.parse(localStorage.getItem('user') || '');

export interface loginReqType {
  authorizationCode: string | null;
  email: string | null;
}
export interface loginResDataType {
  accessToken: string;
  email: string;
  password: string;
}
export interface loginDataType {
  isLogin: boolean;
  data: loginResDataType;
  userinfo: string | null;
}

export interface IUserData {
  email: string;
  password: string;
}

// login 2번째 방법
export const loginReq = createAsyncThunk('loginReq', async (userData: IUserData) => {
  return axios
    .post('https://localhost3000/auth/login', {
      userData,
    })
    .then((res) => {
      if (res.data.accessToken) {
        localStorage.setItem('user', JSON.stringify(res.data));
      }
    });
});

const initialState: loginDataType = {
  isLogin: false,
  userinfo: '',
  data: {
    accessToken: '',
    email: '',
    password: '',
  },
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // login: (state, action) => {
    //   state.userinfo = action.payload;
    //   console.log('local state에 로그인정보가 잘 들어오나?');
    // },
  },
  /* eslint-disable */
  extraReducers: {
    /* eslint-disable */
    [loginReq.fulfilled.type]: (state, action) => {
      state.isLogin = true;
      state.data = action.payload;
      console.log('login 잘되면 나옴');
    },
    [loginReq.rejected.type]: (state, action) => {
      state.isLogin = false;
      console.log('sir, you are rejected');
    },
  },
});

export default authSlice.reducer;
