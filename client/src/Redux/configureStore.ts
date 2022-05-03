import { configureStore } from '@reduxjs/toolkit';
/* eslint-disable */
import counterReducer from './counterSlice';
import userReducer from './userSlice';
// import todosReducer from './todoSlice';
// import loginReducer from './loginSlice';
import signupReducer from './signupSlice';
import contentReducer from './contentSlice';

export default configureStore({
  reducer: {
    signup: signupReducer,
    counter: counterReducer,
    user: userReducer,
    content: contentReducer,
    // userContent: userContentReducer,
    // login: loginReducer,
  }, // where we put all of our reducers
});

// export type RootState = ReturnType<typeof configureStore.getState>;

// export type AppDispatch = typeof configureStore.dispatch;
