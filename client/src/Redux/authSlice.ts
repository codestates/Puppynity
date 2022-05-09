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
  loginType: string;
}
// export interface loginDataType {
//   isLogin: boolean;
//   data: loginResDataType;
// }

export interface IUserData {
  email: string;
  password: string;
}

// login 2번째 방법
export const loginReq = createAsyncThunk('loginReq', async (email: IUserData, password) => {
  return axios
    .post(
      'http://localhost:4000/auth/login',
      {
        email,
        password,
      },
      { headers: { 'Content-Type': 'application/json' }, withCredentials: true },
    )
    .then((res) => {
      if (res.data.accessToken) {
        localStorage.setItem('user', JSON.stringify(res.data));
      }
    });
});

const initialState = {
  isLogin: false,
  // data: {
  //   accessToken: '',
  //   email: '',
  //   loginType: '',
  // },
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setIsLogin: (state, action) => {
      /* eslint-disable */
      state.isLogin = true;
    },
    // login: (state, action) => {
    //   state.userinfo = action.payload;
    //   console.log('local state에 로그인정보가 잘 들어오나?');
    // },
  },
  // extraReducers: {
  //   [loginReq.fulfilled.type]: (state, { payload }: PayloadAction<loginResDataType>) => {
  //     state.isLogin = true;
  //     //state.data = action.payload;
  //     state.data = payload;
  //     console.log('login 잘되면 나옴');
  //   },
  //   [loginReq.rejected.type]: (state) => {
  //     state.isLogin = false;
  //     console.log('sir, you are rejected');
  //   },
  // },
});

export default authSlice.reducer;
export const { setIsLogin } = authSlice.actions;
