import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
import {
  FlatList,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useCallback, useEffect, useRef, useState} from 'react';
import {RootStackScreenProps} from '../navigation/AuthNavigation';
import {useAppSelector} from '../redux/Hooks';
import CommonInputText from '../components/CommonInputText';
import CommonButton from '../components/CommonButton';
import CommonBackButton from '../components/CommonBackButton';
import {KeyboardAvoidingView} from 'react-native';
import CommonModel from '../components/CommonModel';
import {useTheme} from '../components/ThemeProvider';
import EmojiSelector, {Categories} from 'react-native-emoji-selector';

type MessageType = {
  id: string; // Firebase document IDs are strings
  from: string; // Firebase user IDs are strings
  to: string;
  message: string;
  isRead: boolean;
  edited: boolean;
  timestamp: FirebaseFirestoreTypes.Timestamp;
  [key: string]: any; // For other dynamic fields
};

const ChatUserScreen = ({
  route,
  navigation,
}: RootStackScreenProps<'ChatUserScreen'>) => {
  const {theme} = useTheme();
  const {id, name, email} = route.params.selectedUserData; // User you're chatting with
  const {data} = useAppSelector(state => state.LoginReducer); // Current user data
  const [message, setMessage] = useState<MessageType[]>([]);
  const flatListRef = useRef<FlatList<MessageType>>(null);

  const [isRequestPending, setIsRequestPending] = useState(false);
  const [isEmojiOpen, setIsEmojiOpen] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [editMessageInput, setEditMessageInput] = useState<string>('');
  const [editMessageData, setEditMessageData] = useState<MessageType>({});

  const [typedMessage, setTypedMessage] = useState<string>('');

  const currentUserId = data?.uid; // Get current user ID from state

  const formatTimestamp = useCallback(
    (timestamp: FirebaseFirestoreTypes.Timestamp) => {
      const date = timestamp.toDate(); // Convert Firestore timestamp to JS Date
      const hours = date.getHours();
      const minutes = date.getMinutes();
      const ampm = hours >= 12 ? 'PM' : 'AM';
      const formattedHours = hours % 12 || 12; // Convert 0 hours to 12
      const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
      return `${formattedHours}:${formattedMinutes} ${ampm}`;
    },
    [message],
  );

  useEffect(() => {
    console.log('currentUserId, id', currentUserId, id);

    const messagesQuery = firestore()
      .collection('ChatMessages')
      .where('from', 'in', [currentUserId, id])
      .where('to', 'in', [currentUserId, id]);
    // .orderBy('id', 'asc'); // Order by time

    const unsubscribe = messagesQuery.onSnapshot(
      (snapshot: FirebaseFirestoreTypes.QuerySnapshot) => {
        const retrievedMessages: MessageType[] = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log('retrievedMessages', retrievedMessages);

        const filteredMessages = retrievedMessages
          .filter(
            msg =>
              msg.timestamp &&
              ((msg.from === currentUserId && msg.to === id) ||
                (msg.from === id && msg.to === currentUserId)),
          )
          .sort(
            (a, b) =>
              a.timestamp.toDate().getTime() - b.timestamp.toDate().getTime(),
          );

        setMessage(filteredMessages);

        setTimeout(() => {
          flatListRef.current?.scrollToEnd({animated: true});
        }, 100);
      },
      error => {
        console.error('Error fetching messages:', error);
      },
    );
    return () => unsubscribe();
  }, [currentUserId, id]);

  const requestChat = async () => {
    try {
      await firestore()
        .collection('ChatRequests')
        .doc(`${id}`) // Unique doc ID using both user IDs
        .set({
          from: currentUserId,
          to: id,
          status: 'pending',
          timestamp: firestore.FieldValue.serverTimestamp(),
        });
      console.log('Chat request sent!');
    } catch (error) {
      console.error('Error sending chat request:', error);
    }
  };

  const acceptChat = async () => {
    try {
      await firestore()
        .collection('ChatRequests')
        .doc(`${id}`)
        .update({status: 'accepted'});
      console.log('Chat accepted!');
      setIsRequestPending(false);
    } catch (error) {
      console.error('Error accepting chat:', error);
    }
  };

  const rejectChat = async () => {
    try {
      await firestore()
        .collection('ChatRequests')
        .doc(`${id}`)
        .update({status: 'rejected'});
      console.log('Chat rejected!');
      setIsRequestPending(false);
    } catch (error) {
      console.error('Error rejecting chat:', error);
    }
  };

  const sendMessage = async () => {
    if (typedMessage === '') {
      return;
    }
    try {
      await firestore()
        .collection('ChatMessages')
        .add({
          id: Math.floor(Math.random() * 10000000000 + 1),
          from: data?.uid,
          to: id,
          message: typedMessage,
          isRead: false,
          edited: false,
          timestamp: firestore.FieldValue.serverTimestamp(), // Firestore server timestamp
        });
      setTypedMessage('');
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({animated: true});
      }, 100);
      console.log('Chat User added!');
    } catch (error) {
      console.error('Error adding Chat User:', error);
    }
  };

  const editMessage = async (messageId: string, newMessageContent: string) => {
    try {
      const querySnapshot = await firestore()
        .collection('ChatMessages')
        .where('id', '==', messageId)
        .get();

      if (!querySnapshot.empty) {
        const docId = querySnapshot.docs[0].id;

        await firestore().collection('ChatMessages').doc(docId).update({
          message: newMessageContent,
          edited: true,
        });

        console.log('Message updated successfully!');
      } else {
        console.error('No document found with the given messageId.');
      }
    } catch (error) {
      console.error('Error updating message:', error);
    }
  };

  const deleteMessageByField = async (messageId: string) => {
    try {
      const querySnapshot = await firestore()
        .collection('ChatMessages')
        .where('id', '==', messageId)
        .get();

      if (!querySnapshot.empty) {
        const docId = querySnapshot.docs[0].id;

        await firestore().collection('ChatMessages').doc(docId).delete();

        console.log('Message deleted successfully!');
      } else {
        console.error('No document found with the given messageId.');
      }
    } catch (error) {
      console.error('Error deleting message:', error);
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.primary,
    },
    buttonWrapper: {
      justifyContent: 'flex-end',
    },
    buttonContainer: {
      flexDirection: 'row',
      paddingBottom: 20,
      paddingHorizontal: 20,
      backgroundColor: theme.colors.primary,
    },
    commonButtonStyle: {
      width: '20%',
    },
    commonInputStyle: {
      width: '70%',
    },
    emojiStyle: {
      justifyContent: 'center',
      alignItems: 'center',
      width: '10%',
    },
    emojiText: {
      fontSize: 25,
    },
    header: {
      backgroundColor: theme.colors.primary,
      padding: 20,
    },
    chatBoxContainer: {
      flex: 1,
      backgroundColor: theme.colors.primary,
      flexDirection: 'row',
      alignItems: 'flex-end',
    },
    sentMessageWrapper: {
      alignSelf: 'flex-end',
      padding: 6,
    },
    sentMessageContainer: {
      backgroundColor: theme.colors.main,
      padding: 10,
      borderTopRightRadius: 10,
      borderBottomLeftRadius: 10,
      borderTopLeftRadius: 10,
    },
    reciveMessageWrapper: {
      alignSelf: 'flex-start',
      padding: 6,
    },
    reciveMessageContainer: {
      backgroundColor: theme.colors.secondary,
      padding: 10,
      borderTopRightRadius: 10,
      borderBottomRightRadius: 10,
      borderTopLeftRadius: 10,
    },
    sentMessageText: {
      color: theme.colors.white,
      fontSize: 16,
    },
    reciveMessageText: {
      color: theme.colors.text,
      fontSize: 16,
    },
    dateTextStyle: {
      color: theme.colors.text,
      fontSize: 12,
    },
    modelView: {},
    modelButtonContainer: {
      flexDirection: 'row',
      width: '40%',
    },
  });

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}>
      <CommonBackButton onPress={() => navigation.goBack()}>
        <Text style={styles.sentMessageText}>{`${name}\n${email}`}</Text>
      </CommonBackButton>
      <View style={styles.chatBoxContainer}>
        <View style={{flex: 1}}>
          {message.length !== 0 ? (
            <FlatList
              ref={flatListRef}
              contentContainerStyle={{
                flexGrow: 1,
                justifyContent: 'flex-end',
                padding: 20,
              }}
              key={item => item.id}
              data={message}
              renderItem={({item}) => (
                <View
                  style={
                    item?.from === currentUserId
                      ? styles.sentMessageWrapper
                      : styles.reciveMessageWrapper
                  }>
                  <Pressable
                    onLongPress={
                      item?.from === currentUserId
                        ? () => {
                            setModalVisible(true);
                            setEditMessageInput(item?.message);
                            setEditMessageData(item);
                          }
                        : () => {}
                    }
                    style={
                      item?.from === currentUserId
                        ? styles.sentMessageContainer
                        : styles.reciveMessageContainer
                    }>
                    <Text
                      style={
                        item?.from === currentUserId
                          ? styles.sentMessageText
                          : styles.reciveMessageText
                      }>
                      {item.message}
                    </Text>
                  </Pressable>
                  <Text
                    style={[
                      styles.dateTextStyle,
                      {
                        textAlign:
                          item?.from === currentUserId ? 'right' : `left`,
                      },
                    ]}>
                    {item?.edited && <Text>(Edited) </Text>}
                    {formatTimestamp(item?.timestamp)}
                  </Text>
                </View>
              )}
              onContentSizeChange={() =>
                flatListRef.current?.scrollToEnd({animated: true})
              }
            />
          ) : (
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{color: theme.colors.text}}>No chats</Text>
            </View>
          )}
        </View>
      </View>
      <View style={styles.buttonWrapper}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => setIsEmojiOpen(!isEmojiOpen)}
            style={styles.emojiStyle}>
            <Text style={styles.emojiText}>😊</Text>
          </TouchableOpacity>
          <CommonInputText
            containerStyle={styles.commonInputStyle}
            value={typedMessage}
            onChangeText={value => setTypedMessage(value)}
            placeholder="Type your message"
          />
          <CommonButton
            containerStyle={styles.commonButtonStyle}
            onPress={() => sendMessage()}
            type="filled"
            title="Send"
          />
        </View>
      </View>
      <CommonModel
        modalVisible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
          setIsEdit(false);
        }}>
        <View style={styles.modelView}>
          {isEdit && (
            <CommonInputText
              value={editMessageInput}
              onChangeText={setEditMessageInput}
              placeholder="New Message"
            />
          )}

          <View style={styles.modelButtonContainer}>
            <CommonButton
              type="filled"
              title={isEdit ? 'Save' : 'Edit'}
              onPress={
                isEdit
                  ? () => {
                      editMessage(editMessageData?.id, editMessageInput);
                      setModalVisible(false);
                      setIsEdit(false);
                    }
                  : () => {
                      setIsEdit(true);
                    }
              }
            />
            <CommonButton
              type="transparent"
              title={isEdit ? 'Cancel' : 'Delete'}
              onPress={
                isEdit
                  ? () => {
                      setIsEdit(false);
                      setEditMessageInput(editMessageData?.message);
                    }
                  : () => {
                      deleteMessageByField(editMessageData?.id);
                      setModalVisible(false);
                    }
              }
            />
          </View>
        </View>
      </CommonModel>
      {isEmojiOpen && (
        <EmojiSelector
          onEmojiSelected={emoji => {
            setTypedMessage(prevMessage => prevMessage + emoji);
          }}
        />
      )}
    </KeyboardAvoidingView>
  );
};

export default ChatUserScreen;
