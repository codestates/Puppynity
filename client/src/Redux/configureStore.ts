import { configureStore } from '@reduxjs/toolkit';
/* eslint-disable */
import counterReducer from './counterSlice';
import userReducer from './userSlice';
// import todosReducer from './todoSlice';
// import loginReducer from './loginSlice';

export default configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
    // todos: todosReducer,
    // login: loginReducer,
  }, // where we put all of our reducers
});

// export type RootState = ReturnType<typeof configureStore.getState>;

// export type AppDispatch = typeof configureStore.dispatch;
