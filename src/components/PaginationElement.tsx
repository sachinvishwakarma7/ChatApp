import {StyleSheet, Text, View, useWindowDimensions} from 'react-native';
import React, {useCallback} from 'react';
import Animated, {
  Extrapolate,
  interpolate,
  interpolateColor,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {appColor} from '../assets/colors/appColor';

type Props = {
  length: number;
  x: Animated.SharedValue<number>;
};

const PaginationElement = ({length, x}: Props) => {
  const {width: SCREEN_WIDTH} = useWindowDimensions();

  const PaginationComponent = useCallback(({index}: {index: number}) => {
    const itemRnStyle = useAnimatedStyle(() => {
      const width = interpolate(
        x.value,
        [
          (index - 1) * SCREEN_WIDTH,
          index * SCREEN_WIDTH,
          (index + 1) * SCREEN_WIDTH,
        ],
        [16, 35, 16],
        Extrapolate.CLAMP,
      );

      const bgColor = interpolateColor(
        x.value,
        [
          (index - 1) * SCREEN_WIDTH,
          index * SCREEN_WIDTH,
          (index + 1) * SCREEN_WIDTH,
        ],
        [appColor.lightGray, appColor.primary, appColor.lightGray],
      );

      return {
        width,
        backgroundColor: bgColor,
      };
    }, [x]);
    return <Animated.View style={[styles.itemStyle, itemRnStyle]} />;
  }, []);

  return (
    <View style={styles.container}>
      {Array.from({length}).map((_, index) => {
        return <PaginationComponent index={index} key={index} />;
      })}
    </View>
  );
};

export default PaginationElement;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemStyle: {
    width: 35,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
});