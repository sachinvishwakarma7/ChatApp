import {
  FlatList,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {SettingsTabScreenProps} from '../navigation/AuthNavigation';
import {useAppDispatch, useAppSelector} from '../redux/Hooks';

import {LogoutApp} from '../utils/logout';
import {useTheme} from '../components/ThemeProvider';
import {LogoutIcon, UserIcon} from '../assets/svg';
import {setIsDarkThemeAction} from '../redux/slices/LoginSlice';
import CommonBackButton from '../components/CommonBackButton';

const SettingsScreen = ({navigation}: SettingsTabScreenProps) => {
  const {theme, toggleTheme} = useTheme();
  const dispatch = useAppDispatch();
  const {data, loading, isLogin, signInStatus, isDarkTheme} = useAppSelector(
    state => state.LoginReducer,
  );

  const [isSwitchOn, setIsSwitchOn] = useState(isDarkTheme);

  const menuData = [
    {
      id: 1,
      title: 'Edit Profile',
      icon: <UserIcon />,
    },
    {
      id: 2,
      title: 'Logout',
      icon: <LogoutIcon />,
    },
  ];
  const actionController = (title: string) => {
    switch (title) {
      case 'Edit Profile':
        console.log('Edit Profile action triggered');
        break;

      case 'Logout':
        LogoutApp(dispatch, navigation, data?.uid);
        console.log('Logout action triggered');
        break;

      default:
        console.log('No matching action');
        break;
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.primary,
      // padding: 20,
    },
    headerView: {
      backgroundColor: theme.colors.primary,
      padding: 20,
    },
    titleText: {
      color: theme.colors.white,
      fontSize: 20,
    },
    menuView: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 4,
    },
    iconView: {
      height: 40,
      width: 40,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 10,
    },
    title: {
      color: theme.colors.text,
      fontSize: 16,
    },
    switchView: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 30,
    },
  });

  return (
    <View style={styles.container}>
      {/* <View style={styles.headerView}>
        <Text style={styles.titleText}>Setting</Text>
      </View> */}
      <CommonBackButton
        onPress={() => navigation.canGoBack() && navigation.goBack()}>
        <Text style={styles.titleText}>{`Settings`}</Text>
      </CommonBackButton>
      <View style={{padding: 20}}>
        <FlatList
          data={menuData}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => actionController(item.title)}
              style={styles.menuView}>
              <View style={styles.iconView}>{item.icon}</View>
              <Text style={styles.title}>{item.title}</Text>
            </TouchableOpacity>
          )}
        />
      </View>

      <View style={styles.switchView}>
        <Text style={styles.title}>Dark Mode</Text>
        <Switch
          value={isSwitchOn}
          onValueChange={() => {
            setIsSwitchOn(!isSwitchOn);
            toggleTheme();
            dispatch(setIsDarkThemeAction(!isSwitchOn));
          }}
        />
      </View>
      <View style={{position: 'absolute', bottom: 100, alignSelf: 'center'}}>
        <Text style={{color: theme.colors.text}}>App Version: 0.01</Text>
      </View>
    </View>
  );
};

export default SettingsScreen;
