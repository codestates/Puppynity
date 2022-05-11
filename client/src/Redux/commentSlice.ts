import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ICommentsType {
  commentList: any[];
}

interface Comment {
  id: number;
  comment?: string;
  content?: string;
  createdAt: string;
}

const initialState = {
  commentList: [],
  index: 0,
};

/* eslint-disable */

const commentSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {
    getCommentList: (state, action) => {
      state.commentList = action.payload.data;
      console.log(state.commentList);
    },
    writeComment: (state, action) => {
      // state.commentList.push(action.payload);
    },
    setIndex: (state, action) => {
      state.index = action.payload;
    },
    deleteComment: (state, action) => {
      state.commentList = state.commentList.filter((comment: Comment) => comment.id !== action.payload);
    },
  },
  extraReducers: {},
});

export default commentSlice.reducer;
export const { writeComment, getCommentList, deleteComment, setIndex } = commentSlice.actions;
