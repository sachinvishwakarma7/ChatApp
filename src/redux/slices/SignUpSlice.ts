import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import SignUpThunk from '../thunk/SignUpThunk';

export interface AuthInitialStateType {
  loading: boolean;
  data: object | any;
  signUpStatus: 'idle' | 'loading' | 'success' | 'failed';
  error: string;
}

const initialState: AuthInitialStateType = {
  data: {},
  loading: false,
  error: '',
  signUpStatus: 'idle',
};

const SignUpSlice = createSlice({
  name: 'auth/signUp',
  initialState,
  reducers: {
    resetUserSignupAction: state => {
      (state.data = {}),
        (state.loading = false),
        (state.error = ''),
        (state.signUpStatus = 'idle');
    },
    signupStatusAction: (
      state,
      actions: PayloadAction<'idle' | 'loading' | 'success' | 'failed'>,
    ) => {
      console.log('signupStatus payload==>', actions.payload);
      state.signUpStatus = actions.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(SignUpThunk.pending, state => {
        state.loading = true;
      })
      .addCase(SignUpThunk.fulfilled, (state, actions: PayloadAction<any>) => {
        (state.data = actions.payload),
          (state.loading = false),
          (state.error = '');
      })
      .addCase(SignUpThunk.rejected, state => {
        (state.data = []), (state.loading = false);
        // state.error = payload.data;
      });
  },
});

export const {signupStatusAction, resetUserSignupAction} = SignUpSlice.actions;

export default SignUpSlice.reducer;
