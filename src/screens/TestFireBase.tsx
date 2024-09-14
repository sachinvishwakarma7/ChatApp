import {
    Alert,
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
  } from 'react-native';
  import React, {useEffect, useState} from 'react';
  import {TextInput} from 'react-native-gesture-handler';
  import firestore from '@react-native-firebase/firestore';
  
  const TestFireBase = () => {
    const [userData, setUserData] = useState<{name: string; age: string}>({
      name: '',
      age: '',
    });
    const [submitedId, setSubmitedId] = useState<string>('');
    const [getUserData, setGetUserData] = useState<object[]>([]);
  
    const onAddHandler = () => {
      if (userData?.name?.length !== 0) {
        firestore()
          .collection('Users')
          .add(userData)
          .then(res => {
            setSubmitedId(res.id);
          })
          .catch(err => {
            setSubmitedId('');
          });
      } else {
        Alert.alert('plese add name', '');
      }
    };
  
    useEffect(() => {
      firestore()
        .collection('Users')
        .get()
        .then(res => {
          let data: object[] = [];
          res.forEach(res => {
            data.push(res.data());
          });
          setGetUserData(data);
        })
        .catch(err => {
          console.log('userDAta err', err);
        });
    }, [submitedId]);
  
    return (
      <View style={styles.container}>
        <View style={styles.inputWrapper}>
          <Text>Name</Text>
          <TextInput
            style={styles.input}
            value={userData.name}
            onChangeText={value => setUserData({...userData, name: value})}
          />
        </View>
        <View style={styles.inputWrapper}>
          <Text>age</Text>
          <TextInput
            style={styles.input}
            value={userData.age}
            onChangeText={value => setUserData({...userData, age: value})}
          />
        </View>
        <TouchableOpacity onPress={onAddHandler} style={styles.button}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
        <FlatList
          data={getUserData}
          renderItem={({item}) => {
            return (
              <View>
                <Text style={{color: 'red', fontSize: 20}}>{item?.name}</Text>
              </View>
            );
          }}
        />
      </View>
    );
  };
  
  export default TestFireBase;
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      padding: 10,
    },
    input: {
      borderWidth: 1,
      borderRadius: 4,
      borderColor: 'black',
      padding: 4,
    },
    button: {
      backgroundColor: 'blue',
      padding: 10,
      borderRadius: 6,
      margin: 10,
    },
    inputWrapper: {
      width: '100%',
    },
    buttonText: {
      color: 'white',
    },
  });
  