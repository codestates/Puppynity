// import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import configureStore from './configureStore';

// interface Todo {
//   id: number;
//   done: boolean;
//   text: string;
// }

// interface TodosSliceState {
//   todos: Todo[];
// }

// const initialState: TodoSliceState = {
//   todos: [],
// };

// export const todosSlice = createSlice({
//   name: '',
//   initialState,
//   reducers: {
//     addTodo: (state, action: PayloadAction<string>) => {
//       state.todos = [
//         ...state.todos,
//         {
//           id: state.todos.length,
//           text: action.text, //
//           done: false,
//         },
//       ];
//     },
//     removeTodo: (state, action: PayloadAction<number>) => {
//       // 타입을 넘버로 줘야함; Id를 기반으로 지울거라서!
//       // state.todos = state.todos.filter(({ id }) => id !== action.payload);
//     },
//   },
// });

// export const { addTodo, removeTodo } = todosSlice.actions;

// export default todosSlice.reducer;

// // create a selector
// type RootState = ReturnType<typeof configureStore.getState>;

// export const SelectTodos = (state: RootState) => state.todos.todos;
