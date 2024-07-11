import { useState } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import { CheckBox } from "@rneui/themed";
import CustomButton from "../../components/CustomButton";
import { useNavigation } from "@react-navigation/native";
//import LogoutButton from "../../components/LogoutButton";
//import { handleLogout } from "../SignUp/OTP";

function Frequency({ route }) {
  const navigation = useNavigation();

  const [Frequency, setFrequency] = useState("");
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  const FrequencyEnum = {
    "once a week": 0,
    "less than once a week": 1,
    "more than once a week": 2,
    "when needed": 3,
  };

  const handleCheckboxChange = (selectedFrequency) => {
    setFrequency(selectedFrequency);
    setIsButtonEnabled(true);
    console.log(selectedFrequency);
  };

  const handleContinue = () => {
    if (Frequency) {
      const { first_name, last_name, email, gender, birth_day, city } =
        route.params;
      navigation.navigate("Skills", {
        first_name,
        last_name,
        email,
        gender,
        birth_day,
        city,
        volunteer_frequency: FrequencyEnum[Frequency],
      });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        {/* <LogoutButton
          onPress={() => handleLogout(navigation)}
          title={"התנתק/י"}
        /> */}
        <Text style={styles.heading}>מהי זמינות ההתנדבות שלך?</Text>
      </View>
      <View style={styles.selectContainer}>
        <CheckBox
          right
          checked={Frequency === "less than once a week"}
          checkedColor="#FFFFFF"
          containerStyle={[
            styles.checkboxContainer,
            {
              borderColor:
                Frequency === "less than once a week" ? "#1355CB" : "#B9B9C9",
            },
          ]}
          fontFamily="Assistant"
          onPress={() => handleCheckboxChange("less than once a week")}
          size={16}
          title="פחות מפעם בשבוע"
          uncheckedColor="#FFFFFF"
          borderRadius={4}
        />
        <CheckBox
          right
          checked={Frequency === "once a week"}
          checkedColor="#FFFFFF"
          containerStyle={[
            styles.checkboxContainer,
            {
              borderColor: Frequency === "once a week" ? "#1355CB" : "#B9B9C9",
            },
          ]}
          fontFamily="Assistant"
          onPress={() => handleCheckboxChange("once a week")}
          size={16}
          title="פעם בשבוע"
          uncheckedColor="#FFFFFF"
          borderRadius={4}
        />
        <CheckBox
          right
          checked={Frequency === "more than once a week"}
          checkedColor="#FFFFFF"
          containerStyle={[
            styles.checkboxContainer,
            {
              borderColor:
                Frequency === "more than once a week" ? "#1355CB" : "#B9B9C9",
            },
          ]}
          fontFamily="Assistant"
          onPress={() => handleCheckboxChange("more than once a week")}
          size={16}
          title="יותר מפעם בשבוע"
          uncheckedColor="#FFFFFF"
          borderRadius={4}
        />
        <CheckBox
          right
          hideIcon
          checked={Frequency === "when needed"}
          checkedColor="#FFFFFF"
          containerStyle={[
            styles.checkboxContainer,
            {
              borderColor: Frequency === "when needed" ? "#1355CB" : "#B9B9C9",
            },
          ]}
          fontFamily="Assistant"
          onPress={() => handleCheckboxChange("when needed")}
          size={16}
          title="מתי שצריך"
          uncheckedColor="#FFFFFF"
          borderRadius={4}
        />
        <CustomButton
          style={styles.button}
          title="המשך"
          onPress={handleContinue}
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
    height: 80,
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

export default Frequency;
