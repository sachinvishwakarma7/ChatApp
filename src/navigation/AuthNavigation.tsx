import React, {useEffect, useState} from 'react';
// import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import OnboardingScreen from '../screens/OnboardingScreen';
import MyTabs from './BottomTab';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';

export type TabStackParamList = {
  Home: undefined;
  Settings: undefined;
  Profile: undefined;
};

export type RootStackParamList = {
  HomeScreen: undefined;
  SignInScreen: undefined;
  SignUpScreen: undefined;
  OnboardingScreen: undefined;
  ForgotPasswordScreen: undefined;
  MyTabsScreen: TabStackParamList;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AuthNavigation = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<null | boolean>(null);

  const checkIfLoggedIn = async () => {
    try {
      const userStatus = await AsyncStorage.getItem('isUserLoggedIn');
      return userStatus === 'true';
    } catch (error) {
      console.error('Error reading isUserLoggedIn from AsyncStorage:', error);
      return false;
    }
  };

  useEffect(() => {
    const verifyLoginStatus = async () => {
      const loggedIn = await checkIfLoggedIn();
      setIsLoggedIn(loggedIn);
    };
    verifyLoginStatus();
  }, []); // Only run on mount

  console.log('isLoggedIn', isLoggedIn);

  if (isLoggedIn === null) {
    return null;
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
      }}
      initialRouteName={isLoggedIn ? 'MyTabsScreen' : 'OnboardingScreen'}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="SignInScreen" component={SignInScreen} />
      <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
      <Stack.Screen name="OnboardingScreen" component={OnboardingScreen} />
      <Stack.Screen
        name="ForgotPasswordScreen"
        component={ForgotPasswordScreen}
      />
      <Stack.Screen name="MyTabsScreen" component={MyTabs} />
    </Stack.Navigator>
  );
};

export default AuthNavigation;
