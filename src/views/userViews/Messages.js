import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
  StyleSheet,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import NewChatPopup from "../../components/NewChatPopup";
import profile1 from "../../../assets/images/profile1.jpg";
import profile2 from "../../../assets/images/profile2.jpg";
import profile4 from "../../../assets/images/org1.png";

const Messages = () => {
  const navigation = useNavigation();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentCategory, setCurrentCategory] = useState("private");
  const [chats, setChats] = useState([
    {
      id: 1,
      type: "private",
      name: "יעל כהן",
      lastMessage: "שלום",
      profile: profile1,
      time: "1 שעה",
      status: "נקראה",
      messages: [
        { sender: "user", text: "שלום" },
        { sender: "reply", text: "שלום, מה שלומך?" },
      ],
    },
    {
      id: 2,
      type: "private",
      name: "דני כהן",
      lastMessage: "מה שלומך?",
      profile: profile2,
      time: "3 שעות",
      status: "נשלחה",
      messages: [
        { sender: "user", text: "מה שלומך?" },
        { sender: "reply", text: "אני בסדר, תודה" },
      ],
    },
    {
      id: 3,
      type: "group",
      name: "משמרת דוכן בוקר",
      lastMessage: "ברוך הבא!",
      profile: profile4,
      time: "5 דקות",
      status: "נקראה",
      messages: [
        { sender: "user", text: "ברוך הבא!" },
        { sender: "reply", text: "תודה רבה:)" },
      ],
    },
  ]);

  const [volunteers, setVolunteers] = useState([
    { id: 4, name: "רוני לוי", profile: profile1 },
    { id: 5, name: "מיכל כהן", profile: profile2 },
  ]);

  const [groups, setGroups] = useState([
    { id: 6, name: "קבוצת ניהול", profile: profile4 },
    { id: 7, name: "קבוצת מתנדבים", profile: profile4 },
  ]);

  const [popupVisible, setPopupVisible] = useState(false);

  const filteredChats = chats.filter((chat) =>
    chat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectChat = (selectedChat) => {
    const newChat = {
      id: chats.length + 1,
      type: selectedChat.type || "private",
      name: selectedChat.name,
      lastMessage: "",
      profile: selectedChat.profile,
      time: "",
      status: "",
      messages: [],
    };

    setChats([...chats, newChat]);
    setPopupVisible(false);
    navigation.navigate("ChatWindow", {
      chat: newChat,
      onSendMessage: (message) => handleSendMessage(newChat.id, message),
    });
  };

  const handleSendMessage = (chatId, message) => {
    setChats((prevChats) =>
      prevChats.map((chat) =>
        chat.id === chatId
          ? {
              ...chat,
              messages: [...chat.messages, message],
              lastMessage: message.text,
              time: "עכשיו",
              status: "נשלחה",
            }
          : chat
      )
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setPopupVisible(true)}>
          <Icon name="plus" size={24} style={styles.newChatIcon} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>הודעות</Text>
      </View>
      <View style={styles.searchBar}>
        <TextInput
          style={styles.searchInput}
          placeholder="חיפוש הודעות"
          value={searchTerm}
          onChangeText={setSearchTerm}
        />
        <Icon name="search" size={20} style={styles.searchIcon} />
      </View>
      <View style={styles.chatCategories}>
        <TouchableOpacity
          style={[
            styles.categoryButton,
            currentCategory === "private" && styles.activeCategoryButton,
          ]}
          onPress={() => setCurrentCategory("private")}
        >
          <Text
            style={[
              styles.categoryButtonText,
              currentCategory === "private" && styles.activeCategoryButtonText,
            ]}
          >
            פרטי
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.categoryButton,
            currentCategory === "group" && styles.activeCategoryButton,
          ]}
          onPress={() => setCurrentCategory("group")}
        >
          <Text
            style={[
              styles.categoryButtonText,
              currentCategory === "group" && styles.activeCategoryButtonText,
            ]}
          >
            קבוצתי
          </Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={filteredChats.filter((chat) => chat.type === currentCategory)}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.chatItem}
            onPress={() =>
              navigation.navigate("ChatWindow", {
                chat: item,
                onSendMessage: (message) => handleSendMessage(item.id, message),
              })
            }
          >
            <View style={styles.chatDetails}>
              <Text style={styles.chatName}>{item.name}</Text>
              <View style={styles.chatMessagePreview}>
                <Text style={styles.chatLastMessage}>{item.lastMessage}</Text>
                <View style={styles.chatMeta}>
                  <Text style={styles.chatTime}>{item.time}</Text>
                  <Text style={styles.chatStatus}>{item.status}</Text>
                </View>
              </View>
            </View>
            <Image source={item.profile} style={styles.chatAvatar} />
          </TouchableOpacity>
        )}
      />
      <NewChatPopup
        visible={popupVisible}
        onClose={() => setPopupVisible(false)}
        volunteers={volunteers}
        groups={groups}
        onSelectChat={handleSelectChat}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    marginTop: 30,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  newChatIcon: {
    color: "#000",
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  searchInput: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
    marginRight: 10,
  },
  searchIcon: {
    color: "#000",
  },
  chatCategories: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 10,
  },
  categoryButton: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 10,
  },
  categoryButtonText: {
    fontSize: 16,
  },
  activeCategoryButton: {
    backgroundColor: "#e6f4ff",
    borderRadius: 20,
  },
  activeCategoryButtonText: {
    color: "#007bff",
  },
  chatItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  chatAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  chatDetails: {
    flex: 1,
    alignItems: "flex-end",
    marginRight: 10,
  },
  chatName: {
    marginTop: 10,
    fontWeight: "bold",
    marginBottom: 5,
  },
  chatMessagePreview: {
    alignItems: "flex-end",
  },
  chatLastMessage: {
    color: "#999",
  },
  chatMeta: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  chatTime: {
    marginRight: 10,
    color: "#999",
  },
  chatStatus: {
    marginRight: 200,
    color: "#999",
  },
});

export default Messages;
