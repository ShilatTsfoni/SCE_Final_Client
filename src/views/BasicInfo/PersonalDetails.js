import { useState } from "react";
import { View, Text, StyleSheet, TextInput, Alert } from "react-native";
import CustomButton from "../../components/CustomButton";
import { useNavigation } from "@react-navigation/native";
//import LogoutButton from "../../components/LogoutButton";
//import { handleLogout } from "../SignUp/OTP";

function PersonalDetails(route) {
  const navigation = useNavigation();

  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [Email, setEmail] = useState("");
  const [isEnteredInfo, setIsEnteredInfo] = useState(false);

  const handleFirstNameChange = (firstName) => {
    setFirstName(firstName);
    checkAllFieldsEntered();
  };

  const handleLastNameChange = (lastName) => {
    setLastName(lastName);
    checkAllFieldsEntered();
  };

  const handleEmailChange = (email) => {
    setEmail(email);
    checkAllFieldsEntered();
  };

  const checkAllFieldsEntered = () => {
    const isFirstNameValid =
      /^[\u0590-\u05FF]+$/.test(FirstName) || /^[a-zA-Z]+$/.test(FirstName);
    const isLastNameValid =
      /^[\u0590-\u05FF]+$/.test(LastName) || /^[a-zA-Z]+$/.test(LastName);
    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(Email);

    if (isFirstNameValid && isLastNameValid && isEmailValid) {
      setIsEnteredInfo(true);
    } else {
      setIsEnteredInfo(false);
    }
  };

  const handleSubmit = () => {
    if (isEnteredInfo) {
      console.log(FirstName + " " + LastName + " " + Email);
      navigation.navigate("Gender", {
        first_name: FirstName,
        last_name: LastName,
        email: Email,
      });
    } else {
      Alert.alert("Invalid Input", "Please enter valid details.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        {/* <LogoutButton
          onPress={() => handleLogout(navigation)}
          title={"התנתק/י"}
        /> */}
        <Text style={styles.heading}>פרטים אישיים</Text>
      </View>
      <View style={styles.selectContainer}>
        <TextInput
          style={styles.input}
          onChangeText={handleFirstNameChange}
          value={FirstName}
          placeholder="שם פרטי"
          inputMode="text"
        />
        <TextInput
          style={styles.input}
          onChangeText={handleLastNameChange}
          value={LastName}
          placeholder="שם משפחה"
          inputMode="text"
        />
        <TextInput
          style={styles.input}
          onChangeText={handleEmailChange}
          value={Email}
          placeholder="כתובת מייל"
          inputMode="email"
          keyboardType="email-address"
        />
        <CustomButton
          style={styles.button}
          title="המשך"
          onPress={handleSubmit}
          buttonColor={isEnteredInfo ? "#1355CB" : "#B9B9C9"}
          textColor={isEnteredInfo ? "#FFFFFF" : "#5C5C66"}
          borderColor={isEnteredInfo ? "#1355CB" : "#B9B9C9"}
          disabled={!isEnteredInfo}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    width: 327,
    height: 40,
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
  selectContainer: {
    width: 327,
    height: 232,
    top: 320,
    gap: 16,
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
    textAlign: "right",
  },
});

export default PersonalDetails;
