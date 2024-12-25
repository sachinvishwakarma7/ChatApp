import {createAsyncThunk} from '@reduxjs/toolkit';
import auth from '@react-native-firebase/auth';
import {Alert} from 'react-native';
import {FirebaseError} from '@firebase/app';
import {signupStatusAction} from '../slices/SignUpSlice';
import firestore from '@react-native-firebase/firestore';

const SignUpThunk = createAsyncThunk(
  'auth/SignUp',
  async (
    userData: {fullName: string; email: string; password: string},
    {getState, dispatch},
  ) => {
    const addUserForChat = async data => {
      try {
        await firestore()
          .collection('ChatUsers')
          .doc(`${data?.uid}`) // Unique doc ID using user ID
          .set({
            email: userData?.email,
            name: userData?.fullName,
            userId: data?.uid,
            timestamp: firestore.FieldValue.serverTimestamp(), // Firestore server timestamp
          });
        console.log('Chat User added!');
      } catch (error) {
        console.error('Error adding Chat User:', error);
      }
    };

    // Input validation
    if (!userData.fullName) {
      Alert.alert('Validation Error', 'Full Name is required.');
      throw new Error('Full Name is required');
    }
    if (!userData.email) {
      Alert.alert('Validation Error', 'Email is required.');
      throw new Error('Email is required');
    }
    if (!userData.password) {
      Alert.alert('Validation Error', 'Password is required.');
      throw new Error('Password is required');
    }
    try {
      const userCredential = await auth().createUserWithEmailAndPassword(
        userData.email,
        userData.password,
      );
      const user = userCredential.user;
      // console.log('Signup user:', user);
      addUserForChat(user);
      dispatch(signupStatusAction('success'));
      return user;
    } catch (error) {
      if (error) {
        console.error('Signup error:', error);
        dispatch(signupStatusAction('failed'));
        const firebaseError = error as FirebaseError;

        // Firebase error handling
        let errorMessage = 'An unknown error occurred';
        if (firebaseError.code === 'auth/email-already-in-use') {
          errorMessage = 'This email is already in use.';
        } else if (firebaseError.code === 'auth/invalid-email') {
          errorMessage = 'The email address is not valid.';
        } else if (firebaseError.code === 'auth/weak-password') {
          errorMessage = 'The password is too weak.';
        }

        Alert.alert('Signup Error', errorMessage);
        throw error;
      }
      return error;
    }
  },
);

export default SignUpThunk;
