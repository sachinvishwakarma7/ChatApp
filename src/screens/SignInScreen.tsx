import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import CommonAuthView from '../components/CommonAuthView';
import CommonBackButton from '../components/CommonBackButton';
import {appColor} from '../assets/colors/appColor';
import CommonButton from '../components/CommonButton';
import CommonInputText from '../components/CommonInputText';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigation/AuthNavigation';
import {useAppDispatch, useAppSelector} from '../redux/Hooks';
import LoginThunk from '../redux/thunk/LoginThunk';
import Toast from 'react-native-toast-message';

type Props = NativeStackScreenProps<RootStackParamList, 'SignInScreen'>;

const SignInScreen = ({navigation}: Props) => {
  const {data, loading, isLogin, signInStatus} = useAppSelector(
    state => state.LoginReducer,
  );
  const dispatch = useAppDispatch();

  // console.log('loginRes===>', data);

  const [userData, setUserData] = useState({
    email: '',
    password: '',
  });

  const handleLogin = () => {
    dispatch(
      LoginThunk({
        email: userData.email,
        password: userData.password,
      }),
    );
  };

  useEffect(() => {
    // console.log("signInStatus", signInStatus);

    if (signInStatus === 'success') {
      navigation.reset({
        index: 0,
        routes: [{name: 'MyTabsScreen'}],
      });
      Toast.show({
        type: 'success',
        text1: 'Successful Singing!',
      });
    }
  }, [signInStatus]);

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
            <Text style={styles.titleText}>Sign In</Text>
            <Text style={styles.subTitleText}>
              Sign in discover amazing things near around you.
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
              <CommonInputText
                onChangeText={(value: string) =>
                  setUserData({...userData, password: value})
                }
                placeholder="Password"
                textContentType="password"
              />
              <CommonButton
                onPress={handleLogin}
                title="Sign in"
                type="filled"
                isLoading={loading}
              />
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate('ForgotPasswordScreen')}>
              <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>
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

export default SignInScreen;

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
    maxWidth: 500,
  },
  titleText: {
    fontSize: 26,
    fontWeight: 'bold',
    color: appColor.white,
    paddingVertical: 6,
  },
  forgotPasswordText: {
    color: appColor.primary,
    paddingVertical: 12,
    fontWeight: 'bold',
  },
  subTitleText: {
    fontSize: 16,
    paddingVertical: 6,
    color: appColor.white,
    width: 280,
  },
  skipButtonView: {
    position: 'absolute',
    bottom: 40,
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
});
