import { View, Text, StyleSheet } from "react-native";
import CustomButton from "../../components/CustomButton";
import { useNavigation } from "@react-navigation/native";
//import LogoutButton from "../../components/LogoutButton";
//import { handleLogout } from "../SignUp/OTP";

function StartPage({ route }) {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        {/* <LogoutButton
          onPress={() => handleLogout(navigation)}
          title={"התנתק/י"}
        /> */}
        <Text style={styles.heading}>מעולה!</Text>
        <Text style={styles.heading}>נמשיך להעדפות ההתנדבות שלך</Text>
      </View>
      <View style={styles.buttonContainer}>
        <CustomButton
          style={styles.button}
          title="קדימה כבר"
          onPress={() => {
            const { first_name, last_name, email, gender, birth_day, city } =
              route.params;
            navigation.navigate("Frequency", {
              first_name,
              last_name,
              email,
              gender,
              birth_day,
              city,
            });
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
    flex: 1,
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

export default StartPage;
