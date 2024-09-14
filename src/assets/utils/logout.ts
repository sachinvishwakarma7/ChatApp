import {CommonActions, NavigationProp} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {resetUserLoginAction} from '../../redux/slices/LoginSlice';
import {resetUserSignupAction} from '../../redux/slices/SignUpSlice';
import auth from '@react-native-firebase/auth';
import {AppDispatch} from '../../redux/Store';
import {CommonNavigationType} from '../../redux/Hooks';
import { resetForgotPasswordAction } from '../../redux/slices/ForgotPasswordReducer';

export const LogoutApp = (
  dispatch: AppDispatch,
  navigation: CommonNavigationType,
) => {
  auth()
    .signOut()
    .then(async () => {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'HomeScreen'}],
        }),
      );
      dispatch(resetUserLoginAction());
      dispatch(resetUserSignupAction());
      dispatch(resetForgotPasswordAction());
      await AsyncStorage.clear();
      console.log('User signed out!');
    })
    .catch(error => {
      console.error('Sign out error:', error);
      // Handle error if needed
    });
};
