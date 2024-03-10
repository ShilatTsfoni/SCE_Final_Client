import { View, Text, StyleSheet } from "react-native";
import CustomButton from "../../components/CustomButton";
import { useState } from "react";
import { CheckBox } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import BackButton from "../../components/BackButton";

function Skills() {
  const navigation = useNavigation();

  const [Skill, setSkill] = useState("");
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  const handleCheckboxChange = (selectedSkill) => {
    setSkill(selectedSkill); // Save the selected gender
    setIsButtonEnabled(true); // Enable the button
    console.log(selectedSkill);
  };

  const handleContinue = () => {
    if (Skill) {
      navigation.navigate("ImportancePage");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <BackButton onPress={() => navigation.goBack()} title={"חזרה"} />
        <Text style={styles.heading}>מה היית רוצה לעשות?</Text>
        <Text style={styles.skillText}>
          ציון הכישורים והיכולות שלך יעזור לנו להציע לך התנדבויות מתאימות.
        </Text>
      </View>
      <View style={styles.inputContainer}>
        <CheckBox
          right
          checked={Skill === "handyman"}
          checkedColor="#1355CB"
          containerStyle={[
            styles.checkboxContainer,
            { borderColor: Skill === "handyman" ? "#1355CB" : "#B9B9C9" },
          ]}
          fontFamily="Assistant"
          iconRight
          onIconPress={() => handleCheckboxChange("handyman")}
          size={16}
          fontWeight="600"
          lineHeight={24}
          title="דברים עם הידיים: לארוז, לסדר וכו׳"
          uncheckedColor="#DCDCE5"
          borderRadius={4}
        />
        <CheckBox
          right
          checked={Skill === "logistics"}
          checkedColor="#1355CB"
          containerStyle={[
            styles.checkboxContainer,
            { borderColor: Skill === "logistics" ? "#1355CB" : "#B9B9C9" },
          ]}
          fontFamily="Assistant"
          iconRight
          onIconPress={() => handleCheckboxChange("logistics")}
          size={16}
          fontWeight="600"
          lineHeight={24}
          title="לוגיסטיקה: לנסוע, להביא, להחזיר, לשנע"
          uncheckedColor="#DCDCE5"
          borderRadius={4}
        />
        <CheckBox
          right
          checked={Skill === "peoples"}
          checkedColor="#1355CB"
          containerStyle={[
            styles.checkboxContainer,
            { borderColor: Skill === "peoples" ? "#1355CB" : "#B9B9C9" },
          ]}
          fontFamily="Assistant"
          iconRight
          onIconPress={() => handleCheckboxChange("peoples")}
          size={16}
          fontWeight="600"
          lineHeight={24}
          title="אנשים: לנהל, להכיר, לגייס מתנדבים"
          uncheckedColor="#DCDCE5"
          borderRadius={4}
        />
        <CheckBox
          right
          checked={Skill === "Sales and fundraising"}
          checkedColor="#1355CB"
          containerStyle={[
            styles.checkboxContainer,
            {
              borderColor:
                Skill === "Sales and fundraising" ? "#1355CB" : "#B9B9C9",
            },
          ]}
          fontFamily="Assistant"
          iconRight
          onIconPress={() => handleCheckboxChange("Sales and fundraising")}
          size={16}
          fontWeight="600"
          lineHeight={24}
          title="מכירות וגיוס תרומות"
          uncheckedColor="#DCDCE5"
          borderRadius={4}
        />
        <CheckBox
          right
          checked={Skill === "Technology and computers"}
          checkedColor="#1355CB"
          containerStyle={[
            styles.checkboxContainer,
            {
              borderColor:
                Skill === "Technology and computers" ? "#1355CB" : "#B9B9C9",
            },
          ]}
          fontFamily="Assistant"
          iconRight
          onIconPress={() => handleCheckboxChange("Technology and computers")}
          size={16}
          fontWeight="600"
          lineHeight={24}
          title="טכנולוגיה ומחשבים"
          uncheckedColor="#DCDCE5"
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
  },
  textContainer: {
    width: 327,
    height: 76,
    top: 116,
    gap: 8,
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
    top: 250,
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
