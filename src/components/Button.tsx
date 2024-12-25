import {ImageURISource, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useCallback} from 'react';
import Animated, {
  useAnimatedStyle,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigation/AuthNavigation';
import {CommonActions} from '@react-navigation/native';
import {useTheme} from './ThemeProvider';

type ButtonProps = {
  currentIndex: Animated.SharedValue<number>;
  length: number;
  flatListRef: any;
  navigation: NativeStackNavigationProp<
    RootStackParamList,
    'OnboardingScreen',
    'Stack'
  >;
};

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const Button = ({
  currentIndex,
  length,
  flatListRef,
  navigation,
}: ButtonProps) => {
  const {theme} = useTheme();
  const rnBtnStyle = useAnimatedStyle(() => {
    return {
      width:
        currentIndex.value === length - 1 ? withSpring(60) : withSpring(100),
      height: 40,
    };
  }, [currentIndex, length]);

  const rnTextStyle = useAnimatedStyle(() => {
    return {
      opacity:
        currentIndex.value === length - 1 ? withTiming(1) : withTiming(0),
      transform: [
        {
          translateX:
            currentIndex.value === length - 1 ? withTiming(0) : withTiming(100),
        },
      ],
    };
  }, [currentIndex, length]);

  const imageAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity:
        currentIndex.value !== length - 1 ? withTiming(1) : withTiming(0),
      transform: [
        {
          translateX:
            currentIndex.value !== length - 1 ? withTiming(0) : withTiming(100),
        },
      ],
    };
  }, [currentIndex, length]);

  const onPress = useCallback(() => {
    if (currentIndex.value === length - 1) {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'HomeScreen'}],
        }),
      );
      return;
    } else {
      flatListRef?.current?.scrollToIndex({
        index: currentIndex.value + 1,
      });
    }
  }, [currentIndex, length]);

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      borderRadius: 100,
      backgroundColor: theme.colors.main,
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
    },
    textStyle: {
      color: theme.colors.white,
      position: 'absolute',
      fontWeight: '600',
      fontSize: 16,
    },
    imageStyle: {
      fontWeight: '600',
      fontSize: 16,
      position: 'absolute',
      color: theme.colors.white,
    },
  });

  return (
    <AnimatedPressable style={[styles.container, rnBtnStyle]} onPress={onPress}>
      <Animated.Text style={[styles.textStyle, rnTextStyle]}>Go</Animated.Text>
      {/* <Animated.Image
          source={require('./assets/arrow.png')}
          style={[styles.imageStyle, imageAnimatedStyle]}
        /> */}
      <Animated.Text style={[styles.imageStyle, imageAnimatedStyle]}>
        Next
      </Animated.Text>
    </AnimatedPressable>
  );
};

export default Button;
