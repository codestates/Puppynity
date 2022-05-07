import { configureStore } from '@reduxjs/toolkit';
/* eslint-disable */

import contentReducer from './contentSlice';
import authReducer from './authSlice';
import categoryReducer from './categorySlice';
import signupReducer from './signupSlice';

export default configureStore({
  reducer: {
    content: contentReducer,
    auth: authReducer,
    category: categoryReducer,
    signup: signupReducer,
  }, // where we put all of our reducers
});

// export type RootState = ReturnType<typeof authReducer>;
// export type AppDispatch = typeof configureStore.dispatch;
