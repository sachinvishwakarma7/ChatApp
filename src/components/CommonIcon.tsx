import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {appColor} from '../assets/colors/appColor';

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

const styles = StyleSheet.create({
  iconViewContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconNameText: {
    color: appColor.white,
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
    backgroundColor: appColor.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
