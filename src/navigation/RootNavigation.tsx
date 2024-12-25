import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AuthNavigation from './AuthNavigation';
import Toast from 'react-native-toast-message';

const RootNavigation = () => {
  return (
      <NavigationContainer>
        <AuthNavigation />
        <Toast position="top" visibilityTime={2000} swipeable={false} />
      </NavigationContainer>
  );
};

export default RootNavigation;
