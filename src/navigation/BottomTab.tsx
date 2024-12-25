import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen.BottomTab';
import SettingsScreen from '../screens/SettingsScreen.BottomTab';
import ChatScreen from '../screens/ChatScreen.BottomTab';
import {RootStackScreenProps, TabStackParamList} from './AuthNavigation';
import TabBar from './TabBar';
import React from 'react';

const Tab = createBottomTabNavigator<TabStackParamList>();

const MyTabs = ({}: RootStackScreenProps<'MyTabsScreen'>) => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarVisibilityAnimationConfig: {
          show: {
            animation: 'spring',
            config: {stiffness: 1000, damping: 40},
          },
          hide: {
            animation: 'timing',
            config: {duration: 500},
          },
        },
      }}
      tabBar={props => <TabBar {...props} />}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Chats" component={ChatScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
};
export default MyTabs;
