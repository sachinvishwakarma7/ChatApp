import React, {useEffect, useState} from 'react';
// import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import OnboardingScreen from '../screens/OnboardingScreen';
import MyTabs from './BottomTab';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import ChatUserScreen from '../screens/ChatUserScreen';
import {
  BottomTabNavigationProp,
  BottomTabScreenProps,
} from '@react-navigation/bottom-tabs';
import {
  CompositeNavigationProp,
  CompositeScreenProps,
} from '@react-navigation/native';

export type HomeTabParamList = {};
export type ChatsTabParamList = {};
export type SettingsTabParamList = {};

export type TabStackParamList = {
  Home: HomeTabParamList;
  Chats: ChatsTabParamList;
  Settings: SettingsTabParamList;
};

export type userDataParamList = {
  selectedUserData: {
    email?: string;
    id?: string;
    name?: string;
    userId?: string;
  };
};

export type RootStackParamList = {
  HomeScreen: undefined;
  SignInScreen: undefined;
  SignUpScreen: undefined;
  OnboardingScreen: undefined;
  ForgotPasswordScreen: undefined;
  ChatUserScreen: userDataParamList;
  MyTabsScreen: TabStackParamList;
};

// Type for Stack Navigation Props
export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

// Type for Tab Navigation Props
export type HomeTabScreenProps = CompositeScreenProps<
  BottomTabScreenProps<TabStackParamList, 'Home'>,
  RootStackScreenProps<keyof RootStackParamList>
>;

export type ChatsTabScreenProps = CompositeScreenProps<
  BottomTabScreenProps<TabStackParamList, 'Chats'>,
  RootStackScreenProps<keyof RootStackParamList>
>;

export type SettingsTabScreenProps = CompositeScreenProps<
  BottomTabScreenProps<TabStackParamList, 'Settings'>,
  RootStackScreenProps<keyof RootStackParamList>
>;

export type CommonNavigationType = CompositeNavigationProp<
  BottomTabNavigationProp<TabStackParamList, 'Settings'>,
  NativeStackNavigationProp<RootStackParamList>
>;

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
        animation: 'ios',
      }}
      initialRouteName={isLoggedIn ? 'MyTabsScreen' : 'OnboardingScreen'}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="SignInScreen" component={SignInScreen} />
      <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
      <Stack.Screen name="ChatUserScreen" component={ChatUserScreen} />
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
