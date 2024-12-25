import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useTheme} from './ThemeProvider';

type Props = {
  iconHeight?: number;
  iconWidth?: number;
  title?: string;
};

const CommonIcon = ({
  title = 'APP ICON',
  iconHeight = 100,
  iconWidth = 100,
}: Props) => {
  const {theme} = useTheme();

  const styles = StyleSheet.create({
    iconViewContainer: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    iconNameText: {
      color: theme.colors.white,
      fontSize: 20,
      fontWeight: 'bold',
      paddingVertical: 10,
    },
    tinyLogo: {
      width: 90,
      height: 90,
    },
    mainIconView: {
      borderRadius: 20,
      backgroundColor: theme.colors.primary,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

  return (
    <View style={styles.iconViewContainer}>
      <View
        style={[{height: iconHeight, width: iconWidth}, styles.mainIconView]}>
        <Image
          style={styles.tinyLogo}
          source={require('../assets/images/LOGO/myapp_icon.png')}
        />
      </View>
      <Text style={styles.iconNameText}>{title}</Text>
    </View>
  );
};

export default CommonIcon;
