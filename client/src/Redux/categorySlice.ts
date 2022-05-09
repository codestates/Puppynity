import { createSlice } from '@reduxjs/toolkit';

// interface initialState {
//   category1: string;
// }

/* eslint-disable */
export const categorySlice = createSlice({
  name: 'category',
  initialState: {
    category: '',
    contents: [],
  },
  reducers: {
    chooseCategory: (state, action) => {
      state.category = action.payload;
    },
    all: (state, action) => {
      // 모든 게시물 렌더링
      state.contents;
    },
    tips: (state, action) => {
      //state.contents.filter((contents.category) === action.payload.category)
    },
  },
});

export default categorySlice.reducer;
export const { all, chooseCategory } = categorySlice.actions;
