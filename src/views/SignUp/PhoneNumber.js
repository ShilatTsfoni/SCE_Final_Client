import { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import CustomButton from "../../components/CustomButton";
import { useNavigation } from "@react-navigation/native";

function PhoneNumber() {
  const [PhoneNumber, setPhoneNumber] = useState("");
  const [isValidPhoneNumber, setIsValidPhoneNumber] = useState(false);
  const navigation = useNavigation();

  const handlePhoneNumberChange = (phone) => {
    setPhoneNumber(phone);
    setIsValidPhoneNumber(phone.length === 10);
  };

  const handleButtonPress = () => {
    if (isValidPhoneNumber) {
      navigation.navigate("OTP");
    }
  };

  /*const handleSubmit = () => {
    console.log("Submitted phone number: ", PhoneNumber);
  };*/

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.heading}>מספר טלפון ונתחיל</Text>
        <Text style={styles.phoneText}>מייד נשלח לטלפון שלך קוד בסמס.</Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          onChangeText={handlePhoneNumberChange}
          value={PhoneNumber}
          placeholder="מספר הטלפון שלך"
          keyboardType="phone-pad"
          maxLength={10}
        />
        <CustomButton
          style={styles.button}
          title="שלחו לי קוד"
          onPress={handleButtonPress}
          buttonColor={isValidPhoneNumber ? "#1355CB" : "#B9B9C9"}
          textColor={isValidPhoneNumber ? "#FFFFFF" : "#5C5C66"}
          borderColor={isValidPhoneNumber ? "#1355CB" : "#B9B9C9"}
          disabled={!isValidPhoneNumber}
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
  phoneText: {
    width: 327,
    height: 28,
    fontFamily: "Assistant",
    fontWeight: 400,
    fontSize: 18,
    lineHeight: 28,
    textAlign: "right",
  },
  inputContainer: {
    width: 327,
    height: 108,
    top: 304,
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

export default PhoneNumber;
