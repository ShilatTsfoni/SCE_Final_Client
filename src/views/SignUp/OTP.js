import { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import CustomButton from "../../components/CustomButton";
import CustomMessage from "../../components/CustomMessage";
import Processing from "./Processing";
import { useNavigation } from "@react-navigation/native";
import BackButton from "../../components/BackButton";
import AsyncStorage from '@react-native-async-storage/async-storage';
function OTP({route}) {
  const [OtpNum, setOtp] = useState("");
  const [isValidOtp, setIsValidOtp] = useState(false);
  const [showError, setShowError] = useState(false);
  const [busy, setBusy] = useState(false);
  const { phone } = route.params;
  const navigation = useNavigation();

  const handleOtpChange = (otp) => {
    setOtp(otp);
    setIsValidOtp(otp.length === 6);
    setShowError(false);
  };

  const handleSubmit = () => {
    console.log("Submitted otp: ", OtpNum);
    setBusy(true);
    const url = 'http://10.0.2.2:8000/api/account/verify-otp/'; // Adjust the IP and path as needed

// Prepare the data you want to send in the POST request
const data = {
  phone: phone,
  otp: OtpNum, // Make sure the key matches your Django serializer field
};
fetch(url, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(data),
})
.then(response => {
  if (!response.ok) {
    // This will handle client errors (e.g., 400) and server errors (e.g., 500)
    console.log(response)
    throw new Error('Network response was not ok');
  }
  return response.json();
})
.then(async data => {
  // Perform additional validation on the response data if needed
  if (data.token) { // Assuming your API returns a success field for valid responses
    await AsyncStorage.setItem('userToken', data.token); // Save the token to AsyncStorage
    console.log('Token saved successfully');
    setIsValidOtp(true);
    setBusy(false);
    navigation.navigate("OnboardingStart");
  } else {
    // Handle case where API indicates failure but doesn't throw an error
    console.log(data)
    throw new Error('Validation failed on server');
  }
})
.catch((error) => {
  console.error('Error:', error);
  setTimeout(() => {
    setIsValidOtp(false);
    setShowError(true);
    setBusy(false);
  }, 2000);
});
  };

  return (
    <View style={styles.container}>
      {busy ? (
        <Processing />
      ) : (
        <>
          <View style={styles.textContainer}>
            <BackButton onPress={() => navigation.goBack()} title={"חזרה"} />
            <Text style={styles.heading}>זה הזמן להזין את הקוד</Text>
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              onChangeText={handleOtpChange}
              value={OtpNum}
              placeholder="קוד בן 6 תווים"
              //inputMode="numeric"
            />
            <CustomButton
              style={styles.button}
              title="שלחו שוב קוד"
              onPress={() => {
                console.log("hello");
              }}
              textColor={"#1355CB"}
              borderColor={"#FFFFFF"}
            />
            <CustomButton
              style={styles.button}
              title="בדקו קוד"
              onPress={handleSubmit}
              buttonColor={isValidOtp ? "#1355CB" : "#B9B9C9"}
              textColor={isValidOtp ? "#FFFFFF" : "#5C5C66"}
              borderColor={isValidOtp ? "#1355CB" : "#B9B9C9"}
              disabled={!isValidOtp}
            />
            {showError && (
              <CustomMessage
                style={styles.errorMessage}
                message={"שגיאה בהקלדת קוד - שלחנו סמס מחדש"}
                borderColor={"#FF3D1F"}
                iconName={"cancel"}
                iconColor={"#FF3D1F"}
              />
            )}
          </View>
        </>
      )}
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
    height: 120,
    top: 76,
    gap: 8,
  },
  heading: {
    width: 327,
    height: 80,
    fontFamily: "Caravan",
    fontSize: 36,
    lineHeight: 40,
    textAlign: "right",
  },
  inputContainer: {
    width: 327,
    height: 168,
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
  errorMessage: {
    width: 327,
    height: 56,
    top: 496,
    left: 50,
    padding: 16,
    borderRadius: 4,
    border: 1,
    gap: 8,
  },
});

export default OTP;
