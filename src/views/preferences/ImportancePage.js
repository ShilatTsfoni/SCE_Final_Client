import { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { CheckBox } from "@rneui/themed";
import CustomButton from "../../components/CustomButton";
import { useNavigation } from "@react-navigation/native";
import BackButton from "../../components/BackButton";
//import LogoutButton from "../../components/LogoutButton";
//import { handleLogout } from "../SignUp/OTP";

function ImportancePage({ route }) {
  const navigation = useNavigation();

  // Updated to hold a single value for the current selection or null if none
  const [importance, setImportance] = useState("");

  // Update to enable the button if any importance is selected
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  // Mapping of Hebrew importance names to English
  const importanceTranslations = {
    "להתנדב עם חברים": "Friends",
    "קרוב לבית": "Distance",
    "לעסוק במקצוע או בכישורים שלי": "Profession",
    'החמ"ל שלי': "Organization",
  };

  const handleCheckboxChange = (selectedImportance) => {
    setImportance(selectedImportance);
    setIsButtonEnabled(true);
    console.log(selectedImportance);
  };

  const handleContinue = () => {
    console.log(route.params)
    if (importance) {
      const {
        first_name,
        last_name,
        email,
        gender,
        birth_day,
        city,
        volunteer_frequency,
        volunteer_categories,
      } = route.params;
      navigation.navigate("NotificationsPage", {
        first_name,
        last_name,
        email,
        gender,
        birth_day,
        city,
        volunteer_frequency,
        volunteer_categories,
        most_important: importanceTranslations[importance],
      });
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <View style={styles.buttonContainer}>
          {/* <LogoutButton
            onPress={() => handleLogout(navigation)}
            title={"התנתק/י"}
          /> */}
          <BackButton onPress={() => navigation.goBack()} title={"חזרה"} />
        </View>
        <Text style={styles.heading}>מה הכי חשוב לך?</Text>
      </View>
      <View style={styles.selectContainer}>
        <CheckBox
          right
          checked={importance === "להתנדב עם חברים"}
          checkedColor="#FFFFFF"
          containerStyle={[
            styles.checkboxContainer,
            {
              borderColor:
                importance === "להתנדב עם חברים" ? "#1355CB" : "#B9B9C9",
            },
          ]}
          fontFamily="Assistant"
          onPress={() => handleCheckboxChange("להתנדב עם חברים")}
          size={16}
          title="להתנדב עם חברים"
          uncheckedColor="#FFFFFF"
          borderRadius={4}
        />
        <CheckBox
          right
          checked={importance === "קרוב לבית"}
          checkedColor="#FFFFFF"
          containerStyle={[
            styles.checkboxContainer,
            {
              borderColor: importance === "קרוב לבית" ? "#1355CB" : "#B9B9C9",
            },
          ]}
          fontFamily="Assistant"
          onPress={() => handleCheckboxChange("קרוב לבית")}
          size={16}
          title="קרוב לבית"
          uncheckedColor="#FFFFFF"
          borderRadius={4}
        />
        <CheckBox
          right
          checked={importance === "לעסוק במקצוע או בכישורים שלי"}
          checkedColor="#FFFFFF"
          containerStyle={[
            styles.checkboxContainer,
            {
              borderColor:
                importance === "לעסוק במקצוע או בכישורים שלי"
                  ? "#1355CB"
                  : "#B9B9C9",
            },
          ]}
          fontFamily="Assistant"
          onPress={() => handleCheckboxChange("לעסוק במקצוע או בכישורים שלי")}
          size={16}
          title="לעסוק במקצוע או בכישורים שלי"
          uncheckedColor="#FFFFFF"
          borderRadius={4}
        />
        <CheckBox
          right
          hideIcon
          checked={importance === 'החמ"ל שלי'}
          checkedColor="#FFFFFF"
          containerStyle={[
            styles.checkboxContainer,
            {
              borderColor: importance === 'החמ"ל שלי' ? "#1355CB" : "#B9B9C9",
            },
          ]}
          fontFamily="Assistant"
          onPress={() => handleCheckboxChange('החמ"ל שלי')}
          size={16}
          title='החמ"ל שלי'
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
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
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
    top: 250,
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
