import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counterSlice';
// import todosReducer from './todoSlice';
// import loginReducer from './loginSlice';
import signupReducer from './signupSlice';

export default configureStore({
  reducer: {
    signup: signupReducer,
    counter: counterReducer,
    // todos: todosReducer,
    // login: loginReducer,
  }, // where we put all of our reducers
});
