import { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import CustomButton from "../../components/CustomButton";
import { useNavigation } from "@react-navigation/native";
import LogoutButton from "../../components/LogoutButton";
import { handleLogout } from "../SignUp/OTP";

function City({ route }) {
  const navigation = useNavigation();

  const [CityName, setCityName] = useState("");
  const [isEnteredCityName, setIsEnteredCityName] = useState(false);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    // Fetch cities data from the server
    fetchCities();
  }, []);

  // List of cities
  /* const cities = [
    { label: "תל אביב", value: "תל אביב" },
    { label: "ירושלים", value: "ירושלים" },
    { label: "חיפה", value: "חיפה" },
    // Add more cities as needed
  ]; */

  const fetchCities = async () => {
    try {
      const response = await fetch("http://10.0.2.2:8000/api/account/cities/");
      if (response.ok) {
        const data = await response.json();
        // Update cities state with the fetched data
        setCities(data);
      } else {
        console.error("Failed to fetch cities data");
      }
    } catch (error) {
      console.error("Error fetching cities data:", error);
    }
  };

  const handleCityNameChange = (city) => {
    setCityName(city);
    setIsEnteredCityName(true);
    console.log("Selected city: ", city);
  };

  const handleContinue = () => {
    if (CityName) {
      const { first_name, last_name, email, gender, birth_day } = route.params;
      navigation.navigate("StartPage", {
        first_name,
        last_name,
        email,
        gender,
        birth_day,
        city: CityName,
      });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <LogoutButton
          onPress={() => handleLogout(navigation)}
          title={"התנתק/י"}
        />
        <Text style={styles.heading}>עיר מגורים</Text>
        <Text style={styles.cityText}>
          אנחנו שואלים כדי למצוא לך התנדבויות קרובות לבית.
        </Text>
      </View>
      <View style={styles.inputContainer}>
        <SelectList
          placeholder="עיר מגורים"
          searchPlaceholder="חיפוש"
          setSelected={handleCityNameChange}
          data={cities}
          save="value"
          fontFamily="Assistant"
          boxStyles={styles.input}
          dropdownItemStyles={styles.dropdown}
          arrowAlign="left"
        />
        <CustomButton
          style={styles.button}
          title="המשך"
          onPress={handleContinue}
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
  },
  heading: {
    width: 327,
    height: 40,
    fontFamily: "Caravan",
    fontSize: 36,
    lineHeight: 40,
    textAlign: "right",
  },
  cityText: {
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
    top: 270,
    gap: 12,
    alignContent: "center",
  },
  input: {
    height: 48,
    width: 327,
    fontFamily: "Assistant",
    fontWeight: "400",
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
    flexDirection: "row-reverse", // Align dropdown items from right to left
    justifyContent: "space-between", // Spread items horizontally
    height: 48,
    width: 327,
    fontFamily: "Assistant",
    fontWeight: "400",
    fontSize: 16,
    lineHeight: 24,
    padding: 12,
    gap: 8,
    alignItems: "center",
  },

  button: {
    width: 327,
    height: 48,
    borderRadius: 4,
    padding: 12,
  },
});

export default City;
