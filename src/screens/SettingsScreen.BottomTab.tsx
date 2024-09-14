import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {appColor} from '../assets/colors/appColor';
import {TabStackParamList} from '../navigation/AuthNavigation';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useAppDispatch} from '../redux/Hooks';

import CommonButton from '../components/CommonButton';
import {LogoutApp} from '../assets/utils/logout';

type Props = NativeStackScreenProps<TabStackParamList, 'Settings'>;

const SettingsScreen = ({navigation}: Props) => {
  const dispatch = useAppDispatch();

  return (
    <View style={styles.container}>
      <Text>logoutHandler</Text>
      <CommonButton
        title="Logout"
        type="filled"
        onPress={() => LogoutApp(dispatch, navigation)}
      />
    </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appColor.lightGray,
  },
});
