import { View, Text, StyleSheet } from "react-native";
import CustomButton from "../../components/CustomButton";
import { useState } from "react";
import { CheckBox } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import BackButton from "../../components/BackButton";
import LogoutButton from "../../components/LogoutButton";
import { handleLogout } from "../SignUp/OTP";

function Skills({ route }) {
  const navigation = useNavigation();

  const [Skills, setSkills] = useState([]);
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  // Mapping of Hebrew skill names to English
  const skillTranslations = {
    "לארוז חבילות": "Packaging",
    "לחדש בתים": "Refurbishing",
    "להסיע או לשנע": "Driving",
    "לתרום ולמסור": "Handout",
    "לגייס": "Recruit",
    "כיכר החטופים": "Advocacy",
  };
  const handleCheckboxChange = (selectedSkill) => {
    let updatedSkills = Skills.includes(selectedSkill) 
      ? Skills.filter((skill) => skill !== selectedSkill) // Remove skill
      : [...Skills, selectedSkill]; // Add skill
  
    setSkills(updatedSkills); // Update skills state
    setIsButtonEnabled(updatedSkills.length > 0); // Enable/disable button
  
    // Translate and log updated skills
    const translatedSkills = updatedSkills.map((skill) => skillTranslations[skill] || skill);
    console.log(translatedSkills);
  };

  const handleContinue = () => {
    if (Skills.length > 0) {
      const {
        first_name,
        last_name,
        email,
        gender,
        birth_day,
        city,
        volunteer_frequency,
      } = route.params;
      // Translate selected skills using the mapping object
      const translatedSkills = Skills.map((skill) => skillTranslations[skill]);
      console.log("Selected skills:", translatedSkills); // Log the selected skills in English

      navigation.navigate("ImportancePage", {
        first_name,
        last_name,
        email,
        gender,
        birth_day,
        city,
        volunteer_frequency,
        volunteer_categories: translatedSkills,
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
        <Text style={styles.heading}>מה היית רוצה לעשות?</Text>
        <Text style={styles.skillText}>
          ציון הכישורים והיכולות שלך יעזור לנו להציע לך התנדבויות מתאימות.
        </Text>
      </View>
      <View style={styles.inputContainer}>
        {/* Render CheckBox components dynamically based on an array of skills */}
        {[
          "לארוז חבילות",
          "לחדש בתים",
          "להסיע או לשנע",
          "לתרום ולמסור",
          "לגייס",
          "כיכר החטופים",
        ].map((skill) => (
          <CheckBox
            key={skill}
            right
            checked={Skills.includes(skill)}
            checkedColor="#1355CB"
            containerStyle={[
              styles.checkboxContainer,
              {
                borderColor: Skills.includes(skill) ? "#1355CB" : "#B9B9C9",
              },
            ]}
            fontFamily="Assistant"
            iconRight
            onIconPress={() => handleCheckboxChange(skill)}
            size={16}
            fontWeight="600"
            lineHeight={24}
            title={skill}
            uncheckedColor="#DCDCE5"
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
  },
  textContainer: {
    width: 327,
    height: 76,
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
  skillText: {
    width: 327,
    height: 56,
    fontFamily: "Assistant",
    fontWeight: "400",
    fontSize: 18,
    lineHeight: 28,
    textAlign: "right",
  },
  inputContainer: {
    width: 327,
    height: 108,
    top: 230,
    gap: 12,
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

export default Skills;
