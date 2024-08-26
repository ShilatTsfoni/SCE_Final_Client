import React, { useState } from "react";
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

  const renderNotificationItem = ({ item }) => {
    if (item.type === "message") {
      return (
        <View style={styles.notificationContainer}>
          <Text style={styles.notificationText}>
            {item.sender} שלח/ה לך הודעה חדשה.
          </Text>
          <Text style={styles.notificationTime}>{item.time}</Text>
        </View>
      );
    } else if (item.type === "friend_request") {
      return (
        <View style={styles.notificationContainer}>
          <Text style={styles.notificationText}>
            {item.sender} שלח/ה לך בקשת חברות.
          </Text>
          <Text style={styles.notificationTime}>{item.time}</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={() => handleFriendRequest("מחיקה", item.id)}
              style={styles.declineButton}
            >
              <Text style={styles.declineButtonText}>מחיקה</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleFriendRequest("אשר/י", item.id)}
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

  const handleFriendRequest = (action, id) => {
    // need to add handling of approval or rejection situations
    console.log(`${action} friend request with ID: ${id}`);
    // Remove the alert from the list after action
    setNotifications(notifications.filter((item) => item.id !== id));
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
