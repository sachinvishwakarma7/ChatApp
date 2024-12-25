import React, {useEffect} from 'react';
import {View, Pressable, StyleSheet, useWindowDimensions} from 'react-native';
import NavigationIcon from './NavigationIcon';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import {useTheme} from '../components/ThemeProvider';

const TabBar = ({state, descriptors, navigation}: any) => {
  const {width} = useWindowDimensions();
  const {theme} = useTheme();
  const tabWidth = width / state.routes.length;
  const highlightPosition = useSharedValue(0);

  useEffect(() => {
    highlightPosition.value = state.index * tabWidth;
  }, [state.index, tabWidth]);

  const highlightStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateX: withSpring(highlightPosition.value)}],
    };
  });
  const styles = StyleSheet.create({
    mainContainer: {
      flexDirection: 'row',
      position: 'absolute',
      bottom: 0,
      backgroundColor: theme.colors.primary,
    },
    highlight: {
      position: 'absolute',
      bottom: 20,
      height: 44,
      backgroundColor: theme.colors.secondary,
      borderRadius: 25,
    },
    tabItemContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingVertical: 20,
    },
  });
  return (
    <View style={styles.mainContainer}>
      {/* Highlight Indicator */}
      <Animated.View
        style={[
          styles.highlight,
          highlightStyle,
          {width: tabWidth * 0.8},
          {left: tabWidth * 0.1},
        ]}
      />
      {state.routes.map((route: any, index: number) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <Pressable
            key={index}
            onPress={onPress}
            style={styles.tabItemContainer}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                flex: 1,
                padding: 10,
              }}>
              <NavigationIcon route={label} isFocused={isFocused} />
            </View>
          </Pressable>
        );
      })}
    </View>
  );
};

export default TabBar;
