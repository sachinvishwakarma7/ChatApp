import {createAsyncThunk} from '@reduxjs/toolkit';
import auth from '@react-native-firebase/auth';
import {Alert} from 'react-native';
import {FirebaseError} from '@firebase/app';
import {signInStatusAction} from '../slices/LoginSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginThunk = createAsyncThunk(
  'auth/login',
  async (userData: {email: string; password: string}, {getState, dispatch}) => {
    // Input validation
    if (!userData.email) {
      Alert.alert('Validation Error', 'Email is required.');
      throw new Error('Email is required');
    }
    if (!userData.password) {
      Alert.alert('Validation Error', 'Password is required.');
      throw new Error('Password is required');
    }

    try {
      const userCredential = await auth().signInWithEmailAndPassword(
        userData.email,
        userData.password,
      );
      const user = userCredential.user;
      // console.log('Logged in user:', user);
      dispatch(signInStatusAction('success'));
      await AsyncStorage.setItem('isUserLoggedIn', 'true');
      return user;
    } catch (error) {
      // Firebase error handling
      if (error) {
        const firebaseError = error as FirebaseError;
        dispatch(signInStatusAction('failed'));
        let errorMessage = 'An unknown error occurred';
        if (firebaseError.code === 'auth/invalid-email') {
          errorMessage = 'The email address is not valid.';
        } else if (firebaseError.code === 'auth/user-disabled') {
          errorMessage = 'This user has been disabled.';
        } else if (firebaseError.code === 'auth/user-not-found') {
          errorMessage = 'No user found with this email.';
        } else if (firebaseError.code === 'auth/wrong-password') {
          errorMessage = 'Incorrect password.';
        } else if (firebaseError.code === 'auth/invalid-credential') {
          errorMessage = 'invalid credential.';
        }

        Alert.alert('Login Error', errorMessage);
        throw error;
      }
      return error;
    }
  },
);

export default LoginThunk;
