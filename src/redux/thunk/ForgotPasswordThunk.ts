import {createAsyncThunk} from '@reduxjs/toolkit';
import auth from '@react-native-firebase/auth';
import {Alert} from 'react-native';
import Toast from 'react-native-toast-message';
import {FirebaseError} from '@firebase/app';

const ForgotPasswordThunk = createAsyncThunk(
  'auth/login',
  async (userData: {email: string}, {getState, dispatch}) => {
    // Input validation
    if (!userData.email) {
      Alert.alert('Validation Error', 'Email is required.');
      throw new Error('Email is required');
    }

    try {
      const userCredential = await auth().sendPasswordResetEmail(
        userData.email,
      );
      console.log('Logged in user:', userCredential);
      Toast.show({
        type: 'success',
        text1: 'Please go through you email address!',
        // text2: data?.email,
      });
      return {passwordReset: 'success', error: null};
    } catch (error) {
      // Firebase error handling
      const firebaseError = error as FirebaseError;
      let errorMessage = 'An unknown error occurred';
      if (firebaseError.code === 'auth/invalid-email') {
        errorMessage = 'The email address is not valid.';
      }
      Toast.show({
        type: 'error',
        text1: firebaseError.code,
      });
      if (error) {
        return {passwordReset: 'failed', error: error};
      }
    }
  },
);

export default ForgotPasswordThunk;
