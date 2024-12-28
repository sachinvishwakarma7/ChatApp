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
import React, {useCallback, useEffect, useRef, useState} from 'react';
import EmojiSelector from 'react-native-emoji-selector';
import {RootStackScreenProps} from '../navigation/AuthNavigation';
import {useAppSelector} from '../redux/Hooks';
import CommonInputText from '../components/CommonInputText';
import CommonButton from '../components/CommonButton';
import CommonBackButton from '../components/CommonBackButton';
import {KeyboardAvoidingView} from 'react-native';
import CommonModel from '../components/CommonModel';
import {useTheme} from '../components/ThemeProvider';
import {ChatIcon, SearchIcon, UserIcon} from '../assets/svg';

type MessageType = {
  id: string;
  from: string;
  to: string;
  message: string;
  isRead: boolean;
  edited: boolean;
  timestamp: FirebaseFirestoreTypes.Timestamp;
  [key: string]: any;
};

const ChatUserScreen = ({
  route,
  navigation,
}: RootStackScreenProps<'ChatUserScreen'>) => {
  const {theme} = useTheme();
  const {id, name, email} = route.params.selectedUserData;
  const {data} = useAppSelector(state => state.LoginReducer);
  const [message, setMessage] = useState<Record<string, MessageType[]>>({});
  const flatListRef = useRef<FlatList<any>>(null);

  const [isRequestPending, setIsRequestPending] = useState(false);
  const [isEmojiOpen, setIsEmojiOpen] = useState<boolean>(false);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [editMessageInput, setEditMessageInput] = useState<string>('');
  const [editMessageData, setEditMessageData] = useState<MessageType>({});

  const [typedMessage, setTypedMessage] = useState<string>('');

  const currentUserId = data?.uid;

  const formatTimestamp = useCallback(
    (timestamp: FirebaseFirestoreTypes.Timestamp) => {
      const date = timestamp.toDate();
      const hours = date.getHours();
      const minutes = date.getMinutes();
      const ampm = hours >= 12 ? 'PM' : 'AM';
      const formattedHours = hours % 12 || 12;
      const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
      return `${formattedHours}:${formattedMinutes} ${ampm}`;
    },
    [message],
  );

  const formatDateGroup = useCallback(
    (timestamp: FirebaseFirestoreTypes.Timestamp) => {
      const date = timestamp.toDate();
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const yesterday = new Date(today);
      yesterday.setDate(today.getDate() - 1);
      if (date >= today) {
        return 'Today';
      } else if (date >= yesterday) {
        return 'Yesterday';
      } else {
        return date.toLocaleDateString('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric',
        });
      }
    },
    [message],
  );

  useEffect(() => {
    const messagesQuery = firestore()
      .collection('ChatMessages')
      .where('from', 'in', [currentUserId, id])
      .where('to', 'in', [currentUserId, id]);

    const unsubscribe = messagesQuery.onSnapshot(
      (snapshot: FirebaseFirestoreTypes.QuerySnapshot) => {
        const retrievedMessages: MessageType[] = snapshot.docs.map(doc => {
          return {
            id: doc.id,
            // from: doc.data().from ?? '',
            // to: doc.data().to ?? '',
            // message: doc.data().message ?? '',
            // isRead: doc.data().isRead ?? false,
            // timestamp: doc.data().timestamp ?? new Date(),
            // edited: doc.data().edited ?? false,
            ...doc.data(),
          };
        });

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

        // Group messages by date
        const groupedMessages: Record<string, MessageType[]> = {};
        filteredMessages.forEach(msg => {
          const dateGroup = formatDateGroup(msg.timestamp);
          if (!groupedMessages[dateGroup]) {
            groupedMessages[dateGroup] = [];
          }
          groupedMessages[dateGroup].push(msg);
        });

        setMessage(groupedMessages);

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
    contentContainerStyle: {
      flexGrow: 1,
      justifyContent: 'flex-end',
      padding: 20,
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
    dateLable: {
      alignSelf: 'center',
      backgroundColor: theme.colors.secondary,
      padding: 6,
      paddingHorizontal: 10,
      borderRadius: 12,
      opacity: 0.5,
    },
    headerView: {
      flexDirection: 'row',
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
        <View style={styles.headerView}>
          <View style={styles.profileImageView}>
            <UserIcon />
          </View>
          <Text style={styles.sentMessageText}>{`${name}\n${email}`}</Text>
        </View>
      </CommonBackButton>
      <View style={styles.chatBoxContainer}>
        <View style={{flex: 1}}>
          {Object.keys(message).length !== 0 ? (
            <FlatList
              ref={flatListRef}
              contentContainerStyle={styles.contentContainerStyle}
              data={Object.entries(message)}
              keyExtractor={(item, index) => `${index}`}
              renderItem={({item: [date, msgs]}) => (
                <>
                  <Text style={[styles.dateTextStyle, styles.dateLable]}>
                    {date}
                  </Text>
                  {msgs.map((msg: MessageType) => (
                    <View
                      key={msg.id}
                      style={
                        msg.from === currentUserId
                          ? styles.sentMessageWrapper
                          : styles.reciveMessageWrapper
                      }>
                      <Pressable
                        onLongPress={
                          msg.from === currentUserId
                            ? () => {
                                setModalVisible(true);
                                setEditMessageInput(msg.message);
                                setEditMessageData(msg);
                              }
                            : () => {}
                        }
                        style={
                          msg.from === currentUserId
                            ? styles.sentMessageContainer
                            : styles.reciveMessageContainer
                        }>
                        <Text
                          style={
                            msg.from === currentUserId
                              ? styles.sentMessageText
                              : styles.reciveMessageText
                          }>
                          {msg.message}
                        </Text>
                      </Pressable>
                      <Text
                        style={[
                          styles.dateTextStyle,
                          {
                            textAlign:
                              msg.from === currentUserId ? 'right' : 'left',
                          },
                        ]}>
                        {msg.edited && <Text>(Edited) </Text>}
                        {formatTimestamp(msg.timestamp)}
                      </Text>
                    </View>
                  ))}
                </>
              )}
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
            placeholder="Type your message..."
            isIcon={true}
            Icon={<ChatIcon />}
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
