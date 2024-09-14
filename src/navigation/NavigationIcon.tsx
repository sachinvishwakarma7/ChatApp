import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {appColor} from '../assets/colors/appColor';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {HomeIcon, ProfileIcon, SettingIcon} from '../assets/svg';

type NavigationIconType = {
  route: string;
  isFocused: boolean;
};

const NavigationIcon = ({route, isFocused}: NavigationIconType) => {
  const renderHomeIcon = (route: string, isFocused: boolean) => {
    let icon;
    switch (route) {
      case 'Home':
        icon = (
          <HomeIcon
            width="20px"
            height="20px"
            // stroke={isFocused && appColor.primary}
          />
        );
        break;
      case 'Profile':
        icon = (
          <ProfileIcon
            width="20px"
            height="20px"
            // stroke={isFocused && appColor.primary}
          />
        );
        break;
      case 'Settings':
        icon = (
          <SettingIcon
            width="20px"
            height="20px"
            // stroke={isFocused && appColor.primary}
          />
        );
        break;
      default:
        icon = null; // Or a default icon if needed
        break;
    }
    return icon;
  };

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      {renderHomeIcon(route, isFocused)}
      {isFocused && (
        <Text
          style={[
            styles.labelText,
            {
              color: !isFocused ? appColor.black : appColor.primary,
              // fontWeight: 'bold',
              fontSize: 12,
            },
          ]}>
          {route}
        </Text>
      )}
    </View>
  );
};

export default NavigationIcon;

const styles = StyleSheet.create({
  labelText: {
    color: appColor.white,
    // iOS shadow properties
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 8,
    // Android shadow properties
    elevation: 5,
    padding: 4,
  },
});
