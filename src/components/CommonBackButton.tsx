import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React from 'react';
import BackIcon from '../assets/images/icons/BackIcon';
import {useTheme} from './ThemeProvider';

type CommonBackButtonType = {
  onPress?: () => void;
  isTitle?: boolean;
  title?: string;
  children?: React.ReactElement;
  titleContainer?: ViewStyle;
};

const CommonBackButton = ({
  onPress,
  isTitle = false,
  title,
  children,
  titleContainer,
}: CommonBackButtonType) => {
  const {theme} = useTheme();
  const styles = StyleSheet.create({
    container: {
      justifyContent: 'center',
      height: 70,
      backgroundColor: theme.colors.main, // Change to your content background
      // padding: 20,
      shadowColor: theme.colors.text,
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
    titleContainer: {
      paddingLeft: 80,
    },
  });
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress} style={styles.bakcButtonIconView}>
        <BackIcon />
      </TouchableOpacity>
      <View style={[styles.titleContainer, titleContainer]}>{children}</View>
    </View>
  );
};

export default CommonBackButton;
