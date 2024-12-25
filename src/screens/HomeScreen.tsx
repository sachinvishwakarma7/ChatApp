import {StyleSheet, Text, View, ScrollView} from 'react-native';
import React from 'react';
import CommonButton from '../components/CommonButton';
import CommonAuthView from '../components/CommonAuthView';
import {RootStackScreenProps} from '../navigation/AuthNavigation';
import CommonIcon from '../components/CommonIcon';
import {useTheme} from '../components/ThemeProvider';

const HomeScreen = ({navigation}: RootStackScreenProps<'HomeScreen'>) => {
  const {theme} = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.primary,
    },
    text: {
      color: 'white',
    },
    cardView: {
      width: '90%',
      maxWidth: 500,
      backgroundColor: theme.colors.white,
      marginHorizontal: 20,
      padding: 20,
      borderRadius: 22,
      alignSelf: 'center',
      alignItems: 'center',
    },
    titleText: {
      fontWeight: 'bold',
      color: theme.colors.text,
      paddingVertical: 6,
      paddingTop: 14,
      fontSize: 20,
    },
    subTitleText: {
      color: theme.colors.text,
      fontSize: 16,
    },
    buttonView: {
      paddingTop: 30,
      width: '100%',
    },
    cardIconView: {
      padding: 20,
    },
  });

  return (
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
        <View style={styles.cardIconView}>
          <CommonIcon />
        </View>
        <View style={styles.cardView}>
          <Text style={styles.titleText}>Welcome to myApp</Text>
          <Text style={styles.subTitleText}>
            Discover Amazing Thing Around You.
          </Text>
          <View style={styles.buttonView}>
            <CommonButton
              onPress={() => navigation.navigate('SignInScreen')}
              title="Sign in"
              type="filled"
            />
            <CommonButton
              onPress={() => navigation.navigate('SignUpScreen')}
              title="Sign Up"
              type="transparent"
            />
          </View>
        </View>
      </ScrollView>
    </CommonAuthView>
  );
};

export default HomeScreen;
