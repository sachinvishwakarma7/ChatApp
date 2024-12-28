import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import Toast from 'react-native-toast-message';
import {useAppDispatch, useAppSelector} from '../redux/Hooks';
import {signInStatusAction} from '../redux/slices/LoginSlice';
import {HomeTabScreenProps} from '../navigation/AuthNavigation';
import {useTheme} from '../components/ThemeProvider';
import CommonCarousel from '../components/CommonCarousel';
import CommonBackButton from '../components/CommonBackButton';
import {UserIcon} from '../assets/svg';

const HomeScreen = ({navigation}: HomeTabScreenProps) => {
  const {theme, toggleTheme} = useTheme();
  const dispatch = useAppDispatch();
  const {data, loading, isLogin, signInStatus} = useAppSelector(
    state => state.LoginReducer,
  );

  useEffect(() => {
    if (signInStatus === 'success') {
      Toast.show({
        type: 'success',
        text1: 'Signin succesfully!',
      });
    }
    dispatch(signInStatusAction('idle'));
  }, [signInStatus]);

  const postData = [
    {
      id: 1,
      userName: 'John Doe',
      date: 'Jan 12, 2024',
      description:
        'Revolutionizing industries with cutting-edge AI-driven solutions, our platform leverages advanced algorithms to optimize workflows, enhance decision-making, and drive innovation. With seamless integration capabilities, we empower businesses to achieve unparalleled efficiency and scalability. Experience the future of technology with our state-of-the-art tools designed for modern challenges. Innovation, redefined.',
      images: [
        require('../assets/images/feed1.jpg'),
        require('../assets/images/feed2.jpg'),
      ],
    },
    {
      id: 2,
      userName: 'John Doe',
      date: 'Jan 12, 2024',
      description:
        'For readability, the optimal line length for body text is 50–75 characters. Long lines of text can be intimidating and overwhelming,which can make it difficult for users to read.',
      images: [
        require('../assets/images/feed1.jpg'),
        require('../assets/images/feed2.jpg'),
      ],
    },
  ];

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.primary,
    },
    textColor: {
      color: theme.colors.text,
    },
    headerView: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      backgroundColor: theme.colors.primary,
      padding: 20,
    },
    profileImageView: {
      height: 40,
      width: 40,
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.colors.white,
      alignSelf: 'center',
      marginRight: 10,
    },
    titleText: {
      color: theme.colors.white,
      fontSize: 20,
    },
    postCardContainer: {
      backgroundColor: theme.colors.primary,
      marginVertical: 10,
      borderRadius: 10,
    },
    userDetailView: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    cardProfileUserView: {
      height: 50,
      width: 50,
      borderRadius: 25,
      backgroundColor: theme.colors.secondary,
      marginRight: 10,
      marginHorizontal: 20,
      margin: 20,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

  return (
    <View style={styles.container}>
      {/* <View style={styles.headerView}>
        <Text style={styles.titleText}>Home</Text>
        <View
          style={{
            height: 40,
            width: 40,
            borderRadius: 20,
            backgroundColor: theme.colors.secondary,
          }}></View>
      </View> */}
      <CommonBackButton
        onPress={() => navigation.canGoBack() && navigation.goBack()}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingRight: 10,
          }}>
          <Text style={styles.titleText}>{`Home`}</Text>
          <View style={styles.profileImageView}>
            <UserIcon />
          </View>
        </View>
      </CommonBackButton>
      <FlatList
        data={postData}
        contentContainerStyle={{
          paddingHorizontal: 2,
          paddingBottom: 100,
        }}
        style={{paddingHorizontal: 20}}
        renderItem={({item}) => (
          <View style={styles.postCardContainer}>
            <View style={styles.userDetailView}>
              <View style={styles.cardProfileUserView}>
                <UserIcon />
              </View>
              <View>
                <Text
                  style={[
                    styles.textColor,
                    {fontWeight: 'bold', fontSize: 16},
                  ]}>
                  {item.userName}
                </Text>
                <Text style={styles.textColor}>{item.date}</Text>
              </View>
            </View>

            <View style={{marginHorizontal: 20}}>
              <Text style={styles.textColor}>{item.description}</Text>
            </View>

            <View style={{margin: 10, alignItems: 'center'}}>
              <CommonCarousel data={item.images} />
            </View>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      {/* </View> */}
    </View>
  );
};

export default HomeScreen;
