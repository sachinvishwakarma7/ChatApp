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
import CommonButton from '../components/CommonButton';
import CommonInputText from '../components/CommonInputText';
import {
  RootStackParamList,
  RootStackScreenProps,
} from '../navigation/AuthNavigation';
import {useAppDispatch, useAppSelector} from '../redux/Hooks';
import LoginThunk from '../redux/thunk/LoginThunk';
import Toast from 'react-native-toast-message';
import {useTheme} from '../components/ThemeProvider';

const SignInScreen = ({navigation}: RootStackScreenProps<'SignInScreen'>) => {
  const {theme} = useTheme();
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
      maxWidth: 500,
    },
    titleText: {
      fontSize: 26,
      fontWeight: 'bold',
      color: theme.colors.white,
      paddingVertical: 6,
    },
    forgotPasswordText: {
      color: theme.colors.main,
      paddingVertical: 12,
      fontWeight: 'bold',
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
          </View>
        </ScrollView>
      </CommonAuthView>
    </View>
  );
};

export default SignInScreen;
