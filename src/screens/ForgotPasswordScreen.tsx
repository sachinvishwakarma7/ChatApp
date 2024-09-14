import {StyleSheet, Text, View, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import CommonAuthView from '../components/CommonAuthView';
import CommonBackButton from '../components/CommonBackButton';
import {appColor} from '../assets/colors/appColor';
import CommonButton from '../components/CommonButton';
import CommonInputText from '../components/CommonInputText';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigation/AuthNavigation';
import {useAppDispatch, useAppSelector} from '../redux/Hooks';
import ForgotPasswordThunk from '../redux/thunk/ForgotPasswordThunk';
import {resetForgotPasswordAction} from '../redux/slices/ForgotPasswordReducer';

type Props = NativeStackScreenProps<RootStackParamList, 'ForgotPasswordScreen'>;

const ForgotPasswordScreen = ({navigation}: Props) => {
  const {data, loading} = useAppSelector(state => state.ForgotPasswordReducer);

  console.log('forgotpassword data==>', data);

  const dispatch = useAppDispatch();
  const [userData, setUserData] = useState({
    email: '',
  });

  useEffect(() => {
    console.log('forgotpassword useEffect', data);

    if (data?.passwordReset === 'success') {
      navigation.navigate('SignInScreen');
      dispatch(resetForgotPasswordAction());
    }
  }, [data]);

  const forgotPasswordhandler = () => {
    dispatch(
      ForgotPasswordThunk({
        email: userData.email,
      }),
    );
  };

  return (
    <View style={styles.container}>
      <CommonBackButton onPress={async () => navigation.goBack()} />
      <CommonAuthView>
        <ScrollView
          style={{
            flex: 1,
            width: '100%',
          }}
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: 'center',
            alignContent: 'center',
          }}>
          <View style={styles.titleTextView}>
            <Text style={styles.titleText}>Forgot you password?</Text>
            <Text style={styles.subTitleText}>
              Please enter ther email address you'd will like your password
              reset information sent to.
            </Text>
          </View>
          <View style={styles.cardView}>
            <View style={styles.buttonView}>
              <CommonInputText
                onChangeText={(value: string) =>
                  setUserData({...userData, email: value})
                }
                placeholder="Email"
                textContentType="emailAddress"
              />
              <CommonButton
                onPress={forgotPasswordhandler}
                title="Request reset link"
                type="filled"
                isLoading={loading}
              />
            </View>
          </View>
        </ScrollView>
      </CommonAuthView>
    </View>
  );
};

export default ForgotPasswordScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardView: {
    width: '90%',
    maxWidth: 500,
    backgroundColor: appColor.white,
    marginHorizontal: 20,
    padding: 20,
    borderRadius: 22,
    alignSelf: 'center',
    alignItems: 'center',
  },
  titleTextView: {
    padding: 30,
  },
  titleText: {
    fontSize: 26,
    fontWeight: 'bold',
    color: appColor.white,
    paddingVertical: 6,
  },
  subTitleText: {
    fontSize: 16,
    paddingVertical: 6,
    color: appColor.white,
    width: 280,
  },
  buttonView: {
    width: '100%',
  },
});
