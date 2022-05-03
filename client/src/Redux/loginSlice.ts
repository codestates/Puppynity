import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export interface loginRequestType {
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

export const loginReq = createAsyncThunk(
  'loginReq',
  async ({ data, endpoint }: { data: loginRequestType; endpoint: string }) => {
    // const res = await axios.post(`https://server.puppnity.gq/${endpoint}`, data);
    const res = await axios.post(`http://localhost:4000/${endpoint}`, data);
    return res.data;
  },
);

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
});
