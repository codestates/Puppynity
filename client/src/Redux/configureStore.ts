import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counterSlice';
import todosReducer from './todoSlice';

export default configureStore({
  reducer: {
    counter: counterReducer,
    todos: todosReducer,
  }, // where we put all of our reducers
});
