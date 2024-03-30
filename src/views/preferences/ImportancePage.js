import { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { CheckBox } from "@rneui/themed";
import CustomButton from "../../components/CustomButton";
import { useNavigation } from "@react-navigation/native";
import BackButton from "../../components/BackButton";
import LogoutButton from "../../components/LogoutButton";
import { handleLogout } from "../SignUp/OTP";

function ImportancePage({ route }) {
  const navigation = useNavigation();

  // Updated to hold a single value for the current selection or null if none
  const [importance, setImportance] = useState(null);
  
  // Update to enable the button if any importance is selected
  const isButtonEnabled = Boolean(importance);

  // Mapping of Hebrew importance names to English
  const importanceTranslations = {
    "להתנדב עם חברים": "Friends",
    "קרוב לבית": "Distance",
    "לעסוק במקצוע או בכישורים שלי": "Profession",
    'החמ"ל שלי': "Organization",
  };

  const handleCheckboxChange = (selectedImportance) => {
    // Set the importance directly, allowing toggling off by reselecting
    setImportance(importance === selectedImportance ? null : selectedImportance);
  };

  const handleContinue = () => {
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

      // Only a single importance to translate and send
      const translatedImportance = importanceTranslations[importance];
      console.log("Selected importance:", translatedImportance); // Log the selected skill in English

      navigation.navigate("NotificationsPage", {
        first_name,
        last_name,
        email,
        gender,
        birth_day,
        city,
        volunteer_frequency,
        volunteer_categories,
        most_important: translatedImportance,
      });
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <View style={styles.buttonContainer}>
          <LogoutButton
            onPress={() => handleLogout(navigation)}
            title={"התנתק/י"}
          />
          <BackButton onPress={() => navigation.goBack()} title={"חזרה"} />
        </View>
        <Text style={styles.heading}>מה הכי חשוב לך?</Text>
      </View>
      <View style={styles.selectContainer}>
        {/* Render CheckBox components dynamically based on an array of importances */}
        {[
          "להתנדב עם חברים",
          "קרוב לבית",
          "לעסוק במקצוע או בכישורים שלי",
          'החמ"ל שלי',
        ].map((importance) => (
          <CheckBox
            key={importance}
            right
            checked={Importances.includes(importance)}
            checkedColor="#FFFFFF"
            containerStyle={[
              styles.checkboxContainer,
              {
                borderColor: Importances.includes(importance)
                  ? "#1355CB"
                  : "#B9B9C9",
              },
            ]}
            fontFamily="Assistant"
            onPress={() => handleCheckboxChange(importance)}
            size={16}
            title={importance}
            uncheckedColor="#FFFFFF"
            borderRadius={4}
          />
        ))}

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
