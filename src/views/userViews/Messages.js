import React, { useCallback,useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
import { UserContext } from "../../contexts/userContext"; // Corrected import
import TokenContext from "../../contexts/TokenContext";
import { useFocusEffect } from '@react-navigation/native';
//---------------------------------------------------------------------------

const Messages = () => {
  const navigation = useNavigation();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentCategory, setCurrentCategory] = useState("private");
  const [chats, setChats] = useState([]);
  const {userid,first_name,last_name} = useContext(UserContext);
  const {token} = useContext(TokenContext);
//---------------------------------------------------------------------------

  const [friend_list, setFriend_list] = useState([]);
//---------------------------------------------------------------------------

//---------------------------------------------------------------------------

  const [popupVisible, setPopupVisible] = useState(false);
  useFocusEffect(
    useCallback(() => {
      fetch_inbox();
    }, [fetch_inbox])
  );
//---------------------------------------------------------------------------

  const fetch_inbox = useCallback(async () => {//
    try {
      const user_id = await AsyncStorage.getItem("user_id");
      if (!user_id) {
        console.log("No id found");//
        return;
      }
      try {
        const response = await fetch("http://10.0.2.2:8000/api/messages/inbox/",{headers:{"Authorization":`Bearer ${token}`}});//
        if (response.ok) {
          const data = await response.json();//
          console.log(token);
          console.log(data[0])
          setChats(data);
        }
      } catch (error) {
        console.error("error retrieving next events data from server:", error);
      }
    } catch (error) {//
      console.error("error retrieving next events data from server:", error);
    }
  });
//---------------------------------------------------------------------------

  const handleSelectChat =  useCallback(async (selectedChat) => {
    var newChat = null;
    var sender_obj = {id:userid};
    var recipient_obj = {id:selectedChat.id};
    const post_body = { member_1 : {id:sender_obj.id},
                  member_2 : {id:recipient_obj.id}}
    const response = await fetch(
      "http://10.0.2.2:8000/api/chats/",
      {
        body: JSON.stringify(post_body),
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization":`Bearer ${token}`
        },
      }
    );
    if (response.ok) {
      const data = await response.json();//
      console.log(data);
      const dat = {related_chat:data,sender:{id:data.member_1.id}}
      console.log(dat)
      setChats([...chats, dat]);
      setPopupVisible(false);
      navigation.navigate("ChatWindow", {
        chat: dat,
      });
    }

  });

//---------------------------------------------------------------------------

  const get_chat_name = (item) =>{
    if (item.recipient){
      if (userid == item.recipient.id){
        console.log(item.sender);
        return item.sender.first_name + " " + item.sender.last_name;
      }else{
        return item.recipient.first_name + " " + item.recipient.last_name;//
      }
    }else{
      return item.first_name + " " + item.last_name;
    }
  }
//---------------------------------------------------------------------------

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };
//
const get_friends_info = async () =>{
  const response = await fetch("http://10.0.2.2:8000/api/account/users/friends/",{headers:{"Authorization":`Bearer ${token}`}});//
  if (response.ok) {
    const data = await response.json();//
    setFriend_list(data);
    console.log(data);
    }
  setPopupVisible(true)
}
//---------------------------------------------------------------------------
 
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => get_friends_info()}>
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
        data={chats}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.chatItem}
            onPress={() =>
              navigation.navigate("ChatWindow", {
                chat: item,
              })
            }
          >
            <View style={styles.chatDetails}>
              <Text style={styles.chatName}>{userid == item.related_chat.member_1.id ? item.related_chat.member_2.name : item.related_chat.member_1.name}</Text>
              <View style={styles.chatMessagePreview}>
                <Text style={styles.chatLastMessage}>{item.content ? item.content:""}</Text>
                <View style={styles.chatMeta}>
                  <Text style={styles.chatTime}>{item.timestamp ? formatDate(item.timestamp) : ""}</Text>
                  <Text style={styles.chatStatus}>{item.read ? item.read : ""}</Text>
                </View>
              </View>
            </View>
            <Image source={profile1} style={styles.chatAvatar} />
          </TouchableOpacity>
        )}
      />
      <NewChatPopup
        visible={popupVisible}
        onClose={() => setPopupVisible(false)}
        friends={friend_list}
        onSelectChat={handleSelectChat}
      />
    </View>
  );
};
//---------------------------------------------------------------------------

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
    marginRight: -10,
    color: "#999",
  },
  chatStatus: {
    marginRight: 200,
    color: "#999",
  },
});

export default Messages;
