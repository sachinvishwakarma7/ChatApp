import {getFirestore} from '@react-native-firebase/firestore';
import {collection, getDocs} from 'firebase/firestore';
import {useEffect, useState} from 'react';
import {FlatList, Text, Button, View} from 'react-native';

const UserListScreen = () => {
  const [users, setUsers] = useState([]);
  const db = getFirestore();

  useEffect(() => {
    const fetchUsers = async () => {
      const querySnapshot = await getDocs(collection(db, 'users'));
      setUsers(querySnapshot.docs.map(doc => ({id: doc.id, ...doc.data()})));
    };
    fetchUsers();
  }, []);

  const UserListItem = ({user}) => {
    console.log('userData->', user);

    return (
      <View>
        <Text></Text>
      </View>
    );
  };

  return (
    <FlatList
      data={users}
      renderItem={({item}) => <UserListItem user={item} />}
      keyExtractor={item => item.id}
    />
  );
};
