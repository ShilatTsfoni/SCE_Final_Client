import { View, Text, TextInput, StyleSheet } from "react-native";
import { Entypo, AntDesign, MaterialIcons } from "@expo/vector-icons";
import CustomButton from "../components/CustomButton";

function ConfirmationScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
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
          onPress={() => {
            //navigation.navigate("PhoneNumber");
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
    paddingTop: 50,
  },
  textContainer: {
    width: 327,
    height: 327,
    top: 92,
    gap: 32,
    alignItems: "center",
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
