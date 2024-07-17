import React, { useState, useEffect } from "react";
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

const ChatWindow = ({ route, navigation }) => {
  const { chat, onSendMessage } = route.params;
  const [messages, setMessages] = useState(chat.messages);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    setMessages(chat.messages);
  }, [chat.messages]);

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;

    const message = { sender: "user", text: newMessage };

    onSendMessage(message);
    setMessages([...messages, message]);
    setNewMessage("");
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={chat.profile} style={styles.profileImage} />
        <Text style={styles.headerTitle}>{chat.name}</Text>
      </View>
      <FlatList
        data={messages}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View
            style={
              item.sender === "user" ? styles.userMessage : styles.replyMessage
            }
          >
            <Text
              style={
                item.sender === "user"
                  ? styles.userMessageText
                  : styles.replyMessageText
              }
            >
              {item.text}
            </Text>
          </View>
        )}
        contentContainerStyle={styles.messagesContainer}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={newMessage}
          onChangeText={setNewMessage}
          placeholder="הקלד הודעה"
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
