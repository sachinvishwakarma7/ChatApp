import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {NativeStackScreenProps} from 'react-native-screens/lib/typescript/native-stack/types';
import {TabStackParamList} from '../navigation/AuthNavigation';

import {appColor} from '../assets/colors/appColor';

type Props = NativeStackScreenProps<TabStackParamList, 'Profile'>;

const ProfileScreen = ({navigation}: Props) => {
  
  return (
    <View style={styles.container}>
      <Text>Logout</Text>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appColor.lightGray,
  },
});
