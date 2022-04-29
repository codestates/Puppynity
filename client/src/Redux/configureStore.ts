import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counterSlice';
// import todosReducer from './todoSlice';
// import loginReducer from './loginSlice';

export default configureStore({
  reducer: {
    counter: counterReducer,
    // todos: todosReducer,
    // login: loginReducer,
  }, // where we put all of our reducers
});
