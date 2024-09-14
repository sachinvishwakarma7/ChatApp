import {
  View,
  useWindowDimensions,
  ImageURISource,
  StyleSheet,
  Image,
  ImageProps,
  Text,
} from 'react-native';
import React from 'react';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';

type Props = {
  item: {id: string; title: string; image: ImageProps};
  index: number;
  x: Animated.SharedValue<number>;
};

const ListItem = ({item, index, x}: Props) => {
  const {width} = useWindowDimensions();
  // const rnImageStyle = useAnimatedStyle(() => {
  //   const translateY = interpolate(
  //     x.value,
  //     [
  //       (index - 1) * width,
  //       index * width,
  //       (index + 1) * width,
  //     ],
  //     [100, 0, 100],
  //     Extrapolate.CLAMP
  //   );
  //   const opacity = interpolate(
  //     x.value,
  //     [
  //       (index - 1) * width,
  //       index * width,
  //       (index + 1) * width,
  //     ],
  //     [0, 1, 0],
  //     Extrapolate.CLAMP
  //   );
  //   return {
  //     opacity,
  //     width: width * 0.7,
  //     height: width * 0.7,
  //     transform: [{ translateY}],
  //   };
  // }, [index, x]);

  const rnTextStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      x.value,
      [(index - 1) * width, index * width, (index + 1) * width],
      [0.2, 1, 0.2],
      Extrapolate.CLAMP,
    );
    const opacity = interpolate(
      x.value,
      [(index - 1) * width, index * width, (index + 1) * width],
      [0, 1, 0],
      Extrapolate.CLAMP,
    );
    return {
      opacity,
      transform: [{scale: translateY}],
    };
  }, [index, x]);
  return (
    <View style={[styles.itemContainer, {width: width}]}>
      {/* <Animated.Image
          source={item.image}
          style={rnImageStyle}
          resizeMode="contain"
        /> */}
      <View>
        <Image
          source={item.image}
          resizeMode="stretch"
          style={{height: width - 100, width: width - 100}}
        />
      </View>
      <Animated.Text style={[styles.textItem1, rnTextStyle]}>
        {item.title}
      </Animated.Text>
      <Animated.Text style={[styles.textItem2, rnTextStyle]}>
        {item.title}
      </Animated.Text>
    </View>
  );
};

export default React.memo(ListItem);

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textItem1: {
    flexDirection: 'column',
    fontWeight: '600',
    lineHeight: 41,
    fontSize: 20,
    color: 'gray',
    textAlign: 'center',
  },
  textItem2: {
    flexDirection: 'column',
    fontWeight: '300',
    lineHeight: 41,
    fontSize: 16,
    color: 'gray',
    textAlign: 'center',
  },
});
