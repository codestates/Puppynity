import { createSlice } from '@reduxjs/toolkit';

const name = 'comment';

const initialState = {
  commentList: [
    { username: 'kim', profilePic: '', comment: 'coding is awsome' },
    { username: 'park', profilePic: '', comment: 'coding is awsome' },
    { username: 'jung', profilePic: '', comment: 'coding is awsome' },
    { username: 'shin', profilePic: '', comment: 'coding is awsome' },
  ],
  status: 0,
  statusText: 'Loading',
};
/* eslint-disable */

// //? 댓글 추가, 삭제 기능.
// const reducers = {
//   getCommentList: (state: any, action: any) => {},
//   getCommentListSuccess: (state, action) => {
//     state.commentList = action.payload?.data ?? [];
//     state.status = action.payload?.status;
//     state.statusText = action.payload?.statusText ?? 'Success';
//   },
//   getCommentListFail: (state, action) => {
//     state.commentList = initialState.commentList;
//     state.status = action.payload?.status ?? 500;
//     state.statusText = action.payload?.statusText ?? 'Network Error';
//   },
//   insertComment: (state, action) => {},
//   insertCommentSuccess: (state, action) => {},
//   insertCommentFail: (state, action) => {},
//   deleteComment: (state, action) => {},
//   deleteCommentSuccess: (state, action) => {},
//   deleteCommentFail: (state, action) => {},
// };

const commentSlice = createSlice({
  name,
  initialState,
  reducers: {
    writeComment: (state, action) => {
      state.commentList.push(action.payload);
    },
  },
  extraReducers: {},
});

export const commentReducer = commentSlice.reducer;
export const commentActions = commentSlice.actions;
