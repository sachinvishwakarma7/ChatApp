import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import BackIcon from '../assets/images/icons/BackIcon';
import {appColor} from '../assets/colors/appColor';

const CommonBackButton = ({onPress}: {onPress?: () => {}}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress} style={styles.bakcButtonIconView}>
        <BackIcon />
      </TouchableOpacity>
    </View>
  );
};

export default CommonBackButton;

const styles = StyleSheet.create({
  container: {
    height: 70,
    backgroundColor: appColor.primary, // Change to your content background
    // padding: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 10, // This softens the shadow
    elevation: 5, // Required for Android shadows
  },
  bakcButtonIconView: {
    zIndex: 100,
    position: 'absolute',
    margin: 20,
    // paddingTop: 20,
    left: 0,
    top: 0,
  },
});
