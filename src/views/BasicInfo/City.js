import { useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import CustomButton from "../../components/CustomButton";
import { useNavigation } from "@react-navigation/native";

function City() {
  const navigation = useNavigation();

  const [CityName, setCityName] = useState("");
  const [isEnteredCityName, setIsEnteredCityName] = useState(false);

  // List of cities
  const cities = [
    { label: "תל אביב", value: "תל אביב" },
    { label: "ירושלים", value: "ירושלים" },
    { label: "חיפה", value: "חיפה" },
    // Add more cities as needed
  ];

  const handleCityNameChange = (city) => {
    setCityName(city.value);
    setIsEnteredCityName(city.value !== "");
    console.log("Selected city: ", city);
  };

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.heading}>עיר מגורים</Text>
        <Text style={styles.cityText}>
          אנחנו שואלים כדי למצוא לך התנדבויות קרובות לבית.
        </Text>
      </View>
      <View style={styles.inputContainer}>
        <SelectList
          placeholder="עיר מגורים"
          searchPlaceholder="חיפוש"
          setSelected={(city) => handleCityNameChange(city)}
          data={cities}
          save="value"
          fontFamily="Assistant"
          boxStyles={styles.input}
          dropdownItemStyles={styles.dropdown}
          arrowAlign="right"
        />
        <CustomButton
          style={styles.button}
          title="המשך"
          onPress={() => {
            navigation.navigate("StartPage");
          }}
          buttonColor={isEnteredCityName ? "#1355CB" : "#B9B9C9"}
          textColor={isEnteredCityName ? "#FFFFFF" : "#5C5C66"}
          borderColor={isEnteredCityName ? "#1355CB" : "#B9B9C9"}
          disabled={!isEnteredCityName}
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
    height: 76,
    top: 116,
    gap: 8,
    alignItems: "center",
  },
  heading: {
    width: 327,
    height: 40,
    fontFamily: "Caravan",
    fontWeight: 900,
    fontSize: 36,
    lineHeight: 40,
    textAlign: "right",
  },
  cityText: {
    width: 327,
    height: 56,
    fontFamily: "Assistant",
    fontWeight: 400,
    fontSize: 18,
    lineHeight: 28,
    textAlign: "right",
  },
  inputContainer: {
    width: 327,
    height: 108,
    top: 270,
    gap: 12,
    alignContent: "center",
  },
  input: {
    height: 48,
    width: 327,
    fontFamily: "Assistant",
    fontWeight: 400,
    fontSize: 16,
    lineHeight: 24,
    borderColor: "#DCDCE5",
    color: "#73738A",
    borderRadius: 4,
    borderWidth: 1,
    padding: 12,
    gap: 8,
    textAlign: "right",
    alignItems: "center",
  },
  dropdown: {
    height: 48,
    width: 327,
    fontFamily: "Assistant",
    fontWeight: 400,
    fontSize: 16,
    lineHeight: 24,
    padding: 12,
    gap: 8,
    textAlign: "right",
    alignItems: "flex-end",
  },
  button: {
    width: 327,
    height: 48,
    borderRadius: 4,
    padding: 12,
  },
});

export default City;
