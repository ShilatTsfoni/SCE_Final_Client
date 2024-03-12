import { View, Text, StyleSheet } from "react-native";
import CustomButton from "../../components/CustomButton";
import { useState } from "react";
import { CheckBox } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import LogoutButton from "../../components/LogoutButton";
import { handleLogout } from "../SignUp/OTP";

function Gender({ route }) {
  const navigation = useNavigation();

  const [Gender, setGender] = useState("");
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  const handleCheckboxChange = (selectedGender) => {
    setGender(selectedGender); // Save the selected gender
    setIsButtonEnabled(true); // Enable the button
  };

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <LogoutButton
          onPress={() => handleLogout(navigation)}
          title={"התנתק/י"}
        />
        <Text style={styles.heading}>מגדר</Text>
        <Text style={styles.genderText}>
          אנחנו שואלים כי יש התנדבויות בהן זהו נושא רגיש.
        </Text>
      </View>
      <View style={styles.inputContainer}>
        <CheckBox
          right
          checked={Gender === "female"}
          checkedColor="#1355CB"
          containerStyle={[
            styles.checkboxContainer,
            { borderColor: Gender === "female" ? "#1355CB" : "#B9B9C9" },
          ]}
          fontFamily="Assistant"
          iconRight
          onIconPress={() => handleCheckboxChange("female")}
          size={16}
          fontWeight="600"
          lineHeight={24}
          title="אני מתנדבת 💃"
          uncheckedColor="#DCDCE5"
          borderRadius={4}
        />
        <CheckBox
          right
          checked={Gender === "male"}
          checkedColor="#1355CB"
          containerStyle={[
            styles.checkboxContainer,
            { borderColor: Gender === "male" ? "#1355CB" : "#B9B9C9" },
          ]}
          fontFamily="Assistant"
          iconRight
          onIconPress={() => handleCheckboxChange("male")}
          size={16}
          fontWeight="600"
          title="אני מתנדב 🕺"
          uncheckedColor="#DCDCE5"
          borderRadius={4}
        />
        <CustomButton
          style={styles.button}
          title="המשך"
          onPress={() => {
            const { first_name, last_name, email } = route.params;
            if (Gender.length > 0)
              navigation.navigate("BirthDate", {
                first_name,
                last_name,
                email,
                gender: Gender,
              });
          }}
          buttonColor={isButtonEnabled ? "#1355CB" : "#B9B9C9"}
          textColor={isButtonEnabled ? "#FFFFFF" : "#5C5C66"}
          borderColor={isButtonEnabled ? "#1355CB" : "#B9B9C9"}
          disabled={!isButtonEnabled}
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
  },
  heading: {
    width: 327,
    height: 40,
    fontFamily: "Caravan",
    fontSize: 36,
    lineHeight: 40,
    textAlign: "right",
  },
  genderText: {
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
    top: 250,
    gap: 12,
    alignContent: "center",
  },
  checkboxContainer: {
    width: 327,
    height: 48,
    borderRadius: 4,
    gap: 8,
    borderWidth: 1,
    borderRadius: 4,
    padding: 12,
    right: 10,
  },
  button: {
    width: 327,
    height: 48,
    borderRadius: 4,
    padding: 12,
  },
});

export default Gender;
