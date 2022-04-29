import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


const action = { 
    userLogin: createAsyncThunk('GET/USERLOGIN', async () => {
    return axios({
      method: 'get',
      url: 'https://localhost/4000',
    }).then((res) => res.data);
}
export const userSlice = createSlice({
  name: 'user',
  initialState: {
    isLogin: false,
  },
  reducers: {
    setIsLogin: (state) => {
      state.isLogin = true;
    },
    userLogin: (state, action) => {
        state.userLogin = action.payload.data;
    }
    }),
  },
});

export const { userLogin, setIsLogin } = userSlice.actions;
export default userSlice.reducer;
