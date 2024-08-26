import React, { useState,useCallback,useContext } from "react";
import { useFocusEffect } from '@react-navigation/native';
import { UserContext } from "../../contexts/userContext"; // Corrected import
import TokenContext from "../../contexts/TokenContext";
import { NotificationContext } from '../../contexts/NotificationContext';

import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Modal,
  Button,
  StyleSheet,
} from "react-native";

const NotificationsScreen = () => {
  const {userid,first_name,last_name} = useContext(UserContext);
  const {token} = useContext(TokenContext);
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const { setHasNewFR } = useContext(NotificationContext);
  const [notifications, setNotifications] = useState([
    {
      id: "1",
      type: "message",
      sender: "יוסי כהן",
      content: "היי, מה נשמע?",
      time: "לפני 5 דקות",
    },
    {
      id: "2",
      type: "friend_request",
      sender: "רוני לוי",
      fullName: "רוני לוי",
      time: "לפני 10 דקות",
    },
    {
      id: "3",
      type: "friend_accepted",
      sender: "דני כהן",
      fullName: "דני כהן",
      time: "לפני 15 דקות",
    },
  ]);
  useFocusEffect(
    useCallback(() => {
      fetch_friend_requests()
      setHasNewFR(false)
    }, [setNotifications])
  );
    // Function to trigger the popup
  const triggerPopup = () => {
      console.log("popup");
      setPopupVisible(true);
      setTimeout(() => {
        setPopupVisible(false);
      }, 3000); // Disappear after 3 seconds
    };
  const fetch_friend_requests = useCallback(async () => {//
    try {
      if (!userid) {
        console.log("No id found");//
        return;
      }
      try {
        const response = await fetch("http://10.0.2.2:8000/api/account/friendrequests/",{headers:{"Authorization":`Bearer ${token}`}});//
        if (response.ok) {
          const data = await response.json();//
          console.log(data);
          setNotifications(data);
        }
      } catch (error) {
        console.error("error retrieving friendrequests data from server:", error);
      }
    } catch (error) {//
      console.error("error retrieving friendrequests data from server:", error);
    }
  });
  const handleFriendRequest = async (action, id) => {
    try {
      const response = await fetch(`http://10.0.2.2:8000/api/account/friendrequests/${id}/${action}/`,{method: 'POST',headers:{"Authorization":`Bearer ${token}`}});//
      if (response.ok) {
        const data = await response.json();//
        setPopupMessage(data.message);
        triggerPopup();
        setNotifications(notifications.filter((item) => item.id !== id));
      }
    } catch (error) {
      console.error("error retrieving friendrequests data from server:", error);
    }
  };
  
  const renderNotificationItem = ({ item }) => {
    if (item.type === "message") {
      return (
        <View style={styles.notificationContainer}>
          <Text style={styles.notificationText}>
            {item.sender.first_name +" "+ item.sender.last_name} שלח/ה לך הודעה חדשה.
          </Text>
          <Text style={styles.notificationTime}>{item.time}</Text>
        </View>
      );
    } else if (true) {
      return (
        <View style={styles.notificationContainer}>
          <Text style={styles.notificationText}>
            {item.sender.first_name +" "+ item.sender.last_name} שלח/ה לך בקשת חברות.
          </Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={() => handleFriendRequest("reject", item.id)}
              style={styles.declineButton}
            >
              <Text style={styles.declineButtonText}>מחיקה</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleFriendRequest("accept", item.id)}
              style={styles.acceptButton}
            >
              <Text style={styles.acceptButtonText}>אשר/י</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    } else if (item.type === "friend_accepted") {
      return (
        <View style={styles.notificationContainer}>
          <Text style={styles.notificationText}>
            {item.fullName} הסכים/ה לבקשת החברות שלך.
          </Text>
          <Text style={styles.notificationTime}>{item.time}</Text>
        </View>
      );
    }
  };



  return (
    <View style={styles.container}>
      <Text style={styles.header}>התראות</Text>
      <FlatList
        data={notifications}
        renderItem={renderNotificationItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    marginTop: 40,
  },
  listContent: {
    paddingBottom: 20,
  },
  notificationContainer: {
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  notificationText: {
    fontSize: 16,
    marginBottom: 5,
  },
  notificationTime: {
    fontSize: 12,
    color: "#888",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  acceptButton: {
    backgroundColor: "#1355CB",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    flex: 1,
    marginLeft: 10,
  },
  acceptButtonText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },
  declineButton: {
    backgroundColor: "#ececec",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    flex: 1,
    marginRight: 10,
  },
  declineButtonText: {
    color: "black",
    fontSize: 16,
    textAlign: "center",
  },
});

export default NotificationsScreen;
