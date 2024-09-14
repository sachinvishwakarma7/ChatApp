import React, {useEffect} from 'react';
import RootNavigation from './src/navigation/RootNavigation';
import {Provider} from 'react-redux';
// import {store} from './src/redux/Store';
import Toast from 'react-native-toast-message';
import {PersistGate} from 'redux-persist/integration/react';
import {persistStore} from 'redux-persist';
import {ActivityIndicator, Alert, StyleSheet, View} from 'react-native';
import store from './src/redux/Store';
import messaging from '@react-native-firebase/messaging';
import RequestPermission from './src/assets/utils/RequestPermission';

const App = () => {
  const getFcmToken = async () => {
    const fcmToken = await messaging().getToken();
    if (fcmToken) {
      console.log('FCM Token:', fcmToken);
    } else {
      console.log('Failed to get FCM token');
    }
  };

  useEffect(() => {
    (async () => {
      let notificationPermission = await RequestPermission('notification');
      if (notificationPermission) {
        getFcmToken();
      }
    })();
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Toast.show({
        type: 'info', // 'success' | 'error' | 'info'
        text1: remoteMessage?.notification?.title,
        text2: remoteMessage?.notification?.body, // Optional message
      }
    );
      console.log('remoteMessage', remoteMessage?.notification?.title);
    });
    return unsubscribe;
  }, []);

  let persistor = persistStore(store);
  const Loading = () => {
    return (
      <View style={ styles.contaniner }>
        <ActivityIndicator
          style={styles.loadingvie}
          size={'large'}
          color={'black'}
        />
      </View>
    );
  };
  return (
    <Provider store={store}>
      <PersistGate loading={<Loading />} persistor={persistor}>
        <RootNavigation />
      </PersistGate>
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({
  contaniner: {
    position: 'absolute',
    right: 0,
    left: 0,
    top: 0,
    bottom: 0,
    backgroundColor: '#FFF',
  },
  loadingvie: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
