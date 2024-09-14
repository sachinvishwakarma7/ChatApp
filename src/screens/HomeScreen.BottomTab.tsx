import {Button, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import Toast from 'react-native-toast-message';
import {useAppDispatch, useAppSelector} from '../redux/Hooks';
import {appColor} from '../assets/colors/appColor';
import {signInStatusAction} from '../redux/slices/LoginSlice';
import {TabActionType} from '@react-navigation/native';
import {TabStackParamList} from '../navigation/AuthNavigation';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<TabStackParamList, 'Home'>;

const HomeScreen = ({navigation}: Props) => {
  const dispatch = useAppDispatch();
  const {data, loading, isLogin, signInStatus} = useAppSelector(
    state => state.LoginReducer,
  );

  console.log('data', data);

  useEffect(() => {
    if (signInStatus === 'success') {
      Toast.show({
        type: 'success',
        text1: 'Signin succesfully!',
      });
    }
    dispatch(signInStatusAction('idle'));
  }, [signInStatus]);

  return (
    <View style={styles.container}>
      <Text>HomeScreen.BottomTab</Text>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appColor.lightGray,
  },
});
