import { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { CheckBox } from "@rneui/themed";
import CustomButton from "../../components/CustomButton";
import { useNavigation } from "@react-navigation/native";
import BackButton from "../../components/BackButton";

function ImportancePage() {
  const navigation = useNavigation();

  const [Importance, setImportance] = useState("");
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  const handleCheckboxChange = (selectedImportance) => {
    setImportance(selectedImportance);
    setIsButtonEnabled(true);
    console.log(selectedImportance);
  };

  const handleContinue = () => {
    if (Importance) {
      navigation.navigate("NotificationsPage");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <BackButton onPress={() => navigation.goBack()} title={"חזרה"} />
        <Text style={styles.heading}>מה הכי חשוב לך?</Text>
      </View>
      <View style={styles.selectContainer}>
        <CheckBox
          right
          checked={Importance === "Volunteer with friends"}
          checkedColor="#FFFFFF"
          containerStyle={[
            styles.checkboxContainer,
            {
              borderColor:
                Importance === "Volunteer with friends" ? "#1355CB" : "#B9B9C9",
            },
          ]}
          fontFamily="Assistant"
          onPress={() => handleCheckboxChange("Volunteer with friends")}
          size={16}
          title="להתנדב עם חברים"
          uncheckedColor="#FFFFFF"
          borderRadius={4}
        />
        <CheckBox
          right
          checked={Importance === "close to home"}
          checkedColor="#FFFFFF"
          containerStyle={[
            styles.checkboxContainer,
            {
              borderColor:
                Importance === "close to home" ? "#1355CB" : "#B9B9C9",
            },
          ]}
          fontFamily="Assistant"
          onPress={() => handleCheckboxChange("close to home")}
          size={16}
          title="קרוב לבית"
          uncheckedColor="#FFFFFF"
          borderRadius={4}
        />
        <CheckBox
          right
          checked={Importance === "practice my profession and skills"}
          checkedColor="#FFFFFF"
          containerStyle={[
            styles.checkboxContainer,
            {
              borderColor:
                Importance === "practice my profession and skills"
                  ? "#1355CB"
                  : "#B9B9C9",
            },
          ]}
          fontFamily="Assistant"
          onPress={() =>
            handleCheckboxChange("practice my profession and skills")
          }
          size={16}
          title="לעסוק במקצוע ובכישורים שלי"
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
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: 50,
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
    fontWeight: "900",
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

export default ImportancePage;
