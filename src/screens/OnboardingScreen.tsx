import {
  StyleSheet,
  Text,
  View,
  PanResponder,
  useWindowDimensions,
  ViewToken,
  SafeAreaView,
  Pressable,
  ImageProps,
} from 'react-native';
import React, {useCallback, useRef, useState} from 'react';
import {FlatList} from 'react-native-gesture-handler';
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import PaginationElement from '../components/PaginationElement';
import Button from '../components/Button';
import ListItem from '../components/ListItem';
import {appColor} from '../assets/colors/appColor';
import {
  NavigationAction,
  NavigationProp,
  NavigationState,
} from '@react-navigation/native';
import {RootStackParamList} from '../navigation/AuthNavigation';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

const defaultData = [
  {
    id: '1',
    title: 'Set your best planning now',
    image: require('../assets/images/onboarding/page_1.jpg'),
  },
  {
    id: '2',
    title: 'Moniter your business',
    image: require('../assets/images/onboarding/page_1.jpg'),
  },
  {
    id: '3',
    title: 'Get solution from our services',
    image: require('../assets/images/onboarding/page_1.jpg'),
  },
  {
    id: '4',
    title: 'Set your best planning now',
    image: require('../assets/images/onboarding/page_1.jpg'),
  },
];

type Props = NativeStackScreenProps<
  RootStackParamList,
  'OnboardingScreen',
  'Stack'
>;

const OnboardingScreen = ({navigation}: Props) => {
  const x = useSharedValue(0);
  const flatListIndex = useSharedValue(0);
  const flatListRef = useAnimatedRef<
    Animated.FlatList<{
      id: string;
      title: string;
    }>
  >();

  const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

  const onViewableItemsChanged = useCallback(
    ({viewableItems}: {viewableItems: ViewToken[]}) => {
      flatListIndex.value = viewableItems[0]?.index ?? 0;
    },
    [],
  );
  const scrollHandle = useAnimatedScrollHandler({
    onScroll: event => {
      x.value = event.contentOffset.x;
    },
  });

  const skipTextStyle = useAnimatedStyle(() => {
    return {
      opacity:
        flatListIndex.value === defaultData.length - 1
          ? withTiming(0)
          : withTiming(1),
      transform: [
        {
          scale:
            flatListIndex.value === defaultData.length - 1
              ? withSpring(0)
              : withSpring(1),
        },
      ],
    };
  }, [flatListIndex, defaultData]);

  const skipHandler = useCallback(() => {
    if (true) {
      flatListRef?.current?.scrollToIndex({
        index: defaultData.length - 1,
      });
    }
  }, []);

  const renderItem = useCallback(
    ({
      item,
      index,
    }: {
      item: {id: string; title: string; image: ImageProps};
      index: number;
    }) => {
      return <ListItem item={item} index={index} x={x} />;
    },
    [x],
  );

  return (
    <SafeAreaView style={styles.container}>
      <Animated.FlatList
        data={defaultData}
        bounces={false}
        pagingEnabled={true}
        ref={flatListRef}
        showsHorizontalScrollIndicator={false}
        onScroll={scrollHandle}
        scrollEventThrottle={16}
        horizontal
        keyExtractor={item => item.id}
        renderItem={renderItem}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{
          itemVisiblePercentThreshold: 50,
        }}
      />
      <AnimatedPressable
        onPress={skipHandler}
        style={[
          {
            position: 'absolute',
            right: 30,
            top: 30,
            // backgroundColor: appColor.primary,
            // borderRadius: 30,
            padding: 10,
            // paddingHorizontal: 20,
          },
          skipTextStyle,
        ]}>
        <Animated.Text style={{color: appColor.primary, fontWeight: 'bold'}}>
          Skip
        </Animated.Text>
      </AnimatedPressable>
      <View style={styles.bottomContainer}>
        <PaginationElement length={defaultData.length} x={x} />
        <Button
          currentIndex={flatListIndex}
          length={defaultData.length}
          flatListRef={flatListRef}
          navigation={navigation}
        />
      </View>
    </SafeAreaView>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appColor.white,
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'transparent',
    padding: 10,
    paddingBottom: 40,
    paddingHorizontal: 20,
  },
  text: {
    alignSelf: 'center',
    color: 'gray',
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'green',
    marginBottom: 6,
  },
  paragraph: {
    fontSize: 14,
  },
});
