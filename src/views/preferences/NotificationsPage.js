import { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import CustomButton from "../../components/CustomButton";
import { useNavigation } from "@react-navigation/native";

function NotificationsPage() {
  const navigation = useNavigation();

  const [Notifications, setNotifications] = useState("");

  const handleNotificationsChange = (notifications) => {
    setNotifications(notifications);
  };

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.heading}>אישור התראות</Text>
        <Text style={styles.notificationText}>
          ככה נוכל להתריע לך לפני התנדבויות ושאר עדכונים חשובים (בלי לחפור,
          מבטיחים).
        </Text>
      </View>
      <View style={styles.inputContainer}>
        <CustomButton
          style={styles.button}
          title="אישור התראות"
          onPress={() => {
            //navigation.navigate("OTP");
          }}
          buttonColor={"#1355CB"}
          textColor={"#FFFFFF"}
          borderColor={"#1355CB"}
        />
        <CustomButton
          style={styles.button}
          title="לא כרגע"
          onPress={() => {
            navigation.navigate("SharingContacts");
          }}
          buttonColor={"#FFFFFF"}
          textColor={"#5C5C66"}
          borderColor={"#FFFFFF"}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: 50,
  },
  textContainer: {
    width: 327,
    height: 76,
    top: 116,
    gap: 8,
    alignItems: "center",
  },
  heading: {
    width: 327,
    height: 40,
    fontFamily: "Caravan",
    fontWeight: 900,
    fontSize: 36,
    lineHeight: 40,
    textAlign: "right",
  },
  notificationText: {
    width: 327,
    height: 56,
    fontFamily: "Assistant",
    fontWeight: 400,
    fontSize: 18,
    lineHeight: 28,
    textAlign: "right",
  },
  inputContainer: {
    width: 327,
    height: 128,
    top: 600,
    gap: 12,
    alignContent: "center",
  },
  input: {
    height: 48,
    width: 327,
    fontFamily: "Assistant",
    fontWeight: 400,
    fontSize: 16,
    lineHeight: 24,
    borderColor: "#DCDCE5",
    color: "#73738A",
    borderRadius: 4,
    borderWidth: 1,
    padding: 12,
    gap: 8,
    textAlign: "center",
  },
  button: {
    width: 327,
    height: 48,
    borderRadius: 4,
    padding: 12,
  },
});

export default NotificationsPage;
