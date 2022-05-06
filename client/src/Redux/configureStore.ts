import { configureStore } from '@reduxjs/toolkit';
/* eslint-disable */
//import counterReducer from './counterSlice';

import contentReducer from './contentSlice';
import authReducer from './authSlice';
import categoryReducer from './categorySlice';

export default configureStore({
  reducer: {
    content: contentReducer,
    auth: authReducer,
    category: categoryReducer,
    // login: loginReducer,
  }, // where we put all of our reducers
});

// export type RootState = ReturnType<typeof authReducer>;
// export type AppDispatch = typeof configureStore.dispatch;
