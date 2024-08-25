import { StyleSheet, Text, View } from "react-native";
import CustomButton from "./CustomButton";
import { useState } from "react";
import PropTypes from "prop-types";

function VolunteerCard({
  eventName,
  organizationName,
  location,
  date,
  time,
  navigation,
  id,
  eventData,
}) {
  const [approved, setApproved] = useState(false);

  const parseDate = (providedDate) => {
    const [day, month, year] = providedDate.split(".");
    return new Date(`${day}-${month}-${year}`);
  };

  const parsedDate = parseDate(date);
  //console.log("Parsed Date:", parsedDate);

  const is24HoursAhead = (providedDate) => {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0); // Set current date to beginning of the day
    const providedDateObj = parseDate(providedDate);
    providedDateObj.setHours(0, 0, 0, 0); // Set provided date to beginning of the day
    const timeDiff = providedDateObj.getTime() - currentDate.getTime(); // Difference in milliseconds
    const dayDiff = timeDiff / (1000 * 3600 * 24); // Difference in days
    console.log("Days Difference:", dayDiff);
    return dayDiff >= 1 && dayDiff <= 2; // Check if the difference is at least 1 day but less than 2 days
  };

  //console.log("Is 24 hours ahead:", is24HoursAhead(date));

  return (
    <View style={styles.container}>
      <Text
        style={styles.headingCardText}
        numberOfLines={2}
        ellipsizeMode="tail"
      >
        {eventName} |{organizationName} | 
      </Text>
      <Text style={styles.cardText}>
        {location} | {time} | {date}
      </Text>
      {is24HoursAhead(date) && (
        <CustomButton
          title="אשר הגעה"
          onPress={() => {
            navigation.navigate("ActivityScreen", {
              eventId: id,
              source: "VolunteerCard",
              eventData: eventData,
            });
          }}
          buttonColor={"#1355CB"}
          textColor={"#FFFFFF"}
          borderColor={"#1355CB"}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "flex-end",
    width: 347,
    borderRadius: 12,
    padding: 16,
    gap: 16,
    alignSelf: "center",
    backgroundColor: "#F5F5F5",
  },
  headingCardText: {
    fontFamily: "Inter",
    fontSize: 18,
    fontWeight: "600",
    textAlign: "right",
    lineHeight: 27,
    color: "#060606",
  },
  cardText: {
    fontFamily: "Inter",
    fontSize: 14,
    fontWeight: "400",
    textAlign: "right",
    lineHeight: 21,
    color: "#060606",
  },
});

export default VolunteerCard;
