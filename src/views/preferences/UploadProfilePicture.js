import { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import CustomButton from "../../components/CustomButton";
import { useNavigation } from "@react-navigation/native";

function UploadProfilePicture({route}) {
  const navigation = useNavigation();

  const [Approval, setApproval] = useState("");
  const [isPictureUploaded, setIsPictureUploaded] = useState(false);

  const handleApprovalChange = (approval) => {
    setApproval(approval);
  };

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.heading}>נא לשפר הופעה ולהעלות תמונה!</Text>
        <Text style={styles.shareText}>
          שנוכל לראות מי המהממים והמדהימות הללו שבאים להתנדב ✨{" "}
        </Text>
      </View>
      <View style={styles.inputContainer}>
        <CustomButton
          style={styles.button}
          title="סיום הרשמה"
          onPress={() => {
            //navigation.navigate("OTP");
          }}
          buttonColor={isPictureUploaded ? "#1355CB" : "#B9B9C9"}
          textColor={isPictureUploaded ? "#FFFFFF" : "#5C5C66"}
          borderColor={isPictureUploaded ? "#1355CB" : "#B9B9C9"}
          disabled={!isPictureUploaded}
        />
        <CustomButton
          style={styles.button}
          title="לא כרגע"
          onPress={() => {
            navigation.navigate("ConfirmationScreen");
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
    alignItems: "center",
  },
  heading: {
    width: 327,
    height: 80,
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

export default UploadProfilePicture;
