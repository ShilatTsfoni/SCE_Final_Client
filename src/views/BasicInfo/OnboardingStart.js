import { View, Text, Button, StyleSheet } from "react-native";
import CustomButton from "../../components/CustomButton";
import { useNavigation } from "@react-navigation/native";
import LogoutButton from "../../components/LogoutButton";
import { handleLogout } from "../SignUp/OTP";
function OnboardingStart({ route }) {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <LogoutButton
          onPress={() => handleLogout(navigation)}
          title={"התנתק/י"}
        />
        <Text style={styles.heading}>הצלחה גדולה!</Text>
        <Text style={styles.heading}>מכאן ממשיכים לפרטים אישיים</Text>
      </View>
      <View style={styles.buttonContainer}>
        <CustomButton
          style={styles.button}
          title="המשך"
          onPress={() => {
            navigation.navigate("PersonalDetails");
          }}
          buttonColor={"#1355CB"}
          textColor={"#FFFFFF"}
          borderColor={"#1355CB"}
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
    height: 120,
    top: 116,
    gap: 8,
  },
  heading: {
    fontFamily: "Caravan",

    fontSize: 36,
    lineHeight: 40,
    textAlign: "right",
  },
  buttonContainer: {
    width: 327,
    height: 48,
    top: 600,
    borderRadius: 4,
    gap: 4,
    alignContent: "center",
  },
});

export default OnboardingStart;
