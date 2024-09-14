import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import LoginThunk from '../thunk/LoginThunk';

export interface LoginInitialStateType {
  loading: boolean;
  data: object | any;
  signInStatus: 'idle' | 'loading' | 'success' | 'failed';
  error: string;
  isLogin: boolean;
}

const initialState: LoginInitialStateType = {
  data: {},
  loading: false,
  isLogin: false,
  signInStatus: 'idle',
  error: '',
};

const LoginSlice = createSlice({
  name: 'auth/login',
  initialState,
  reducers: {
    setIsLoginAction: (state, {payload}) => {
      state.isLogin = payload;
    },
    signInStatusAction: (
      state,
      actions: PayloadAction<'idle' | 'loading' | 'success' | 'failed'>,
    ) => {
      state.signInStatus = actions.payload;
    },
    resetUserLoginAction: state => {
      (state.data = {}),
        (state.loading = false),
        (state.isLogin = false),
        (state.signInStatus = 'idle');
      state.error = '';
    },
  },
  extraReducers: builder => {
    builder
      .addCase(LoginThunk.pending, state => {
        state.loading = true;
      })
      .addCase(LoginThunk.fulfilled, (state, {payload}) => {
        (state.data = payload),
          (state.loading = false),
          (state.isLogin = false),

        state.error = '';
      })
      .addCase(LoginThunk.rejected, (state, {payload}) => {
        (state.data = []), (state.loading = false), (state.isLogin = false);
        // state.error = payload.data;
      });
  },
});

export const {setIsLoginAction, resetUserLoginAction, signInStatusAction} = LoginSlice.actions;

export default LoginSlice.reducer;
