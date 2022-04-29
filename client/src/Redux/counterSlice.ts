import { createSlice } from '@reduxjs/toolkit';

export const counterSlice = createSlice({
  // something that comprises of my state, reducers, and actions in the reducers!
  name: 'counter',
  initialState: {
    count: 0,
  },
  reducers: {
    increment: (state) => {
      // declared an action called increment!
      state.count += 1;
    },
    decrement: (state) => {
      state.count -= 1;
    },
    incrementByAmount: (state, action) => {
      // also passes an action, where you can increment by specific amount
      // and the amount is going to be pass in our btn.
      state.count += action.payload;
      // action: is a variable Redux allows you to pass in, you can give it a payload
      // and the payload will allow you to pass in any value you want!
    },
  },
});

export const { increment, decrement, incrementByAmount } = counterSlice.actions;
// u need to export all your actions so that u can call them in your application

export default counterSlice.reducer;
