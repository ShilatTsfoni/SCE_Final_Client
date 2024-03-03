import { useState } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import CustomButton from "../../components/CustomButton";
import { useNavigation } from "@react-navigation/native";

function PersonalDetails() {
  const navigation = useNavigation();

  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [Email, setEmail] = useState("");
  const [isEnteredInfo, setIsEnteredInfo] = useState(false);

  const handleFirstNameChange = (firstName) => {
    setFirstName(firstName);
  };

  const handleLastNameChange = (lastName) => {
    setLastName(lastName);
  };

  const handleEmailChange = (email) => {
    setEmail(email);
  };

  const handleSubmit = () => {
    if (FirstName.length > 0 && LastName.length > 0 && Email.length > 0) {
      setIsEnteredInfo(true);
      navigation.navigate("Gender");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
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
    fontWeight: 900,
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
    fontWeight: 400,
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
