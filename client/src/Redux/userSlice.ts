import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
/* eslint-disable */

export interface IAuth {
  accessToken?: string;
}

// also need to axios post to server.

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null, // meaning that the user is not logged in yet!
  },
  reducers: {
    // functions to update states
    login: (state, action) => {
      // state => means we are going to update the function
      // action => the data we are going to pass in form of payload.
      state.user = action.payload; // user will be updated by the payload being passed
      createAsyncThunk('POST/USERS', async () => {
        console.log('Post 요청 1단계');
        console.log(state.user);
        return axios({
          method: 'post',
          //url: 'https://server.puppnity.gq/auth/login',
          url: 'http://localhost:4000/auth/login',
        }).then((req) => req.data);
        console.log('이거 뜨면 요청 간거임');
      });
    },
    logout: (state) => {
      state.user = null; // we dont need to update the state w/ any value. just set the value === null
    },
  },
});

// eport actions
export const { login, logout } = userSlice.actions;

// export states so that it can be globally accessed.
// just name it select because we read states using useSelector!
export const selectUser = (state: any) => state.user.user;
// why user.user?

// export reducer itself.
export default userSlice.reducer;
