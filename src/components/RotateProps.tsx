import {
  Image,
  StyleSheet,
  View,
  ImageSourcePropType,
  StyleProp,
} from 'react-native';
import React from 'react';
import Animated, {
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  Easing,
} from 'react-native-reanimated';

type RotatePropsProps = {
  backgroundColor?: string;
  imageSrc?: ImageSourcePropType;
  imageStyle?: StyleProp;
};

const RotateProps = ({
  backgroundColor = 'red',
  imageSrc,
  imageStyle,
}: RotatePropsProps) => {
  const propRotate = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotate: withRepeat(
            withSequence(
              withTiming(360 + 'deg', {duration: 0, easing: Easing.linear}),
              withTiming(0 + 'deg', {duration: 50000, easing: Easing.linear}),
            ),
            -1,
            false,
          ),
        },
      ],
    };
  });

  return (
    <View style={styles.container}>
      <View
        style={[styles.propBackground, {backgroundColor: backgroundColor}]}
      />
      <Animated.View style={[propRotate]}>
        <Image
          style={{...imageStyle}}
          source={
            !imageSrc ? require('../assets/images/icon-bone.png') : imageSrc
          }
        />
      </Animated.View>
    </View>
  );
};

export default RotateProps;

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  propBackground: {
    position: 'absolute',
    height: 50,
    width: 50,
    borderRadius: 25,
  },
});
