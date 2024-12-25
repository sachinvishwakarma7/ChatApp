import {CommonActions, NavigationProp} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  resetUserLoginAction,
  setIsDarkThemeAction,
} from '../redux/slices/LoginSlice';
import {resetUserSignupAction} from '../redux/slices/SignUpSlice';
import auth from '@react-native-firebase/auth';
import {AppDispatch} from '../redux/Store';
import {resetForgotPasswordAction} from '../redux/slices/ForgotPasswordReducer';
import {CommonNavigationType} from '../navigation/AuthNavigation';

export const LogoutApp = (
  dispatch: AppDispatch,
  navigation: CommonNavigationType,
  docID: string,
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
      dispatch(setIsDarkThemeAction(false));
      await AsyncStorage.clear();
      // await firestore()
      //   .collection('ChatUsers')
      //   .doc(docID)
      //   .delete()
      //   .then(() => {
      //     console.log('User deleted!');
      //   });
      console.log('User signed out!');
    })
    .catch(error => {
      console.error('Sign out error:', error);
      // Handle error if needed
    });
};
