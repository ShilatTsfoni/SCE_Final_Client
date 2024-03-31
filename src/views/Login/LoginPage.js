import { View, Text, TextInput, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import CustomButton from "../../components/CustomButton";
import { useState } from "react";

function LoginPage() {
  const [PhoneNumber, setPhoneNumber] = useState("");
  const [isValidPhoneNumber, setIsValidPhoneNumber] = useState(false);
  const navigation = useNavigation();

  const validatePhoneNumber = (phone) => {
    const regex = /^05\d([-]{0,1})\d{7}$/;
    return regex.test(phone);
  };

  const handlePhoneNumberChange = (phone) => {
    setPhoneNumber(phone);
    setIsValidPhoneNumber(validatePhoneNumber(phone));
  };

  const handleButtonPress = () => {
    if (isValidPhoneNumber) {
      // Define the URL of your Django REST API
      const url = "http://10.0.2.2:8000/api/account/register/"; // Adjust the IP and path as needed

      // Prepare the data you want to send in the POST request
      const data = {
        phone: PhoneNumber, // Make sure the key matches your Django serializer field
      };
      console.log(data);
      // Send the POST request
      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data);
          navigation.navigate("OTP", { phone: PhoneNumber });
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

  /*const handleSubmit = () => {
    console.log("Submitted phone number: ", PhoneNumber);
  };*/

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.heading}>הכנס מספר טלפון</Text>
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
    fontSize: 36,
    lineHeight: 40,
    textAlign: "right",
  },
  phoneText: {
    width: 327,
    height: 28,
    fontFamily: "Assistant",
    fontWeight: "400",
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

export default LoginPage;
