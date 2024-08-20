import React, { useContext, useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  StyleSheet,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { UserContext } from "../../contexts/userContext";
import profile1 from "../../../assets/images/profile1.jpg";
import TokenContext from "../../contexts/TokenContext";
//---------------------------------------------------------------------------

const ChatWindow = ({ route, navigation }) => {
  const { chat } = route.params;
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const { userid, first_name, last_name } = useContext(UserContext);
  const ws = useRef(null);
  const {token} = useContext(TokenContext);
//---------------------------------------------------------------------------

  useEffect(() => {
    console.log('==============END=============')
    console.log(chat);
    ws.current = new WebSocket(`ws://10.0.2.2:8000/ws/chat/chat_${chat.related_chat.id}/?token=${token}`);
//---------------------------------------------------------------------------

    ws.current.onmessage = (e) => {
      const data = JSON.parse(e.data);
      console.log(data);
      if (data.history) {
        setMessages(data.history);
      } else if (data.message) {
        setMessages((prevMessages) => [...prevMessages, data.message]);
      }    
    };
//---------------------------------------------------------------------------

    ws.current.onerror = (e) => {
      console.error(e.message);
    };
//---------------------------------------------------------------------------

    ws.current.onclose = (e) => {
      console.log("WebSocket connection closed");
    };
//---------------------------------------------------------------------------

    // Clean up WebSocket connection when component unmounts
    return () => {
      ws.current.close();
    };
  }, [chat]);
//---------------------------------------------------------------------------

  const handleSendMessage = async () => {
    if (newMessage.trim() == "") return;
    console.log(chat.related_chat.id)
    const message = {
      sender: {id:userid},
      related_chat:chat.related_chat.id,
      content: newMessage,
    };

    // Send message via WebSocket
    ws.current.send(JSON.stringify({ message }));
    // Add the message to the local state
    //setMessages((prevMessages) => [...prevMessages, message]);
    setNewMessage("");
  };
//---------------------------------------------------------------------------

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={profile1} style={styles.profileImage} />
        <Text style={styles.headerTitle}>
          {userid != chat.sender.id ? chat.sender.name : userid == chat.related_chat.member_1.id ? chat.related_chat.member_2.name : chat.related_chat.member_1.name}
        </Text>
      </View>
      <FlatList
        data={messages}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => {
          const isUserMessage = item.sender.id == userid ? true:false; // Ensure this comparison is correct
          return (
            <View
              style={isUserMessage ? styles.userMessage : styles.replyMessage}
            >
              <Text
                style={isUserMessage ? styles.userMessageText : styles.replyMessageText}
              >
                {item.content}
              </Text>
            </View>
          );
        }}
        contentContainerStyle={styles.messagesContainer}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={newMessage}
          onChangeText={setNewMessage}
          placeholder="Type a message"
        />
        <TouchableOpacity onPress={handleSendMessage} style={styles.sendButton}>
          <Icon name="send" size={20} color="#000" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f7fc",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginTop: 50,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  messagesContainer: {
    padding: 20,
  },
  userMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#007bff",
    borderRadius: 20,
    padding: 10,
    marginBottom: 10,
    maxWidth: "80%",
  },
  replyMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#e6e6e6",
    borderRadius: 20,
    padding: 10,
    marginBottom: 10,
    maxWidth: "80%",
  },
  userMessageText: {
    color: "white",
  },
  replyMessageText: {
    color: "black",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "white",
    borderTopWidth: 1,
    borderTopColor: "#ccc",
  },
  input: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
    marginRight: 10,
  },
  sendButton: {
    padding: 10,
  },
});

export default ChatWindow;
