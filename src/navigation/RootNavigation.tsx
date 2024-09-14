import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AuthNavigation from './AuthNavigation';
import Toast from 'react-native-toast-message';

const RootNavigation = () => {
  return (
    <NavigationContainer>
      <AuthNavigation />
      <Toast position="top" swipeable={false} />
    </NavigationContainer>
  );
};

export default RootNavigation;
