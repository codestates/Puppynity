import { createSlice, nanoid, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
/* eslint-disable */
import configureStore from './configureStore';
import dummyContents from '../static/dummyContents';
import axios from 'axios';
// 하나의 게시물의 디테일한 요소를 모두 띄어주는 요소들을 모두 다뤄야한다.
// 게시글의 제목, 유저이름, 생성 날짜, 게시글 내용 (사진 + 텍스트)
// + 좋아요 갯수와 댓글까지?! <-- 어떻게 구현할지 고민...

export interface IcontentType {
  id: number;
  title: string;
  username: string;
  picture?: string | Blob; // 사진 자체를 multer을 사용해 보내야하는데 form data는 어떤 타입인가...?
  text: string;
  createdAt: string;
}
const initialState = [
  {
    id: dummyContents[0].id,
    title: dummyContents[0].title,
    username: dummyContents[0].username,
    picture: dummyContents[0].picture, // 사진 자체를 multer을 사용해 보내야하는데 form data는 어떤 타입인가...?
    text: dummyContents[0].text,
    createdAt: dummyContents[0].createdAt,
  },
  {
    id: dummyContents[1].id,
    title: dummyContents[1].title,
    username: dummyContents[1].username,
    picture: dummyContents[1].picture,
    text: dummyContents[1].text,
    createdAt: dummyContents[1].createdAt,
  },
];

// export const submitToServer = createAsyncThunk({
//     "contents/create",
//     async({id, file}) => {
//         const res = await
//     }
// })

export const contentSlice = createSlice({
  name: 'contents',
  initialState,
  reducers: {
    uploadContent: (state, action) => {
      // content를 올렸을 때?
      // 아무것도 없는 게시물에 IcontentType의 타입들의 데이터가 들어와서
      // 리덕스 스토어에 저장이 되어야하는데 어떻게 해야하지??
      // state.content = action.payload;
      state.push(action.payload); // RTK uses immerJS, let you code like js.
      // 이제 axios 요청 보내야함
      axios.post('https://server.puppnity.gq/upload');
    },
  },
});

export const { uploadContent } = contentSlice.actions;

export default contentSlice.reducer;

// const selectAllContents = (state) => state.contents;

type RootState = ReturnType<typeof configureStore.getState>;

export const ContentType = (state: RootState) => state.content;
