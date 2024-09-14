// import {configureStore} from '@reduxjs/toolkit';
// import LoginSlice from './slices/LoginSlice';
// import SignUpSlice from './slices/SignUpSlice';

// export const store = configureStore({
//   reducer: {
//     LoginReducer: LoginSlice,
//     SignUpReducer: SignUpSlice,
//   },
//   middleware: getDefaultMiddleware =>
//     getDefaultMiddleware({serializableCheck: false}),
// });

import {combineReducers, configureStore} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginSlice from './slices/LoginSlice';
import SignUpSlice from './slices/SignUpSlice';
import {persistReducer} from 'redux-persist';
import ForgotPasswordReducer from './slices/ForgotPasswordReducer';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['LoginReducer', 'SignUpReducer'],
  blacklist: ['navigation'],
};

const rootReducer = combineReducers({
  LoginReducer: LoginSlice,
  SignUpReducer: SignUpSlice,
  ForgotPasswordReducer: ForgotPasswordReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
