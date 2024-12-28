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
import CommonButton from '../components/CommonButton';
import CommonInputText from '../components/CommonInputText';
import {RootStackScreenProps} from '../navigation/AuthNavigation';
import SignUpThunk from '../redux/thunk/SignUpThunk';
import {useAppDispatch, useAppSelector} from '../redux/Hooks';
import Toast from 'react-native-toast-message';
import {useTheme} from '../components/ThemeProvider';
import {EmailIcon, PassworkLockIcon, UserIcon} from '../assets/svg';

const SignUpScreen = ({navigation}: RootStackScreenProps<'SignUpScreen'>) => {
  const {theme} = useTheme();

  const dispatch = useAppDispatch();

  const {data, loading, signUpStatus} = useAppSelector(
    state => state.SignUpReducer,
  );

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
    if (signUpStatus === 'success') {
      // Call function to add the user to the ChatUsers collection
      // addUserForChat();

      // Show success toast message
      Toast.show({
        type: 'success',
        text1: 'Signup successful!',
        text2: data?.email,
      });

      // Navigate to the SignIn screen after signup
      navigation.navigate('SignInScreen');
    }
  }, [signUpStatus]); // Added dependencies

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    cardView: {
      width: '90%',
      maxWidth: 500,
      backgroundColor: theme.colors.primary,
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
      color: theme.colors.main,
    },
    titleText: {
      fontSize: 26,
      fontWeight: 'bold',
      color: theme.colors.white,
      paddingVertical: 6,
    },
    forgotPasswordText: {
      color: theme.colors.text,
      paddingVertical: 12,
      fontWeight: 'bold',
      textAlign: 'center',
      paddingHorizontal: 10,
    },
    subTitleText: {
      fontSize: 16,
      paddingVertical: 6,
      color: theme.colors.white,
      width: 280,
    },
    buttonView: {
      width: '100%',
    },
  });

  return (
    <View style={styles.container}>
      <CommonBackButton
        onPress={() => navigation.canGoBack() && navigation.goBack()}
      />
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
                isIcon={true}
                Icon={<UserIcon />}
              />
              <CommonInputText
                placeholder="Email"
                onChangeText={value => setUserData({...userData, email: value})}
                textContentType="emailAddress"
                isIcon={true}
                Icon={<EmailIcon />}
              />
              <CommonInputText
                placeholder="Password"
                onChangeText={value =>
                  setUserData({...userData, password: value})
                }
                textContentType="password"
                isIcon={true}
                Icon={<PassworkLockIcon />}
              />
              <CommonInputText
                placeholder="Confirm Password"
                onChangeText={value =>
                  setUserData({...userData, cnf_password: value})
                }
                textContentType="password"
                isIcon={true}
                Icon={<PassworkLockIcon />}
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
          </View>
        </ScrollView>
      </CommonAuthView>
    </View>
  );
};

export default SignUpScreen;
