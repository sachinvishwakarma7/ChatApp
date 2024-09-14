import 'react-native-gesture-handler';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import Animated, {
  clamp,
  useAnimatedStyle,
  useSharedValue,
  withDecay,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';

const ProfileScreen = () => {
  const pressed = useSharedValue<boolean>(false);
  const offset = useSharedValue<number>(0);
  const width = useSharedValue<number>(0);

  const SIZE = 120;
  const BOUNDARY_OFFSET = 10;

  const animatedStyle = useAnimatedStyle(() => ({
    backgroundColor: pressed.value ? 'red' : 'blue',
    transform: [{translateX: offset.value}],
  }));

  const onLayout = event => {
    width.value = event.nativeEvent.layout.width;
  };

  const tap = Gesture.Pan()
    .onChange(event => {
      offset.value += event.changeX;
    })
    .onFinalize(event => {
      offset.value = withDecay({
        velocity: event.velocityX,
        rubberBandEffect: true,
        clamp: [
          -(width.value / 2) + SIZE / 2 + BOUNDARY_OFFSET,
          width.value / 2 - SIZE / 2 - BOUNDARY_OFFSET,
        ],
      });
      pressed.value = false;
    });
  return (
    <GestureHandlerRootView style={styles.container}>
      <View onLayout={onLayout} style={styles.wrapper}>
        <GestureDetector gesture={tap}>
          <Animated.View style={[styles.circle, animatedStyle]} />
        </GestureDetector>
      </View>
    </GestureHandlerRootView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  circle: {
    height: 120,
    width: 120,
    borderRadius: 60,
  },
  wrapper: {
    alignItems: 'center',
  },
});

// import 'react-native-gesture-handler';
// import React from 'react';
// import { StyleSheet, View } from 'react-native';
// import Animated, {
//   useAnimatedStyle,
//   useSharedValue,
//   withTiming,
// } from 'react-native-reanimated';
// // highlight-start
// import {
//   Gesture,
//   GestureDetector,
//   GestureHandlerRootView,
// } from 'react-native-gesture-handler';
// // highlight-end

// export default function ProfileScreen() {
//   const pressed = useSharedValue<boolean>(false);

//   const tap = Gesture.Tap()
//     .onBegin(() => {
//       pressed.value = true;
//     })
//     .onFinalize(() => {
//       pressed.value = false;
//     });

//   const animatedStyles = useAnimatedStyle(() => ({
//     backgroundColor: pressed.value ? '#FFE04B' : '#B58DF1',
//     transform: [{ scale: withTiming(pressed.value ? 1.2 : 1) }],
//   }));

//   return (
//     <GestureHandlerRootView style={styles.container}>
//       {/* <View style={styles.container}> */}
//         {/* highlight-next-line */}
//         <GestureDetector gesture={tap}>
//           <Animated.View style={[styles.circle, animatedStyles]} />
//           {/* highlight-next-line */}
//         </GestureDetector>
//       {/* </View> */}
//     </GestureHandlerRootView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     height: '100%',
//   },
//   circle: {
//     height: 120,
//     width: 120,
//     borderRadius: 500,
//   },
// });
