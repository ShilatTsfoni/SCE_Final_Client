import { View, Text, StyleSheet } from "react-native";
import CustomButton from "../../components/CustomButton";
import { useNavigation } from "@react-navigation/native";

function StartPage() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.heading}>מעולה!</Text>
        <Text style={styles.heading}>נמשיך להעדפות ההתנדבות שלך</Text>
      </View>
      <View style={styles.buttonContainer}>
        <CustomButton
          style={styles.button}
          title="קדימה כבר"
          onPress={() => {
            navigation.navigate("Frequency");
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
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: 50,
  },
  textContainer: {
    width: 327,
    height: 120,
    top: 116,
    gap: 8,
  },
  heading: {
    fontFamily: "Caravan",
    fontWeight: 900,
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
