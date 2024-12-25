import React, {useState, useEffect} from 'react';
import {Dimensions, Image, StyleSheet, View} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';

type CommonCarouselType = {
  data: string[];
};

const CommonCarousel = ({data = []}: CommonCarouselType) => {
  const [screenWidth, setScreenWidth] = useState(
    Dimensions.get('screen').width,
  );

  useEffect(() => {
    const updateDimensions = () => {
      setScreenWidth(Dimensions.get('screen').width);
    };
    const unsubscribe = Dimensions.addEventListener('change', updateDimensions);

    return () => {
      unsubscribe.remove();
    };
  }, []);

  return (
    // <View style={{width: screenWidth - 100, height: screenWidth / 2}}>
    <Carousel
      loop
      width={screenWidth * 0.8}
      height={(screenWidth * 0.8) / 2}
      data={data}
      scrollAnimationDuration={1000}
      renderItem={({item}) => (
        <Image
          style={styles.image}
          resizeMode="cover"
          source={
            typeof item === 'string'
              ? {uri: item} // Handle remote image URLs
              : item // Handle local image resources
          }
        />
      )}
    />
    // </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%',
  },
});

export default CommonCarousel;
