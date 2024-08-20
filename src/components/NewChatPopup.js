import React from "react";

import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import profile1 from "../../assets/images/profile1.jpg";

const NewChatPopup = ({
  visible,
  onClose,
  friends,
  onSelectChat,
}) => {
  if (!visible) return null;
  return (
    <View style={styles.overlay}>
      <View style={styles.popup}>
        <View style={styles.header}>
          <Text style={styles.title}>בחר צ'אט חדש</Text>
          <TouchableOpacity onPress={onClose}>
            <Icon name="close" size={24} style={styles.closeIcon} />
          </TouchableOpacity>
        </View>
        <Text style={styles.sectionTitle}>חברים</Text>
        <FlatList
          data={friends}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.chatItem}
              onPress={() => {
                onSelectChat({ ...item, type: "private" });
                onClose();
              }}
            >
              <Image source={profile1} style={styles.chatAvatar} />
              <Text style={styles.chatName}>{`${item.first_name} ${item.last_name}`}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  popup: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  closeIcon: {
    color: "#000",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 10,
  },
  chatItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  chatAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  chatName: {
    fontSize: 16,
  },
});

export default NewChatPopup;
