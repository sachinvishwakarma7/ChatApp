import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen.BottomTab';
import SettingsScreen from '../screens/SettingsScreen.BottomTab';
import ProfileScreen from '../screens/ProfileScreen.BottomTab';
import {TabStackParamList} from './AuthNavigation';
import TabBar from './TabBar';

const Tab = createBottomTabNavigator<TabStackParamList>();

const MyTabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarVisibilityAnimationConfig: {
          show: {
            animation: 'timing', // 'timing' or 'spring'
            config: {duration: 300}, // Duration for show animation
          },
          hide: {
            animation: 'timing', // 'timing' or 'spring'
            config: {duration: 300}, // Duration for hide animation
          },
        },
      }}
      tabBar={props => <TabBar {...props} />}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
};
export default MyTabs;
