import { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import CustomButton from "../../components/CustomButton";
import { useNavigation } from "@react-navigation/native";
//import LogoutButton from "../../components/LogoutButton";
//import { handleLogout } from "../SignUp/OTP";

function SharingContacts({ route }) {
  const navigation = useNavigation();

  const [Approval, setApproval] = useState("");
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
    allow_notifications,
  } = route.params;
  const handleApprovalChange = (approval) => {
    setApproval(approval);
  };

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        {/* <LogoutButton
          onPress={() => handleLogout(navigation)}
          title={"התנתק/י"}
        /> */}
        <Text style={styles.heading}>שיתוף אנשי קשר</Text>
        <Text style={styles.shareText}>
          נראה לך פעילויות התנדבותיות שחברים וחברות שלך גם הולכים אליהן, שיהיה
          כיף ביחד. 
        </Text>
      </View>
      <View style={styles.inputContainer}>
        <CustomButton
          style={styles.button}
          title="שיתוף אנשי קשר"
          onPress={() => {
            setApproval(true);
            navigation.navigate("UploadProfilePicture", {
              first_name,
              last_name,
              email,
              gender,
              birth_day,
              city,
              volunteer_frequency,
              volunteer_categories,
              most_important,
              allow_notifications,
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
            navigation.navigate("UploadProfilePicture", {
              first_name,
              last_name,
              email,
              gender,
              birth_day,
              city,
              volunteer_frequency,
              volunteer_categories,
              most_important,
              allow_notifications,
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
    flex: 1,
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
  shareText: {
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

export default SharingContacts;
