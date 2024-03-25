import { View, Text, StyleSheet } from "react-native";
import { Entypo, AntDesign, MaterialIcons } from "@expo/vector-icons";
import CustomButton from "../components/CustomButton";
import LogoutButton from "../components/LogoutButton";
import { handleLogout } from "./SignUp/OTP";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useContext, useState } from "react";
import { TokenContext } from "../contexts/TokenContext";
// Import TokenContext if you plan to use it
// import { TokenContext } from "../contexts/TokenContext";

function ConfirmationScreen({ route }) {
  const navigation = useNavigation();
  const [busy, setBusy] = useState(false);
  const [showError, setShowError] = useState(false);
  // If you plan to use the token from context, uncomment the next line
  // const { token, setToken } = useContext(TokenContext);

  const handleSubmit = async () => {
    setBusy(true);
    const token = await AsyncStorage.getItem("userToken"); // Proper declaration with const
    console.log(token);
    if (!token) {
      console.log("No token found");
      setBusy(false); // Ensure you update state accordingly
      // Optionally navigate to a login screen or show a message
      return;
    }
    const user_id = await AsyncStorage.getItem("user_id");
    if (!user_id) {
      console.log("No id found");
      setBusy(false); // Ensure you update state accordingly
      // Optionally navigate to a login screen or show a message
      return;
    }
    const url = "http://10.0.2.2:8000/api/account/update/" + user_id + "/";
    const data = {
      first_name: route.params.first_name,
      last_name: route.params.last_name,
      email: route.params.email,
      gender: route.params.gender,
      birth_day: route.params.birth_day,
      city: route.params.city,
      volunteer_frequency: route.params.volunteer_frequency,
      volunteer_categories: [route.params.volunteer_categories],
      most_important: route.params.most_important,
      allow_notifications: false,
      finished_onboarding: true,
    };
    console.log(data)
    fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then(async (responseData) => {
        console.log("Success:", responseData);
        setBusy(false);
        navigation.navigate("HomePage");
      })
      .catch((error) => {
        console.error("Error:", error);
        setShowError(true); // Consider showing error feedback to the user
        setBusy(false);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <LogoutButton
          onPress={() => handleLogout(navigation)}
          title={"התנתק/י"}
        />
        <Text style={styles.heading}>הכל מוכן, צאו לדרך!</Text>
        <View style={styles.content}>
          <Text style={styles.textTitle}>אז מה עכשיו?</Text>
          <View style={styles.listContent}>
            <View style={styles.iconText}>
              <Text style={styles.text}>
                מוצאים פעילויות התנדבות שמעניינות אותך
              </Text>
              <Entypo name="magnifying-glass" color="#1355CB" size={24} />
            </View>

            <View style={styles.iconText}>
              <Text style={styles.text}>
                נרשמים לפעילות ומחכים לאישור השתתפות
              </Text>
              <AntDesign name="like2" color="#1355CB" size={24} />
            </View>
            <View style={styles.iconText}>
              <Text style={styles.text}>
                אנחנו נזכיר לכם יום לפני ונבקש לאשר הגעה
              </Text>
              <MaterialIcons
                name="notifications-none"
                color="#1355CB"
                size={24}
              />
            </View>
            <View style={styles.iconText}>
              <Text style={styles.text}>באים, תורמים, והכי חשוב, משפיעים </Text>
              <AntDesign name="heart" color="#1355CB" size={24} />
            </View>
          </View>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <CustomButton
          style={styles.button}
          title="קדימה 💪"
          onPress={handleSubmit}
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
    paddingTop: 50,
  },
  textContainer: {
    width: 327,
    height: 327,
    top: 92,
    gap: 32,
  },
  heading: {
    width: 327,
    height: 80,
    fontFamily: "Caravan",
    fontSize: 36,
    lineHeight: 40,
    textAlign: "center",
  },
  content: {
    width: 327,
    height: 260,
    gap: 24,
    alignItems: "center",
  },
  iconText: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  textTitle: {
    width: 327,
    height: 28,
    fontFamily: "Assistant",
    fontWeight: "400",
    fontSize: 18,
    lineHeight: 28,
    textAlign: "right",
  },
  text: {
    width: 327,
    height: 28,
    fontFamily: "Assistant",
    fontWeight: "400",
    fontSize: 18,
    lineHeight: 28,
    textAlign: "right",
    marginRight: 10,
  },
  listContent: {
    width: 327,
    height: 208,
    gap: 16,
    alignItems: "center",
    right: 20,
  },
  buttonContainer: {
    width: 327,
    height: 128,
    top: 300,
    gap: 8,
    alignContent: "center",
  },
  button: {
    width: 327,
    height: 48,
    borderRadius: 4,
    padding: 12,
  },
});

export default ConfirmationScreen;
