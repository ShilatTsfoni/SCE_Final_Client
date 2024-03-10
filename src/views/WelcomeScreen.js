import { View, Text, StyleSheet, Button } from "react-native";
import CustomButton from "../components/CustomButton";
import { useNavigation } from "@react-navigation/native";

function WelcomeScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/*<ImageBackground source={...} style={{width: 327, height: 416, top: 64, alignItems: "center"}}>
    <Text>"חרבות ברזל"</Text>
    <Text>"יישומון ההתנדבות"</Text>
  </ImageBackground>*/}

      <View style={styles.imageBox}>
        <Text style={styles.heading}>חרבות ברזל</Text>
        <Text style={styles.content}>יישומון ההתנדבות</Text>
      </View>
      <View style={styles.signContent}>
        <Text style={styles.signText}>
          יש להירשם כדי למצוא התנדבות שמתאימה לך
        </Text>
        <View style={styles.buttonContainer}>
          <CustomButton
            style={styles.button}
            title="הרשמה להתנדבות 💪"
            onPress={() => {
              navigation.navigate("PhoneNumber");
            }}
            buttonColor={"#1355CB"}
            textColor={"#FFFFFF"}
            borderColor={"#1355CB"}
          />
          <CustomButton
            style={styles.button}
            title="יש לי כבר חשבון 😇"
            onPress={() => {}}
            buttonColor={"#FFFFFF"}
            textColor={"#1355CB"}
            borderColor={"#1355CB"}
          />
        </View>
        <View style={styles.condContainer}>
          <Button
            title="לצפייה בתנאים."
            onPress={() => {}}
            color="#838383"
            fontFamily="Assistant"
            fontSize="12"
            // fontWeight="400"
            lineHeight="16"
          />
          <Text style={styles.condText}>
            בהרשמה למערכת אתם מסכימים לתנאים-{" "}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imageBox: {
    marginTop: 70,
    backgroundColor: "#ececec",
    paddingVertical: 100,
    marginBottom: 250,
    width: 327,
    height: 416,
    justifyContent: "center",
    alignItems: "center",
  },
  heading: {
    fontFamily: "Caravan",
    fontSize: 40,
    alignContent: "center",
    color: "#1355CB",
  },
  content: {
    fontFamily: "Assistant",
    fontWeight: "600",
    fontSize: 16,
    alignContent: "center",
    color: "#919191",
  },
  signContent: {
    width: 327,
    height: 100,
    top: -190,
    left: 22,
  },
  signText: {
    fontFamily: "Assistant",
    fontWeight: "400",
    fontSize: 18,
    alignContent: "center",
    lineHeight: 28,
  },
  buttonContainer: {
    width: 327,
    height: 108,
    justifyContent: "center",
    gap: 12,
    left: -21,
    marginTop: 25,
  },
  button: {
    width: 327,
    height: 48,
    borderRadius: 4,
    padding: 12,
  },
  condContainer: {
    flexDirection: "row",
    alignItems: "center",
    left: -15,
    marginTop: 25,
  },
  condText: {
    color: "#838383",
    fontFamily: "Assistant",
    fontSize: 12,
    fontWeight: "400",
    lineHeight: 16,
  },
});

export default WelcomeScreen;
