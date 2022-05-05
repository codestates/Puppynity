// import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// /* eslint-disable */
// import configureStore from './configureStore';

// export const counterSlice = createSlice({
//   // something that comprises of my state, reducers, and actions in the reducers!
//   name: 'counter',
//   initialState: {
//     count: 0,
//   },
//   reducers: {
//     increment: (state) => {
//       const props = state;
//       // declared an action called increment!
//       props.count += 1;
//     },
//     decrement: (state) => {
//       const props = state;
//       props.count -= 1;
//     },
//     incrementByAmount: (state, action: PayloadAction<number>) => {
//       // also passes an action, where you can increment by specific amount
//       // and the amount is going to be pass in our btn.
//       const props = state;
//       props.count += action.payload;
//       // action: is a variable Redux allows you to pass in, you can give it a payload
//       // and the payload will allow you to pass in any value you want!
//     },
//   },
// });

// export const { increment, decrement, incrementByAmount } = counterSlice.actions;
// // u need to export all your actions so that u can call them in your application

// export default counterSlice.reducer;

// // type RootState = ReturnType<typeof configureStore.getState>;

// //export const CountType = (state: RootState) => state.counter.count;
