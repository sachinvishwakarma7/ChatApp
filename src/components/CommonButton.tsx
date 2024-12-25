import {
  ActivityIndicator,
  GestureResponderEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import React from 'react';
import {useTheme} from './ThemeProvider';

type appProps = {
  onPress: ((event: GestureResponderEvent) => void) | undefined;
  title?: string;
  type: 'filled' | 'transparent';
  isLoading?: boolean;
  containerStyle?: ViewStyle;
};

const CommonButton = ({
  onPress,
  title = 'click',
  type = 'filled',
  isLoading = false,
  containerStyle,
}: appProps) => {
  const {theme} = useTheme();

  const styles = StyleSheet.create({
    filledButtonView: {
      backgroundColor: theme.colors.main,
      height: 50,
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 6,
      marginVertical: 6,
    },
    filledButtonText: {
      color: theme.colors.white,
    },
    transparentButtonView: {
      height: 50,
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 6,
      marginVertical: 6,
      borderWidth: 1,
      borderColor: theme.colors.main,
    },
    transparentButtonText: {
      color: theme.colors.main,
    },
  });

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        type === 'filled' && styles.filledButtonView,
        type === 'transparent' && styles.transparentButtonView,
        containerStyle,
      ]}>
      {isLoading ? (
        <ActivityIndicator color={'white'} size={'large'} />
      ) : (
        <Text
          style={[
            type === 'filled' && styles.filledButtonText,
            type === 'transparent' && styles.transparentButtonText,
          ]}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default CommonButton;
