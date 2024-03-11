import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Platform,
  TouchableOpacity,
} from "react-native";
import CustomButton from "../../components/CustomButton";
import { useNavigation } from "@react-navigation/native";
import DatePicker from "@react-native-community/datetimepicker";

function BirthDate({route}) {
  const navigation = useNavigation();

  const [BirthDate, setBirthDate] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(Platform.OS === "ios"); // Hide date picker on iOS after selection
    if (selectedDate) {
      setBirthDate(selectedDate);
      setIsButtonDisabled(false);
    }
  };

  const handleTextInputPress = () => {
    setShowDatePicker(true);
  };

  const handleConfirm = () => {
    setShowDatePicker(false);
  };

  const handleNextScreen = () => {
    if (BirthDate) {
      const {first_name,last_name,email,gender} = route.params;
      navigation.navigate("City",{first_name,last_name,email,gender,birth_day:BirthDate});
    }
  };

  const formatDate = (date) => {
    if (!date) return "";
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  /* // Function to validate the date format (dd/mm/yyyy)
  const isValidDateFormat = (date) => {
    const dateFormat = /^\d{2}\/\d{2}\/\d{4}$/;
    return dateFormat.test(date);
  };

  // Function to validate the year
  const isValidYear = (date) => {
    const currentYear = new Date().getFullYear();
    const year = parseInt(date.split("/")[2], 10);
    return year <= currentYear;
  };

  const handleBirthDateChange = (date) => {
    // Remove any non-numeric characters from the input
    const cleanedDate = date.replace(/\D/g, "");
    // Format the date as "dd/mm/yyyy"
    let formattedDate = "";
    for (let i = 0; i < cleanedDate.length; i++) {
      if (i === 2 || i === 4) {
        formattedDate += "/";
      }
      formattedDate += cleanedDate[i];
    }
    // Update the state
    setBirthDate(formattedDate);
    // Check if the formatted date is valid
    const isValidDate =
      isValidDateFormat(formattedDate) && isValidYear(formattedDate);
    setIsValidBirthDate(isValidDate);
    // Print to console if the date is valid
    if (!isValidDate) {
      console.log("Invalid date entered:", formattedDate);
    } else {
      console.log("Valid date entered:", formattedDate);
    }
  }; */

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.heading}>תאריך לידה</Text>
        <Text style={styles.dateText}>
          אנחנו שואלים מאחר ויש התנדבויות לנוער והתנדבויות למבוגרים.
        </Text>
      </View>
      <View style={styles.inputContainer}>
        <TouchableOpacity onPress={handleTextInputPress}>
          <Text style={styles.input}>
            {BirthDate ? formatDate(BirthDate) : "תאריך לידה"}
          </Text>
        </TouchableOpacity>
        {showDatePicker && (
          <View>
            <DatePicker
              testID="datePicker"
              value={BirthDate || new Date()}
              mode="date"
              display="spinner"
              onChange={handleDateChange}
              maximumDate={new Date()}
              dateFormat="DD/MM/YYYY"
            />
            <Button title="אישור" onPress={handleConfirm} />
          </View>
        )}
        <CustomButton
          style={styles.button}
          title="המשך"
          onPress={handleNextScreen}
          buttonColor={!isButtonDisabled ? "#1355CB" : "#B9B9C9"}
          textColor={!isButtonDisabled ? "#FFFFFF" : "#5C5C66"}
          borderColor={!isButtonDisabled ? "#1355CB" : "#B9B9C9"}
          disabled={!isButtonDisabled}
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
    fontSize: 36,
    lineHeight: 40,
    textAlign: "right",
  },
  dateText: {
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
    top: 304,
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
    textAlign: "center",
  },
  button: {
    width: 327,
    height: 48,
    borderRadius: 4,
    padding: 12,
  },
});

export default BirthDate;
