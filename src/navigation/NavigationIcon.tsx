import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {HomeIcon, ProfileIcon, SettingIcon} from '../assets/svg';
import {useTheme} from '../components/ThemeProvider';

type NavigationIconType = {
  route: string;
  isFocused: boolean;
};

const NavigationIcon = ({route, isFocused}: NavigationIconType) => {
  const {theme} = useTheme();

  const renderHomeIcon = (route: string, isFocused: boolean) => {
    let icon;
    switch (route) {
      case 'Home':
        icon = (
          <HomeIcon
            width="20px"
            height="20px"
            fill={isFocused && theme.colors.main}
          />
        );
        break;
      case 'Chats':
        icon = (
          <ProfileIcon
            width="20px"
            height="20px"
            stroke={isFocused && theme.colors.main}
          />
        );
        break;
      case 'Settings':
        icon = (
          <SettingIcon
            width="20px"
            height="20px"
            stroke={isFocused && theme.colors.main}
          />
        );
        break;
      default:
        icon = null; // Or a default icon if needed
        break;
    }
    return icon;
  };

  const styles = StyleSheet.create({
    labelText: {
      // color: theme.colors.main,
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
              color: !isFocused ? theme.colors.main : theme.colors.main,
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
