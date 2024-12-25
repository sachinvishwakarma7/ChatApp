import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Button,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {NativeStackScreenProps} from 'react-native-screens/lib/typescript/native-stack/types';
import {
  ChatsTabScreenProps,
  RootStackParamList,
} from '../navigation/AuthNavigation'; // Ensure this file exports RootStackParamList
import {
  collection,
  getDocs,
  getFirestore,
} from '@react-native-firebase/firestore';
import {useAppSelector} from '../redux/Hooks';
import CommonInputText from '../components/CommonInputText';
import {useTheme} from '../components/ThemeProvider';
import inAppMessaging from '@react-native-firebase/in-app-messaging';
import CommonBackButton from '../components/CommonBackButton';

type ChatUser = {
  id: string;
  name: string;
  [key: string]: any;
};

const ChatScreen = ({navigation}: ChatsTabScreenProps) => {
  const {theme} = useTheme();
  const {data} = useAppSelector(state => state.LoginReducer);

  const [originalUsers, setOriginalUsers] = useState<ChatUser[]>([]);
  const [users, setUsers] = useState<ChatUser[]>([]);
  const [searchInput, setSearchInput] = useState<string>('');
  const db = getFirestore();

  const searchInputHandler = (value: string) => {
    setSearchInput(value);
    if (value.trim() === '') {
      setUsers(originalUsers);
    } else {
      const filteredUsers = originalUsers.filter(
        user =>
          user.name.toLowerCase().includes(value.toLowerCase()) ||
          user.email?.toLowerCase().includes(value.toLowerCase()),
      );
      setUsers(filteredUsers);
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'ChatUsers'));
        const fetchedUsers: ChatUser[] = querySnapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            name: data.name || 'Unknown',
            ...data,
          };
        });
        setUsers(fetchedUsers);
        setOriginalUsers(fetchedUsers);
      } catch (error) {
        console.log('error--->', error);
      }
    };
    fetchUsers();
  }, []);

  const triggerTestMessage = () => {
    inAppMessaging()
      .triggerEvent('custom_event')
      .then(() => console.log('Custom event triggered for In-App Messaging'))
      .catch(error => console.log('error', error));
  };
  // useEffect(() => {
  //   triggerTestMessage();
  // }, []);

  const UserListItem: React.FC<{user: ChatUser}> = ({user}) => {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('ChatUserScreen', {selectedUserData: user})
        }
        style={styles.userContainer}>
        <View
          style={{
            height: 40,
            width: 40,
            borderRadius: 20,
            backgroundColor: theme.colors.secondary,
            alignSelf: 'center',
            marginRight: 10,
          }}></View>
        <View>
          <Text
            style={[styles.userNameText, {fontWeight: 'bold', fontSize: 16}]}>
            {user.name}
          </Text>
          <Text style={styles.userNameText}>{user.email}</Text>
        </View>
      </TouchableOpacity>
    );
  };
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.primary,
      // padding: 20,
    },
    searchContainer: {
      margin: 20,
    },
    headerView: {
      backgroundColor: theme.colors.primary,
      padding: 20,
    },
    titleText: {
      color: theme.colors.white,
      fontSize: 20,
    },
    userContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.colors.primary,
      // paddingVertical: 20,
      margin: 20,
    },
    userNameText: {
      color: theme.colors.text,
    },
  });
  return (
    <View style={styles.container}>
      {/* <View style={styles.headerView}>
        <Text style={styles.titleText}>Messages</Text>
      </View> */}
      <CommonBackButton
        onPress={() => navigation.canGoBack() && navigation.goBack()}>
        <Text style={styles.titleText}>{`Messages`}</Text>
      </CommonBackButton>
      <View style={styles.searchContainer}>
        <CommonInputText
          value={searchInput}
          onChangeText={value => searchInputHandler(value)}
          placeholder="Search by name or email"
        />
      </View>
      {/* <Button title="Trigger Event" onPress={triggerTestMessage} /> */}
      <FlatList
        data={users}
        renderItem={({item}) => <UserListItem user={item} />}
        keyExtractor={item => item.id}
        ListEmptyComponent={() => <ActivityIndicator size={'large'} />}
      />
    </View>
  );
};

export default ChatScreen;
