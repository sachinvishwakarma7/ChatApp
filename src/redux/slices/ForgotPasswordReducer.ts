import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import LoginThunk from '../thunk/LoginThunk';

type dataRes = {passwordReset: 'success' | 'failed'; error: null | any};

export interface LoginInitialStateType {
  loading: boolean;
  data: dataRes | any;
  error: string;
}

const initialState: LoginInitialStateType = {
  data: {},
  loading: false,
  error: '',
};

const ForgotPasswordReducer = createSlice({
  name: 'auth/ForgotPassword',
  initialState,
  reducers: {
    resetForgotPasswordAction: state => {
      (state.data = {}), (state.loading = false), (state.error = '');
    },
  },
  extraReducers: builder => {
    builder
      .addCase(LoginThunk.pending, state => {
        state.loading = true;
      })
      .addCase(LoginThunk.fulfilled, (state, {payload}) => {
        (state.data = payload), (state.loading = false), (state.error = '');
      })
      .addCase(LoginThunk.rejected, (state, {payload}) => {
        (state.data = []), (state.loading = false);
        // state.error = payload.data;
      });
  },
});

export const {resetForgotPasswordAction} = ForgotPasswordReducer.actions;

export default ForgotPasswordReducer.reducer;
