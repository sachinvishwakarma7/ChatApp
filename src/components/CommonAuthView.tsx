import {StyleSheet, View} from 'react-native';
import React from 'react';
import {useTheme} from './ThemeProvider';

type Props = {
  children: React.ReactNode;
  iconHeight?: number;
  iconWidth?: number;
  isIcon?: boolean;
};

const CommonAuthView = ({children}: Props) => {
  const {theme} = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    text: {
      color: theme.colors.text,
    },
    primaryCard: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.colors.main,
    },
    mainContainer: {
      position: 'absolute',
      right: 0,
      left: 0,
      bottom: 0,
      top: 0,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 30,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.primaryCard}></View>
      <View style={styles.mainContainer}>{children}</View>
    </View>
  );
};

export default CommonAuthView;
