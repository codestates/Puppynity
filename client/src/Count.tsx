// import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// // import { RootState } from './Redux/configureStore';
// /* eslint-disable */
// import { decrement, increment, incrementByAmount } from 'Redux/counterSlice';

// function Count(): JSX.Element {
//   // useSelector to read variables from reducers.
//   // we need "count" variable from the counterSlice!
//   // const { count } = useSelector((state: RootState) => state.counter);
//   // remember: in configureStore, we call counterReducer as "counter"
//   // another way:
//   const count = useSelector((state) => state.counter.count);

//   // to call actions, we use dispatch hook
//   const dispatch = useDispatch();

//   return (
//     <div>
//       <h1>The count is: {count}</h1>
//       {/* in the buttons, we need to be calling our actions in our counter reducers! */}
//       <button onClick={() => dispatch(increment())} type="button">
//         increment
//       </button>
//       <button onClick={() => dispatch(decrement())} type="button">
//         decrement
//       </button>
//       <button onClick={() => dispatch(incrementByAmount(33))} type="button">
//         increment by 33
//       </button>
//     </div>
//   );
// }

// export default Count;

// export const selectCount = (state: RootState) => state.counter.value;
