// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import authService from './authService';
// /* eslint-disable */
// interface IUserType {
//   user: string | null;
// }

// // Get user from localStorage
// const user = JSON.parse(localStorage.getItem('user') || '');

// const initialState = {
//   user: user || null, // 로그인 전엔 유저가 없고, 유저 정보가 이미 존재하면 사용할 거임
//   isError: false, // if we get error from server we can set this as true;
//   isSuccess: false,
//   isLoading: false,
//   message: '',
// };

// export const authSlice = createSlice({
//   // so we get this slice object and inside the obj, the info we need to have are lised below
//   name: 'auth',
//   initialState,
//   reducers: {
//     reset: (state) => {
//       // reducers are not for async functions!
//       // 그냥 기본 값들 설정
//       state.isLoading = false;
//       state.isError = false;
//       state.isSuccess = false;
//       state.message = '';
//     },
//   },
//   extraReducers: (builder) => {
//     // builder 인자를 사용한다.
//     builder
//       .addCase(register.pending, (state) => {
//         // 로딩
//         state.isLoading = true;
//       })
//       .addCase(register.fulfilled, (state, action) => {
//         // 회원가입 성공시
//         state.isLoading = false;
//         state.isSuccess = true;
//         state.user = action.payload; // authService에서 받은 정보를 액션 payload객체에 담아준다. 위 authSlice에서 후에 사용될 것.
//       })
//       .addCase(register.rejected, (state, action) => {
//         state.isLoading = false;
//         state.isError = true;
//         state.message = action.payload; // 위에서 reject가 되면 에러메세지를 리턴해서 액션객체에 담아준다.
//         state.user = null;
//       })
//       .addCase(login.pending, (state) => {
//         // 로딩
//         state.isLoading = true;
//       })
//       .addCase(login.fulfilled, (state, action) => {
//         // 회원가입 성공시
//         state.isLoading = false;
//         state.isSuccess = true;
//         state.user = action.payload; // authService에서 받은 정보를 액션 payload객체에 담아준다. 위 authSlice에서 후에 사용될 것.
//       })
//       .addCase(login.rejected, (state, action) => {
//         state.isLoading = false;
//         state.isError = true;
//         state.message = action.payload; // 위에서 reject가 되면 에러메세지를 리턴해서 액션객체에 담아준다.
//         state.user = null;
//       });
//   },
// });

// // register
// export const signup = createAsyncThunk('auth/signup', async (user, thunkAPI) => {
//   try {
//     return await authService.register(user); // authService의 register함수를 사용해서 user정보를 전달
//   } catch (error) {
//     const message: any = (error.response && error.response.data) || error.message || error;
//     return thunkAPI.rejectWithValue; // what is thunkAPI?
//   }
// });

// // login user
// export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
//   try {
//     return await authService.login(user); // authService의 register함수를 사용해서 user정보를 전달
//   } catch (error) {
//     const message: any = (error.response && error.response.data) || error.message || error;
//     return thunkAPI.rejectWithValue; // what is thunkAPI?
//   }
// });
// export const { reset } = authSlice.actions; // action export.
// export default authSlice.reducer;
