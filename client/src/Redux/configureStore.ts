import { configureStore } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import thunk from 'redux-thunk';

/* eslint-disable */

import contentReducer from './contentSlice';
import authReducer from './authSlice';
import categoryReducer from './categorySlice';
import signupReducer from './signupSlice';

const persistConfig = {
  key: 'root',
  storage,
};

const reducers = combineReducers({
  content: contentReducer,
  auth: authReducer,
  category: categoryReducer,
  signup: signupReducer,
});

const persistedReducer = persistReducer(persistConfig, reducers);

export default configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
  // where we put all of our reducers
});

// export type RootState = ReturnType<typeof authReducer>;
// export type AppDispatch = typeof configureStore.dispatch;
