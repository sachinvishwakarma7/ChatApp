import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import CommonAuthView from '../components/CommonAuthView';
import CommonBackButton from '../components/CommonBackButton';
import {appColor} from '../assets/colors/appColor';
import CommonButton from '../components/CommonButton';
import CommonInputText from '../components/CommonInputText';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import auth from '@react-native-firebase/auth';

import {RootStackParamList} from '../navigation/AuthNavigation';
import SignUpThunk from '../redux/thunk/SignUpThunk';
import {useAppDispatch, useAppSelector} from '../redux/Hooks';
import {signupStatusAction} from '../redux/slices/SignUpSlice';
import {signInStatusAction} from '../redux/slices/LoginSlice';
import Toast from 'react-native-toast-message';

type Props = NativeStackScreenProps<RootStackParamList, 'SignUpScreen'>;

const SignUpScreen = ({navigation}: Props) => {
  const dispatch = useAppDispatch();

  const {data, loading, signUpStatus} = useAppSelector(
    state => state.SignUpReducer,
  );

  console.log('SignUpRes===>', data);

  const [userData, setUserData] = useState({
    fullName: '',
    email: '',
    password: '',
    cnf_password: '',
  });

  const signUpHandler = () => {
    if (userData.password !== userData.cnf_password) {
      Alert.alert('password is not match!');
      return;
    }
    dispatch(
      SignUpThunk({
        fullName: userData.fullName,
        email: userData.email,
        password: userData.password,
      }),
    );
  };

  useEffect(() => {
    // console.log('signUpStatus', signUpStatus);

    if (signUpStatus === 'success') {
      navigation.navigate('SignInScreen');
      Toast.show({
        type: 'success',
        text1: 'Signup succesfully!',
        text2: data?.email,
      });
    }
  }, [signUpStatus]);

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
            <Text style={styles.titleText}>Sign Up</Text>
            <Text style={styles.subTitleText}>
              Sign Up discover amazing things near around you.
            </Text>
          </View>
          <View style={styles.cardView}>
            <View style={styles.buttonView}>
              <CommonInputText
                placeholder="Full Name"
                onChangeText={value =>
                  setUserData({...userData, fullName: value})
                }
                textContentType="name"
              />
              <CommonInputText
                placeholder="Email"
                onChangeText={value => setUserData({...userData, email: value})}
                textContentType="emailAddress"
              />
              <CommonInputText
                placeholder="Password"
                onChangeText={value =>
                  setUserData({...userData, password: value})
                }
                textContentType="password"
              />
              <CommonInputText
                placeholder="Confirm Password"
                onChangeText={value =>
                  setUserData({...userData, cnf_password: value})
                }
                textContentType="password"
              />
              <CommonButton
                onPress={signUpHandler}
                title="Sign Up"
                type="filled"
                isLoading={loading}
              />
            </View>
            <View>
              <Text style={styles.forgotPasswordText}>
                By signing up accept our{' '}
                <TouchableOpacity>
                  <Text style={styles.termsAndServicesText}>
                    Terms of services
                  </Text>
                </TouchableOpacity>
                and{' '}
                <TouchableOpacity>
                  <Text style={styles.termsAndServicesText}>
                    Privicy Policy
                  </Text>
                </TouchableOpacity>
              </Text>
            </View>
            {/* <View style={styles.dividerView}>
            <View style={styles.dividerLine} />
            <View style={styles.dividerTextView}>
              <Text style={styles.dividerText}>Or connect using</Text>
            </View>
          </View>
          <View style={styles.socialIconContainer}>
            <TouchableOpacity style={styles.socialIconView}>
              <Text style={styles.socialIconText}>f</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialIconView}>
              <Text style={styles.socialIconText}>t</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialIconView}>
              <Text style={styles.socialIconText}>g</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialIconView}>
              <Text style={styles.socialIconText}>m</Text>
            </TouchableOpacity>
          </View> */}
          </View>
          {/* <View style={styles.skipButtonView}>
          <TouchableOpacity>
            <Text style={styles.skipButtonText}>SKIP</Text>
          </TouchableOpacity>
        </View> */}
        </ScrollView>
      </CommonAuthView>
      </View>
  );
};

export default SignUpScreen;

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
  termsAndServicesText: {
    color: appColor.primary,
  },
  titleText: {
    fontSize: 26,
    fontWeight: 'bold',
    color: appColor.white,
    paddingVertical: 6,
  },
  forgotPasswordText: {
    color: appColor.gray,
    paddingVertical: 12,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingHorizontal: 10,
  },
  subTitleText: {
    fontSize: 16,
    paddingVertical: 6,
    color: appColor.white,
    width: 280,
  },
  skipButtonView: {
    position: 'absolute',
    bottom: 26,
    padding: 4,
  },
  skipButtonText: {
    color: appColor.gray,
    fontSize: 18,
    fontWeight: 'bold',
  },
  socialIconContainer: {
    flexDirection: 'row',
  },
  socialIconView: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    width: 40,
    backgroundColor: appColor.primary,
    borderRadius: 6,
    marginHorizontal: 8,
    margin: 20,
  },
  socialIconText: {
    color: appColor.white,
    fontWeight: 'bold',
    fontSize: 18,
  },
  buttonView: {
    width: '100%',
  },
  dividerView: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 22,
  },
  dividerLine: {
    width: 300,
    borderColor: appColor.gray,
    borderBottomWidth: 1,
  },
  dividerTextView: {
    position: 'absolute',
    backgroundColor: appColor.white,
    padding: 6,
  },
  dividerText: {
    alignSelf: 'center',
    color: appColor.gray,
    backgroundColor: appColor.white,
  },
  signUpButton: {
    color: appColor.gray,
    fontWeight: 'bold',
    fontSize: 16,
    alignSelf: 'center',
    padding: 20,
  },
});
