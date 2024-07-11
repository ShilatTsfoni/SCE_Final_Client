import { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import CustomButton from "../../components/CustomButton";
import { useNavigation } from "@react-navigation/native";
//import LogoutButton from "../../components/LogoutButton";
//import { handleLogout } from "../SignUp/OTP";

function NotificationsPage({ route }) {
  const navigation = useNavigation();

  const [Notifications, setNotifications] = useState("");
  const {
    first_name,
    last_name,
    email,
    gender,
    birth_day,
    city,
    volunteer_frequency,
    volunteer_categories,
    most_important,
  } = route.params;
  const handleNotificationsChange = (notifications) => {
    setNotifications(notifications);
  };

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        {/* <LogoutButton
          onPress={() => handleLogout(navigation)}
          title={"התנתק/י"}
        /> */}
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
            setNotifications(true);
            navigation.navigate("SharingContacts", {
              first_name,
              last_name,
              email,
              gender,
              birth_day,
              city,
              volunteer_frequency,
              volunteer_categories,
              most_important,
              allow_notifications: Notifications,
            });
          }}
          buttonColor={"#1355CB"}
          textColor={"#FFFFFF"}
          borderColor={"#1355CB"}
        />
        <CustomButton
          style={styles.button}
          title="לא כרגע"
          onPress={() => {
            setNotifications(false);
            navigation.navigate("SharingContacts", {
              first_name,
              last_name,
              email,
              gender,
              birth_day,
              city,
              volunteer_frequency,
              volunteer_categories,
              most_important,
              allow_notifications: Notifications,
            });
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
    alignItems: "center",
  },
  textContainer: {
    width: 327,
    height: 76,
    top: 116,
    gap: 8,
  },
  heading: {
    width: 327,
    height: 40,
    fontFamily: "Caravan",
    fontSize: 36,
    lineHeight: 40,
    textAlign: "right",
  },
  notificationText: {
    width: 327,
    height: 56,
    fontFamily: "Assistant",
    fontWeight: "400",
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
    fontWeight: "400",
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
